'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var acq = require('@acq/acq');
var convert = require('@analys/convert');
var boundVector = require('@aryth/bound-vector');
var says = require('@palett/says');
var deco = require('@spare/deco');
var enumChars = require('@spare/enum-chars');
var logger$1 = require('@spare/logger');
var objectInit = require('@vect/object-init');
var numStrict = require('@typen/num-strict');
var table = require('@analys/table');
var tablespec = require('@analys/tablespec');
var enumDataTypes = require('@typen/enum-data-types');
var vectorMerge = require('@vect/vector-merge');
var math = require('@aryth/math');
var string = require('@spare/string');
var translator = require('@spare/translator');
var timestampPretty = require('@valjoux/timestamp-pretty');
var enumPivotMode = require('@analys/enum-pivot-mode');

const BASE = 'http://api.worldbank.org/v2';
const COUNTRIES = ['USA', 'CHN', 'JPN', 'ECS']; // 'ECS': Europe & Central Asia

const GDP = 'NY.GDP.MKTP.CD',
      POP = 'SP.POP.TOTL';
const INDICATORS = [GDP, POP];
const WITHIN_5_YEARS = [2015, 2020];

const parseLabel = label => Array.isArray(label) ? label : [label];
const parseYear = year => {
  if (Array.isArray(year) && (year === null || year === void 0 ? void 0 : year.length)) {
    const {
      max,
      min
    } = boundVector.bound(year);
    return [min, max];
  }

  if (numStrict.isNumeric(year)) return [year, year];
  return WITHIN_5_YEARS;
};

/**
 *
 * @param {string|string[]} [country]
 * @param {string|string[]} [indicator]
 * @param {number|number[]} [year]
 * @param {boolean} [easy]
 * @param {boolean} [spin]
 * @return {Table}
 */

const rawIndicator = async function ({
  country = COUNTRIES,
  indicator = GDP,
  year = WITHIN_5_YEARS,
  autoRefine,
  spin = false
} = {}) {
  const countries = parseLabel(country);
  const yearEntry = parseYear(year);
  const per_page = countries.length * (yearEntry[1] - yearEntry[0] + 1);
  const {
    message,
    samples
  } = await acq.Acq.fetch({
    title: indicator,
    url: `${BASE}/country/${countries.join(enumChars.SC)}/indicator/${indicator}`,
    params: {
      date: yearEntry.join(enumChars.RT),
      format: 'json',
      per_page: per_page
    },
    prep: ([message, samples]) => ({
      message,
      samples
    }),
    spin
  });
  /** @type {Table|Object} */

  const table = worldbankSamplesToTable(samples);
  table.message = message;
  return table;
};
/**
 *
 * @param {Object[]} samples
 * @return {Table}
 */

const worldbankSamplesToTable = samples => {
  var _ref, _samples, _samples2, _table$column, _ref2, _table$meta;

  _ref = (_samples = samples, logger$1.DecoSamples({
    top: 3,
    bottom: 1
  })(_samples)), says.says['worldbankSamplesToTable'](_ref);
  /** @type {Table}  */

  const table = (_samples2 = samples, convert.samplesToTable(_samples2)); // if (!table?.head?.length || !table?.rows?.length) return table

  const indicatorDefs = objectInit.init(table.column('indicator').map(({
    id,
    value
  }) => [id, value]));
  table.mutateColumn('indicator', ({
    id
  }) => id).mutateColumn('country', ({
    value
  }) => value).renameColumn('date', 'year').renameColumn('country', 'countryName').renameColumn('countryiso3code', 'country');
  table.meta = {
    indicator: indicatorDefs,
    country: table.lookupTable('country', 'countryName'),
    year: table.coin('year') >= 0 ? boundVector.bound(table.column('year')) : {},
    value: table.coin('year') >= 0 ? (_table$column = table.column('value'), boundVector.bound(_table$column)) : {}
  };
  _ref2 = (_table$meta = table.meta, deco.deco(_table$meta)), says.says['worldbankSamplesToTable'](_ref2);
  table.title = Object.keys(table.meta.indicator).join(enumChars.COSP);
  return table;
};

/** @type {{mutate: boolean}} */
const MUTABLE = {
  mutate: true
};
const MUT = MUTABLE;

const linkTables = (...tables) => {
  const table$1 = new table.Table([], [], '');
  const meta = {};

  for (let another of tables) {
    for (let field in another.meta) Object.assign(field in meta ? meta[field] : meta[field] = {}, another.meta[field]);

    if (!table$1.head.length) table$1.head = vectorMerge.acquire(table$1.head, another.head);
    table$1.rows = vectorMerge.acquire(table$1.rows, another.rows);
  }

  table$1.title = tables.map(({
    title
  }) => title);
  table$1.meta = meta;
  return table$1;
};

var _ref;
const cleanerDictionary = (_ref = [[/\(number\)$/g, ''], [/volatility$/g, 'volatility (ratio)']], translator.makeReplaceable(_ref));
/**
 *
 * @param {Object<string,string>} indicatorDefs
 * @return {{}}
 */

