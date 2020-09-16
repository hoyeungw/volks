'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var acq = require('@acq/acq');
var enumTabularTypes = require('@analys/enum-tabular-types');
var table = require('@analys/table');
var enumChars = require('@spare/enum-chars');
var numStrict = require('@typen/num-strict');
var objectInit = require('@vect/object-init');
var boundVector = require('@aryth/bound-vector');
var enumJoinModes = require('@analys/enum-join-modes');
require('@vect/vector-zipper');
var tablespec = require('@analys/tablespec');
var vectorMerge = require('@vect/vector-merge');

const distinctIdValue = idValueList => {
  const o = {};

  for (let {
    id,
    value
  } of idValueList) o[id] = value;

  return o;
};

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

const getIndicator = async function ({
  country = COUNTRIES,
  indicator = GDP,
  year = WITHIN_5_YEARS,
  easy = false,
  spin = false
} = {}) {
  const countries = parseLabel(country);
  const yearEntry = parseYear(year);
  const per_page = countries.length * (yearEntry[1] - yearEntry[0] + 1);
  const table = await acq.Acq.tabular({
    title: indicator,
    url: `${BASE}/country/${countries.join(enumChars.SC)}/indicator/${indicator}`,
    params: {
      date: yearEntry.join(enumChars.RT),
      format: 'json',
      per_page: per_page
    },
    prep: ([message, samples]) => samples,
    from: enumTabularTypes.SAMPLES,
    to: enumTabularTypes.TABLE,
    easy,
    spin
  });
  return leanTable(table);
};
const leanTable = table$1 => {
  var _table, _table$head, _table2, _table2$rows, _table$select$rows$ma;

  if (!((_table = table$1) === null || _table === void 0 ? void 0 : (_table$head = _table.head) === null || _table$head === void 0 ? void 0 : _table$head.length) || !((_table2 = table$1) === null || _table2 === void 0 ? void 0 : (_table2$rows = _table2.rows) === null || _table2$rows === void 0 ? void 0 : _table2$rows.length)) return table$1;
  table$1 = table.Table.from(table$1);
  const [{
    id: indicatorId,
    value: indicatorName
  }] = table$1.column('indicator');
  const countries = (_table$select$rows$ma = table$1.select(['country', 'countryiso3code']).rows.map(([{
    value
  }, iso]) => ({
    id: iso,
    value
  })), distinctIdValue(_table$select$rows$ma));
  table$1 = table$1.renameColumn('countryiso3code', 'iso').renameColumn('value', indicatorId).mutateColumn(indicatorId, x => numStrict.isNumeric(x) ? parseInt(x) : x).mutateColumn('indicator', ({
    id
  }) => id);
  table$1.title = indicatorId !== null && indicatorId !== void 0 ? indicatorId : '';
  table$1.indicators = objectInit.pair(indicatorId, indicatorName);
  table$1.countries = countries;
  return table$1;
};

/**
 *
 * @param {string|string[]} [country]
 * @param {string|string[]} [indicator]
 * @param {number|number[]} [year]
 * @param {number} [format]
 * @param {boolean} [easy]
 * @param {boolean} [spin]
 * @return {Promise<{head: *[], rows: *[][]}|Table|Object[]>}
 */

const getIndicators = async function ({
  country = COUNTRIES,
  indicator = INDICATORS,
  year = WITHIN_5_YEARS,
  easy = false,
  spin = false
} = {}) {
  const indicators = parseLabel(indicator);
  const tables = {};

  for (let indicator of indicators) {
    const table$1 = await getIndicator({
      country,
      indicator,
      year,
      format: enumTabularTypes.TABLE,
      spin,
      easy
    });
    tables[table$1.title] = {
      table: table.Table.from(table$1),
      indicators: table$1.indicators,
      countries: table$1.countries
    }; // table |> deco |> says[table.title]
  }

  let table$1 = table.Table.from({
    head: [],
    rows: []
  });
  const indicatorCollection = {},
        countryCollection = {};

  for (let [key, {
    table: another,
    indicators,
    countries
  }] of Object.entries(tables)) {
    Object.assign(indicatorCollection, indicators);
    Object.assign(countryCollection, countries); // another.select(['iso', 'date', key]) |>deco |> logger;

    table$1 = table$1.join(another.select(['iso', 'date', key]), ['iso', 'date'], enumJoinModes.UNION);
  }

  table$1.indicators = indicatorCollection;
  table$1.countries = countryCollection;
  return table$1;
};

