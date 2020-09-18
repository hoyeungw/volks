import { Acq } from '@acq/acq';
import { samplesToTable, toTable } from '@analys/convert';
import { bound } from '@aryth/bound-vector';
import { SC, RT, COSP } from '@spare/enum-chars';
import { init, pair } from '@vect/object-init';
import { isNumeric } from '@typen/num-strict';
import { Table } from '@analys/table';
import { parseField } from '@analys/tablespec';
import { deco } from '@spare/deco';
import { logger as logger$1, Xr } from '@spare/logger';
import { FUN } from '@typen/enum-data-types';
import { acquire } from '@vect/vector-merge';
import { round, roundD1 } from '@aryth/math';
import { trim } from '@spare/string';
import { makeReplaceable } from '@spare/translator';
import { INCRE } from '@analys/enum-pivot-mode';
import { says } from '@palett/says';
import { time } from '@valjoux/timestamp-pretty';

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
    } = bound(year);
    return [min, max];
  }

  if (isNumeric(year)) return [year, year];
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
  } = await Acq.fetch({
    title: indicator,
    url: `${BASE}/country/${countries.join(SC)}/indicator/${indicator}`,
    params: {
      date: yearEntry.join(RT),
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
  var _samples, _table$head, _table$rows, _table$column, _table$column2;

  const table = (_samples = samples, samplesToTable(_samples));
  if (!(table === null || table === void 0 ? void 0 : (_table$head = table.head) === null || _table$head === void 0 ? void 0 : _table$head.length) || !(table === null || table === void 0 ? void 0 : (_table$rows = table.rows) === null || _table$rows === void 0 ? void 0 : _table$rows.length)) return table;
  const indicatorDefs = init(table.column('indicator').map(({
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
    year: (_table$column = table.column('year'), bound(_table$column)),
    value: (_table$column2 = table.column('value'), bound(_table$column2))
  };
  table.title = Object.keys(table.meta.indicator).join(COSP);
  return table;
};

/** @type {{mutate: boolean}} */
const MUTABLE = {
  mutate: true
};
const MUT = MUTABLE;

const linkTables = (...tables) => {
  const table = new Table([], [], '');
  const meta = {};

  for (let another of tables) {
    for (let field in another.meta) Object.assign(field in meta ? meta[field] : meta[field] = {}, another.meta[field]);

    if (!table.head.length) table.head = acquire(table.head, another.head);
    table.rows = acquire(table.rows, another.rows);
  }

  table.title = tables.map(({
    title
  }) => title);
  table.meta = meta;
  return table;
};

var _ref;
const cleanerDictionary = (_ref = [[/\(number\)$/g, ''], [/volatility$/g, 'volatility (ratio)']], makeReplaceable(_ref));
/**
 *
 * @param {Object<string,string>} indicatorDefs
 * @return {{}}
 */

const refineIndicators = indicatorDefs => {
  const spec = {};

  for (let field in indicatorDefs) {
    const definition = indicatorDefs[field].replace(cleanerDictionary, trim);

    if (/current\sUS\$/i.test(definition)) {
      indicatorDefs[field] = definition.replace(/current US\$/gi, 'current billion US\$');

      spec[field] = x => {
        var _;

        return isNumeric(x) ? round(+x / 1E+9) : (_ = 0) !== null && _ !== void 0 ? _ : 0;
      };

      continue;
    }

    if (/%/.test(definition)) {
      spec[field] = x => {
        var _2;

        return isNumeric(x) ? roundD1(+x) : (_2 = 0) !== null && _2 !== void 0 ? _2 : 0;
      };

      continue;
    }

    if (/population/i.test(definition) && !/\(.*\)/.test(definition)) {
      indicatorDefs[field] = definition + ' (million people)';

      spec[field] = x => {
        var _3;

        return isNumeric(x) ? round(+x / 1E+6) : (_3 = 0) !== null && _3 !== void 0 ? _3 : 0;
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
 * @return {{head: *[], rows: *[][]}|Table|Object[]}
 */

const rawIndicators = async function ({
  country = COUNTRIES,
  indicator = INDICATORS,
  year = WITHIN_5_YEARS,
  autoRefine = false,
  spin = false
} = {}) {
  var _ref, _table$meta;

  const indicators = parseField(indicator);
  const tables = [];

  for (let {
    key: indicator,
    to
  } of indicators) {
    const table = await rawIndicator({
      country,
      indicator,
      year,
      spin
    });
    if (autoRefine) refineTable(table, table.meta.indicator);
    if (to && typeof to === FUN) table.mutateColumn('value', to);
    tables.push(table.select(['indicator', 'country', 'year', 'value'], MUT));
  }

  const table = linkTables(...tables);
  _ref = (_table$meta = table.meta, deco(_table$meta)), logger$1(_ref);
  return table;
};

const logger = says['seriesIndicators'].attach(time);
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
  const rawMeta = rawTable.meta;
  const tables = {}; // rawTable |> decoTable |> logger

  for (let topic of rawTable.distinctOnColumn(distinctBy)) {
    var _crosTab$toTable, _Xr$filter, _filter;

    const field = pair(sumBy, INCRE);
    const filter = pair(distinctBy, new Function('x', `return ${isNumeric(topic) ? '+x === ' + topic : `x === '${topic}'`}`));
    const crosTab = rawTable.crosTab({
      side,
      banner,
      field,
      filter
    });
    const subTable = (_crosTab$toTable = crosTab.toTable(side), toTable(_crosTab$toTable));

    for (let key of crosTab.head) {
      const {
        max,
        dif
      } = bound(subTable.column(key));
      const round = max < 1000 && dif <= 100 ? roundD1 : Math.round;
      subTable.mutateColumn(key, round);
    }

    subTable.title = `(${side}) cross (${banner}) sum by (${sumBy}) when (${distinctBy}) is (${topic})`;
    subTable.meta = {
      side: rawMeta[side],
      banner: rawMeta[banner],
      filter: pair(distinctBy, topic)
    };
    tables[topic] = subTable;
    _Xr$filter = Xr('add table').filter((_filter = filter, deco(_filter))), logger(_Xr$filter);
  }

  return tables;
};

export { rawIndicator, rawIndicators, seriesIndicators };