const refineIndicators = indicatorDefs => {
  const spec = {};

  for (let field in indicatorDefs) {
    const definition = indicatorDefs[field].replace(cleanerDictionary, string.trim);

    if (/current\sUS\$/i.test(definition)) {
      indicatorDefs[field] = definition.replace(/current US\$/gi, 'current billion US\$');

      spec[field] = x => {
        var _;

        return numStrict.isNumeric(x) ? math.round(+x / 1E+9) : (_ = 0) !== null && _ !== void 0 ? _ : 0;
      };

      continue;
    }

    if (/%/.test(definition)) {
      spec[field] = x => {
        var _2;

        return numStrict.isNumeric(x) ? math.roundD1(+x) : (_2 = 0) !== null && _2 !== void 0 ? _2 : 0;
      };

      continue;
    }

    if (/population/i.test(definition) && !/\(.*\)/.test(definition)) {
      indicatorDefs[field] = definition + ' (million people)';

      spec[field] = x => {
        var _3;

        return numStrict.isNumeric(x) ? math.round(+x / 1E+6) : (_3 = 0) !== null && _3 !== void 0 ? _3 : 0;
      };

      continue;
    }

    spec[field] = null;
  }

  return spec;
};

const refineTable = (table, indicators) => {
  const indicatorColumn = table.column('indicator');
  const indicatorMappers = refineIndicators(indicators); // indicatorMappers |> deco |> logger

  for (let [indicator, mapper] of Object.entries(indicatorMappers)) if (mapper) table.mutateColumn('value', (x, i) => indicatorColumn[i] === indicator ? mapper(x) : x);

  return table;
};

/**
 *
 * @param {string|string[]} [country]
 * @param {string[]|Object<string,Function>} [indicator]
 * @param {number|number[]} [year]
 * @param {number} [format]
 * @param {boolean} [spin]
 * @return {{head: *[], rows: *[][]}|Table}
 */

const rawIndicators = async function ({
  country = COUNTRIES,
  indicator = INDICATORS,
  year = WITHIN_5_YEARS,
  autoRefine = false,
  spin = false
} = {}) {
  var _ref2, _table$meta;

  const indicators = tablespec.parseField(indicator);
  const tables = [];

  for (let {
    key: indicator,
    to
  } of indicators) {
    var _Xr$country$indicator, _ref, _table;

    const table = await rawIndicator({
      country,
      indicator,
      year,
      spin
    });
    _Xr$country$indicator = logger$1.Xr().country(country).indicator(indicator).year(year), says.says['rawIndicators'](_Xr$country$indicator);
    _ref = (_table = table, logger$1.DecoTable({
      top: 3,
      bottom: 1
    })(_table)), says.says['rawIndicators'](_ref);
    if (autoRefine) refineTable(table, table.meta.indicator);
    if (to && typeof to === enumDataTypes.FUN) table.mutateColumn('value', to);
    tables.push(table.select(['indicator', 'country', 'year', 'value'], MUT));
  }

  const table = linkTables(...tables);
  _ref2 = (_table$meta = table.meta, deco.deco(_table$meta)), logger$1.logger(_ref2);
  return table;
};

/**
 *
 * @param {Table} rawTable
 * @param {Object} rawTable.meta
 * @param {string} side
 * @param {string} banner
 * @param {string} sumBy
 * @param {string} distinctBy
 * @return {Object<string,Table>}}
 */

const seriesCrostab = (rawTable, {
  side,
  banner,
  sumBy,
  distinctBy
}) => {
  const {
    meta
  } = rawTable;
  const tables = {}; // rawTable |> decoTable |> logger

  for (let topic of rawTable.distinctOnColumn(distinctBy)) {
    var _meta$distinctBy$topi, _crosTab$toTable, _Xr$filter, _filter;

    const topicName = (_meta$distinctBy$topi = meta[distinctBy][topic]) !== null && _meta$distinctBy$topi !== void 0 ? _meta$distinctBy$topi : topic;
    const field = objectInit.pair(sumBy, enumPivotMode.INCRE);
    const filter = objectInit.pair(distinctBy, new Function('x', `return ${numStrict.isNumeric(topic) ? '+x === ' + topic : `x === '${topic}'`}`));
    const crosTab = rawTable.crosTab({
      side,
      banner,
      field,
      filter
    });
    const subTable = (_crosTab$toTable = crosTab.toTable(side), convert.toTable(_crosTab$toTable));

    for (let key of crosTab.head) {
      const {
        max,
        dif
      } = boundVector.bound(subTable.column(key));
      const round = max < 1000 && dif <= 100 ? math.roundD1 : Math.round;
      subTable.mutateColumn(key, round);
    }

    subTable.title = `(${side}) cross (${banner}) sum by (${sumBy}) when (${distinctBy}) is (${topicName})`;
    subTable.meta = {
      side: meta[side],
      banner: meta[banner],
      filter: objectInit.pair(distinctBy, topicName)
    };
    tables[topic] = subTable;
    _Xr$filter = logger$1.Xr('add table').filter((_filter = filter, deco.deco(_filter))), logger(_Xr$filter);
  }

  return tables;
};

const logger = says.says['seriesIndicators'].attach(timestampPretty.time);
const seriesIndicators = async function ({
  country = COUNTRIES,
  indicator = INDICATORS,
  year = WITHIN_5_YEARS,
  autoRefine = false,
  spin = false
}, {
  side,
  banner,
  sumBy,
  distinctBy
}) {
  const rawTable = await rawIndicators({
    indicator,
    country,
    year,
    autoRefine,
    spin
  });
  return seriesCrostab(rawTable, {
    side,
    banner,
    sumBy,
    distinctBy
  });
};

exports.rawIndicator = rawIndicator;
exports.rawIndicators = rawIndicators;
exports.seriesCrostab = seriesCrostab;
exports.seriesIndicators = seriesIndicators;
