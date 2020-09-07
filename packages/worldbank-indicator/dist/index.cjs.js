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

const distinctIdValue = idValueList => {
  const o = {};

  for (let {
    id,
    value
  } of idValueList) {
    o[id] = value;
  }

  return o;
};

const BASE = 'http://api.worldbank.org/v2';
const COUNTRIES = ['USA', 'CHN', 'JPN', 'ECS']; // 'ECS': Europe & Central Asia

const GDP = 'NY.GDP.MKTP.CD',
      POP = 'SP.POP.TOTL';
const INDICATORS = [GDP, POP];
const WITHIN_5_YEARS$1 = [2015, 2020];

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
  year = WITHIN_5_YEARS$1,
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
    prep: ([message, samples]) => {
      return samples;
    },
    from: enumTabularTypes.SAMPLES,
    to: enumTabularTypes.TABLE,
    easy,
    spin
  });
  return leanTable(table);
};
const leanTable = table$1 => {
  var _table$select$rows$ma;

  if (table$1.ht === 0) return table$1;
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
  year = WITHIN_5_YEARS$1,
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
    };
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
    Object.assign(countryCollection, countries);
    table$1 = table$1.join(another.select(['iso', 'date', key]), ['iso', 'date'], enumJoinModes.UNION);
  }

  table$1.indicators = indicatorCollection;
  table$1.countries = countryCollection;
  return table$1;
};

exports.getIndicator = getIndicator;
exports.getIndicators = getIndicators;
