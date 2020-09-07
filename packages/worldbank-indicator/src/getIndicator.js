import { Acq }                            from '@acq/acq'
import { SAMPLES, TABLE }                 from '@analys/enum-tabular-types'
import { Table }                          from '@analys/table'
import { RT, SC }                         from '@spare/enum-chars'
import { isNumeric }                      from '@typen/num-strict'
import { pair }                           from '@vect/object-init'
import { distinctIdValue }                      from '../helpers/distinctIdValue'
import { BASE, COUNTRIES, GDP, WITHIN_5_YEARS } from './constants'
import { parseLabel, parseYear }                from './paramsParsers'


export const getIndicator = async function (
  {
    country = COUNTRIES,
    indicator = GDP,
    year = WITHIN_5_YEARS,
    easy = false, spin = false
  } = {}
) {
  const countries = parseLabel(country)
  const yearEntry = parseYear(year)
  const per_page = countries.length * (yearEntry[1] - yearEntry[0] + 1)
  const table = await Acq.tabular({
    title: indicator,
    url: `${ BASE }/country/${ countries.join(SC) }/indicator/${ indicator }`,
    params: ({ date: yearEntry.join(RT), format: 'json', per_page: per_page }),
    prep: ([message, samples]) => { return samples },
    from: SAMPLES,
    to: TABLE,
    easy,
    spin
  })
  return leanTable(table)
}


export const leanTable = table => {
  if (table.ht === 0) return table
  table = Table.from(table)
  const [{ id: indicatorId, value: indicatorName }] = table.column('indicator')
  const countries = table
    .select(['country', 'countryiso3code']).rows
    .map(([{ value }, iso]) => ({ id: iso, value }))
    |> distinctIdValue
  table = table
    .renameColumn('countryiso3code', 'iso')
    .renameColumn('value', indicatorId)
    .mutateColumn(indicatorId, x => isNumeric(x) ? parseInt(x) : x)
    .mutateColumn('indicator', ({ id }) => id)
  table.title = indicatorId ?? ''
  table.indicators = pair(indicatorId, indicatorName)
  table.countries = countries
  return table
}


