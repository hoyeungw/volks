import { MUT }                                   from '@analys/enum-mutabilities'
import { Table }                                 from '@analys/table'
import { parseField }                            from '@analys/tablespec'
import { deco }                                  from '@spare/deco'
import { logger }                                from '@spare/logger'
import { FUN }                                   from '@typen/enum-data-types'
import { COUNTRIES, INDICATORS, WITHIN_5_YEARS } from './helpers/constants'
import { linkTables }                            from './helpers/linkTables'
import { refineTable }                           from './helpers/refineTable'
import { rawIndicator }                          from './rawIndicator'

/**
 *
 * @param {string|string[]} [country]
 * @param {string[]|Object<string,Function>} [indicator]
 * @param {number|number[]} [year]
 * @param {number} [format]
 * @param {boolean} [spin]
 * @return {{head: *[], rows: *[][]}|Table|Object[]}
 */
export const rawIndicators = async function (
  {
    country = COUNTRIES,
    indicator = INDICATORS,
    year = WITHIN_5_YEARS,
    autoRefine = false,
    spin = false
  } = {}
) {
  const indicators = parseField(indicator)
  const tables = []
  for (let { key: indicator, to } of indicators) {
    const table = await rawIndicator({ country, indicator, year, spin })
    if (autoRefine) refineTable(table, table.meta.indicator)
    if (to && typeof to === FUN) table.mutateColumn('value', to)
    tables.push(table.select(['indicator', 'country', 'year', 'value'], MUT))
  }
  const table = linkTables(...tables)
  table.meta |> deco |> logger
  return table
}