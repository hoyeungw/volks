import { MUT }                                   from '@analys/enum-mutabilities'
import { TABLE }                                 from '@analys/enum-tabular-types'
import { Table }                                 from '@analys/table'
import { parseField }                            from '@analys/tablespec'
import { SP }                                    from '@spare/enum-chars'
import { acquire }                               from '@vect/vector-merge'
import { COUNTRIES, INDICATORS, WITHIN_5_YEARS } from './constants'
import { rawIndicator }                          from './rawIndicator'

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
export const rawIndicators = async function (
  {
    country = COUNTRIES,
    indicator = INDICATORS,
    year = WITHIN_5_YEARS, easy = false, spin = false
  } = {}
) {
  const indicators = parseField(indicator)
  const tables = []
  for (let { key, to } of indicators) {
    const table = await rawIndicator({ country, indicator: key, year, format: TABLE, spin, easy })
    if (to) table.mutateColumn('value', to)
    tables.push(table.select(['indicator', 'iso', 'date', 'value'], MUT))
  }
  let table = new Table([], [], '')
  const indicatorCollection = {}, countryCollection = {}
  for (let another of tables) {
    Object.assign(indicatorCollection, another.indicators)
    Object.assign(countryCollection, another.countries)
    if (!table.head.length) table.head = acquire(table.head, another.head)
    table.title = table.title + SP + another.title
    table.rows = acquire(table.rows, another.rows)
  }
  table.indicators = indicatorCollection
  table.countries = countryCollection
  return table
}