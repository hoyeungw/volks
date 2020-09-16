import { Acq }                                  from '@acq/acq'
import { samplesToTable }                       from '@analys/convert'
import { RT, SC }                               from '@spare/enum-chars'
import { init }                                 from '@vect/object-init'
import { BASE, COUNTRIES, GDP, WITHIN_5_YEARS } from './constants'
import { parseLabel, parseYear }                from './parsers'

/**
 *
 * @param {string|string[]} [country]
 * @param {string|string[]} [indicator]
 * @param {number|number[]} [year]
 * @param {boolean} [easy]
 * @param {boolean} [spin]
 * @return {Table}
 */
export const rawIndicator = async function (
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
  const { message, samples } = await Acq.fetch({
    title: indicator,
    url: `${ BASE }/country/${ countries.join(SC) }/indicator/${ indicator }`,
    params: ({ date: yearEntry.join(RT), format: 'json', per_page: per_page }),
    prep: ([message, samples]) => ({ message, samples }),
    easy,
    spin
  })
  /** @type {Table}  */const table = leanTable(samples |> samplesToTable)
  table.message = message
  return table
}

/**
 *
 * @param {Table} table
 * @return {Table}
 */
export const leanTable = table => {
  if (!table?.head?.length || !table?.rows?.length) return table
  const indicators = table.column('indicator').map(({ id, value }) => [id, value]) |> init
  table = table
    .renameColumn('countryiso3code', 'iso')
    .mutateColumn('indicator', ({ id }) => id)
    .mutateColumn('country', ({ value }) => value)
  const countries = table.lookupTable('iso', 'country',)
  table.title = indicators ? Object.keys(indicators).join(',') : ''
  table.indicators = indicators
  table.countries = countries
  return table
}


