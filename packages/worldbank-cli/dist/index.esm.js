import { SAMPLES, TABLE } from '@analys/enum-tabular-types';
import { Table } from '@analys/table';
import { randInt } from '@aryth/rand';
import { greyNow } from '@flua/utils';
import { says } from '@palett/says';
import { deco } from '@spare/deco';
import { RT, SP } from '@spare/enum-chars';
import { Xr, logger, decoTable, decoString } from '@spare/logger';
import { linger } from '@valjoux/linger';
import { range } from '@vect/vector-init';
import { CountryIsos } from '@volks/countries-and-subdivisions';
import { Acq } from '@acq/acq';
import { Sources } from '@volks/worldbank-sources';
import fuzzy from 'fuzzy';
import inquirer from 'inquirer';
import searchableList from 'inquirer-autocomplete-prompt';
import searchableCheckbox from 'inquirer-checkbox-plus-prompt';

const NONE = 0;
const LOOSE = 1;
const STRICT = 2;

/**
 *
 * @type {Function|function(*):string}
 */
const protoType = Function.prototype.call.bind(Object.prototype.toString);

const isNumeric = x => !!(x = +x) || x === 0;

const parseNum = x => isNumeric(x) ? x : NaN;

const isNumeric$1 = x => !isNaN(x - parseFloat(x));
/**
 * validate
 * @param x
 * @param y
 * @returns {number}
 */


const validate = (x, y) => isNaN(x - y) ? NaN : y;

const parseNum$1 = x => validate(x, parseFloat(x));

const IsNum = (level = NONE) => {
  if (level === NONE) return x => !isNaN(x);
  if (level === LOOSE) return isNumeric;
  if (level === STRICT) return isNumeric$1;
  return isNumeric$1;
};

const ToNum = (level = 0) => {
  if (level === NONE) return x => x;
  if (level === LOOSE) return parseNum;
  if (level === STRICT) return parseNum$1;
  return parseNum$1;
};

function boundOutput(max, min) {
  const {
    dif
  } = this;
  return dif ? {
    min,
    dif: max - min
  } : {
    max,
    min
  };
}

const iniNumEntry = (ar, lo, hi, {
  level = 0
} = {}) => {
  for (let el, isNum = IsNum(level); lo < hi; lo++) if (isNum(el = ar[lo])) return [lo, el];

  return [hi, NaN];
};
/**
 *
 * @param {*[]} vec
 */


function bound(vec) {
  /** @type {{dif: boolean, level: number}} */
  const config = this || {
    dif: false,
    level: LOOSE
  };
  const toOutput = boundOutput.bind(config),
        toNum = ToNum(config.level);
  let l = vec === null || vec === void 0 ? void 0 : vec.length;
  if (!l) return toOutput(NaN, NaN);
  let [i, x] = iniNumEntry(vec, 0, l, config);
  let min,
      max = min = toNum(x);

  for (++i; i < l; i++) {
    var _vec$i;

    if ((x = (_vec$i = vec[i], toNum(_vec$i))) < min) {
      min = x;
    } else if (x > max) {
      max = x;
    }
  }

  return toOutput(max, min); // @returns {{min:number, max:number}|{min:number, dif:number}}
}

const BASE = 'http://api.worldbank.org/v2';
const parseLabel = label => Array.isArray(label) ? label : [label];
const parseYear = year => {
  if (!Array.isArray(year) || !(year === null || year === void 0 ? void 0 : year.length)) return year;
  const {
    max,
    min
  } = bound(year);
  return [min, max];
};
const COUNTRIES = ['USA', 'CHN', 'JPN', 'ECS']; // 'ECS': Europe & Central Asia

const GDP = 'NY.GDP.MKTP.CD',
      POP = 'SP.POP.TOTL';
const INDICATORS = [GDP, POP];
const WITHIN_5_YEARS = [2015, 2020];
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

const getIndicator = async function ({
  country = COUNTRIES,
  indicator = INDICATORS,
  year = WITHIN_5_YEARS,
  format = TABLE,
  easy = false,
  spin = false
} = {}) {
  const countries = parseLabel(country);
  const indicators = parseLabel(indicator);
  const yearEntry = parseYear(year);
  return await Acq.tabular({
    title: 'indicator',
    url: `${BASE}/country/${countries.join(';')}/indicator/${indicators.join(';')}`,
    params: {
      date: yearEntry.join(RT),
      format: 'json',
      per_page: 2048,
      source: 2
    },
    prep: ([, samples]) => samples,
    fields: null,
    from: SAMPLES,
    to: format,
    easy,
    spin
  });
};

const SEARCHABLE_LIST = 'searchable-list';
const SEARCHABLE_CHECKBOX = 'searchable-checkbox';
const LIST = 'list';
inquirer.registerPrompt(SEARCHABLE_LIST, searchableList);
inquirer.registerPrompt(SEARCHABLE_CHECKBOX, searchableCheckbox);

const searchListAsync = async function (answers, input = '') {
  const list = this;
  return await linger(randInt(30, 90), input => {
    const results = fuzzy.filter(input, list).map(({
      original
    }) => ({
      name: decoString(original),
      value: original
    }));
    return results.push(new inquirer.Separator()), results;
  }, input);
};

const indicatorList = Object.values(Sources).map(({
  rows
}) => rows.map(([id, name]) => id + ' | ' + name)).flat();
const countryList = Object.entries(CountryIsos).map(([name, id]) => id + ' | ' + name.replace(/_/g, SP));
class WorldbankCli {
  static async start() {
    var _Xr$select, _indicators$countries, _ref2, _table;

    const {
      indicators
    } = await inquirer.prompt([{
      type: SEARCHABLE_CHECKBOX,
      name: 'indicators',
      message: 'Select indicators',
      pageSize: 24,
      highlight: true,
      searchable: true,
      default: [],
      source: searchListAsync.bind(indicatorList),

      filter(label) {
        return label;
      }

    }]);
    const {
      countries
    } = await inquirer.prompt([{
      type: SEARCHABLE_CHECKBOX,
      name: 'countries',
      message: 'Select countries',
      pageSize: 24,
      highlight: true,
      searchable: true,
      default: [],
      source: searchListAsync.bind(countryList),

      filter(label) {
        var _ref, _label;

        _ref = (_label = label, deco(_label)), says['countries'](_ref); // return label.slice(0, label.indexOf('|'))

        return label;
      }

    }]);
    const {
      start
    } = await inquirer.prompt([{
      name: 'start',
      type: LIST,
      default: '2015',
      message: 'Please select start year',
      choices: range(2020, 1990)
    }]);
    _Xr$select = Xr(greyNow()).select((_indicators$countries = {
      indicators,
      countries,
      start
    }, deco(_indicators$countries))), logger(_Xr$select);
    const reg = /^(?<=\s*)[\w.]+(?=\s+\|)/; // /(?<=\|\s*)\w+$/

    const table = Table.from(await getIndicator({
      country: countries.map(word => word.match(reg)[0]),
      indicator: indicators.map(word => word.match(reg)[0]),
      year: [start, 2020],
      format: TABLE,
      spin: true
    }));
    table.mutateColumn('indicator', ({
      value
    }) => value).mutateColumn('country', ({
      value
    }) => value);
    _ref2 = (_table = table, decoTable(_table)), logger(_ref2);
  }

}

export { WorldbankCli };
