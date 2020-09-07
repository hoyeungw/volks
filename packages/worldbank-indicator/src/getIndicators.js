import { UNION }                                 from '@analys/enum-join-modes'
import { TABLE }                                 from '@analys/enum-tabular-types'
import { Table }                                 from '@analys/table'
import { COUNTRIES, INDICATORS, WITHIN_5_YEARS } from './constants'
import { getIndicator }                          from './getIndicator'
import { parseLabel }                            from './paramsParsers'

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
export const getIndicators = async function (
  {
    country = COUNTRIES,
    indicator = INDICATORS,
    year = WITHIN_5_YEARS, easy = false, spin = false
  } = {}
) {
  const indicators = parseLabel(indicator)
  const tables = {}
  for (let indicator of indicators) {
    const table = await getIndicator({ country, indicator, year, format: TABLE, spin, easy })
    tables[table.title] = { table: Table.from(table), indicators: table.indicators, countries: table.countries }
  }
  let table = Table.from({ head: [], rows: [] })
  const indicatorCollection = {}, countryCollection = {}
  for (let [key, { table: another, indicators, countries }] of Object.entries(tables)) {
    Object.assign(indicatorCollection, indicators)
    Object.assign(countryCollection, countries)
    table = table.join(another.select(['iso', 'date', key]), ['iso', 'date'], UNION)
  }
  table.indicators = indicatorCollection
  table.countries = countryCollection
  return table
}