const iterate = function (vec, fn, l) {
  l = l || (vec === null || vec === void 0 ? void 0 : vec.length);

  for (let i = 0; i < l; i++) fn.call(this, vec[i], i);
};

const mapper = function (vec, fn, l) {
  l = l || (vec === null || vec === void 0 ? void 0 : vec.length);
  const ar = Array(l);

  for (--l; l >= 0; l--) ar[l] = fn.call(this, vec[l], l);

  return ar;
};

const select = (vec, indexes, hi) => {
  hi = hi || indexes.length;
  const vc = Array(hi);

  for (--hi; hi >= 0; hi--) vc[hi] = vec[indexes[hi]];

  return vc;
};

const unwind = (entries, h) => {
  h = h || (entries === null || entries === void 0 ? void 0 : entries.length);
  let keys = Array(h),
      values = Array(h);

  for (let r; --h >= 0 && (r = entries[h]);) {
    keys[h] = r[0];
    values[h] = r[1];
  }

  return [keys, values];
};

const voidTabular = () => ({
  head: [],
  rows: []
});

/**
 * Take the first "n" elements from an array.
 * @param len. The number denote the first "n" elements in an array.
 * @returns {*[]}. A new array length at "len".
 */


Array.prototype.take = function (len) {
  return this.slice(0, len);
};

Array.prototype.zip = function (another, zipper) {
  const {
    length
  } = this,
        arr = Array(length);

  for (let i = 0; i < length; i++) arr[i] = zipper(this[i], another[i], i);

  return arr; // return Array.from({ length: size }, (v, i) => zipper(this[i], another[i], i))
  // return this.map((x, i) => zipper(x, another[i]))
};

/**
 *
 * @param {Object} o
 * @returns {Table}
 */


const toTable = o => new table.Table(o.head || o.banner, o.rows || o.matrix, o.title, o.types);
/**
 *
 * @param {Object[]} samples
 * @param {(str|[str,str])[]} [fields]
 * @returns {Table}
 */


const samplesToTable = (samples, fields) => {
  var _samplesToTabular;

  return _samplesToTabular = samplesToTabular(samples, fields), toTable(_samplesToTabular);
};
/**
 *
 * @param {Object[]} samples
 * @param {(str|[str,str])[]} [fields]
 * @returns {TableObject}
 */


function samplesToTabular(samples, fields) {
  var _selectFieldMapping$c;

  let h, w;
  if (!(h = samples === null || samples === void 0 ? void 0 : samples.length)) return voidTabular();
  if (!(fields === null || fields === void 0 ? void 0 : fields.length)) return convertSamplesToTabular(samples);
  const [keys, head] = (_selectFieldMapping$c = selectFieldMapping.call(samples[0], fields), unwind(_selectFieldMapping$c));
  if (!(w = keys === null || keys === void 0 ? void 0 : keys.length)) return voidTabular();
  const rows = mapper(samples, sample => select(sample, keys, w), h);
  return {
    head,
    rows
  };
}

const selectFieldMapping = function (fields) {
  const sample = this,
        mapping = [],
        fieldMapper = fieldMapping.bind(sample);
  let kvp;
  iterate(fields, field => {
    if (kvp = fieldMapper(field)) mapping.push(kvp);
  });
  return mapping;
};
/**
 *
 * @param {str|[*,*]} [field]
 * @returns {[str,number]}
 */


