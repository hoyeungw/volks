import { Acq } from '@acq/acq';
import { UNION } from '@analys/enum-join-modes';
import { SAMPLES, TABLE } from '@analys/enum-tabular-types';
import { Table } from '@analys/table';
import { bound } from '@aryth/bound-vector';
import { SC, RT } from '@spare/enum-chars';
import { isNumeric } from '@typen/num-strict';
import { pair } from '@vect/object-init';

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
  const table = await Acq.tabular({
    title: indicator,
    url: `${BASE}/country/${countries.join(SC)}/indicator/${indicator}`,
    params: {
      date: yearEntry.join(RT),
      format: 'json',
      per_page: per_page
    },
    prep: ([message, samples]) => {
      return samples;
    },
    from: SAMPLES,
    to: TABLE,
    easy,
    spin
  });
  return leanTable(table);
};
const leanTable = table => {
  var _table$select$rows$ma;

  if (table.ht === 0) return table;
  table = Table.from(table);
  const [{
    id: indicatorId,
    value: indicatorName
  }] = table.column('indicator');
  const countries = (_table$select$rows$ma = table.select(['country', 'countryiso3code']).rows.map(([{
    value
  }, iso]) => ({
    id: iso,
    value
  })), distinctIdValue(_table$select$rows$ma));
  table = table.renameColumn('countryiso3code', 'iso').renameColumn('value', indicatorId).mutateColumn(indicatorId, x => isNumeric(x) ? parseInt(x) : x).mutateColumn('indicator', ({
    id
  }) => id);
  table.title = indicatorId !== null && indicatorId !== void 0 ? indicatorId : '';
  table.indicators = pair(indicatorId, indicatorName);
  table.countries = countries;
  return table;
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
  // const countries = parseLabel(country)
  const indicators = parseLabel(indicator); // const yearEntry = parseYear(year)
  // const per_page = countries.length * indicators.length * (yearEntry[1] - yearEntry[0] + 1)

  const tables = {};

  for (let indicator of indicators) {
    const table = await getIndicator({
      country,
      indicator,
      year,
      format: TABLE,
      spin,
      easy
    });
    tables[table.title] = {
      table: Table.from(table),
      indicators: table.indicators,
      countries: table.countries
    };
  }

  let table = Table.from({
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
    table = table.join(another.select(['iso', 'date', key]), ['iso', 'date'], UNION);
  }

  table.indicators = indicatorCollection;
  table.countries = countryCollection;
  return table;
};

export { getIndicator, getIndicators };