const fieldMapping = function (field) {
  const sample = this;

  if (Array.isArray(field)) {
    const [current, projected] = field;
    return current in sample ? [current, projected] : null;
  }

  return field in sample ? [field, field] : null;
};

function convertSamplesToTabular(samples) {
  var _Object$entries;

  const height = samples === null || samples === void 0 ? void 0 : samples.length;
  if (!height) return voidTabular();
  const rows = Array(height);
  let head;
  [head, rows[0]] = (_Object$entries = Object.entries(samples[0]), unwind(_Object$entries));

  for (let i = 1, w = (_head = head) === null || _head === void 0 ? void 0 : _head.length; i < height; i++) {
    var _head;

    rows[i] = select(samples[i], head, w);
  }

  return {
    head,
    rows
  };
}

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
  easy = false,
  spin = false
} = {}) {
  var _samples;

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
    easy,
    spin
  });
  /** @type {Table}  */

  const table = leanTable$1((_samples = samples, samplesToTable(_samples)));
  table.message = message;
  return table;
};
/**
 *
 * @param {Table} table
 * @return {Table}
 */

const leanTable$1 = table => {
  var _table, _table$head, _table2, _table2$rows, _table$column$map;

  if (!((_table = table) === null || _table === void 0 ? void 0 : (_table$head = _table.head) === null || _table$head === void 0 ? void 0 : _table$head.length) || !((_table2 = table) === null || _table2 === void 0 ? void 0 : (_table2$rows = _table2.rows) === null || _table2$rows === void 0 ? void 0 : _table2$rows.length)) return table;
  const indicators = (_table$column$map = table.column('indicator').map(({
    id,
    value
  }) => [id, value]), objectInit.init(_table$column$map));
  table = table.renameColumn('countryiso3code', 'iso').mutateColumn('indicator', ({
    id
  }) => id).mutateColumn('country', ({
    value
  }) => value);
  const countries = table.lookupTable('iso', 'country');
  table.title = indicators ? Object.keys(indicators).join(',') : '';
  table.indicators = indicators;
  table.countries = countries;
  return table;
};

/** @type {{mutate: boolean}} */
const MUTABLE = {
  mutate: true
};
const MUT = MUTABLE;

/**
 *
 * @param {string|string[]} [country]
 * @param {string[]|Object<string,Function>} [indicator]
 * @param {number|number[]} [year]
 * @param {number} [format]
 * @param {boolean} [easy]
 * @param {boolean} [spin]
 * @return {Promise<{head: *[], rows: *[][]}|Table|Object[]>}
 */

const rawIndicators = async function ({
  country = COUNTRIES,
  indicator = INDICATORS,
  year = WITHIN_5_YEARS,
  easy = false,
  spin = false
} = {}) {
  const indicators = tablespec.parseField(indicator);
  const tables = [];

  for (let {
    key,
    to
  } of indicators) {
    const table = await rawIndicator({
      country,
      indicator: key,
      year,
      format: enumTabularTypes.TABLE,
      spin,
      easy
    });
    if (to) table.mutateColumn('value', to);
    tables.push(table.select(['indicator', 'iso', 'date', 'value'], MUT));
  }

  let table$1 = new table.Table([], [], '');
  const indicatorCollection = {},
        countryCollection = {};

  for (let another of tables) {
    Object.assign(indicatorCollection, another.indicators);
    Object.assign(countryCollection, another.countries);
    if (!table$1.head.length) table$1.head = vectorMerge.acquire(table$1.head, another.head);
    table$1.title = table$1.title + enumChars.SP + another.title;
    table$1.rows = vectorMerge.acquire(table$1.rows, another.rows);
  }

  table$1.indicators = indicatorCollection;
  table$1.countries = countryCollection;
  return table$1;
};

exports.getIndicator = getIndicator;
exports.getIndicators = getIndicators;
exports.rawIndicator = rawIndicator;
exports.rawIndicators = rawIndicators;
