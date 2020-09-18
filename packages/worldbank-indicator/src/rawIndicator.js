import { Acq }                                  from '@acq/acq'
import { samplesToTable }                       from '@analys/convert'
import { bound }                                from '@aryth/bound-vector'
import { COSP, RT, SC }                         from '@spare/enum-chars'
import { init }                                 from '@vect/object-init'
import { BASE, COUNTRIES, GDP, WITHIN_5_YEARS } from './helpers/constants'
import { parseLabel, parseYear }                from './helpers/parsers'


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
    autoRefine,
    spin = false
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
    spin
  })
  /** @type {Table|Object} */const table = worldbankSamplesToTable(samples)
  table.message = message
  return table
}

/**
 *
 * @param {Object[]} samples
 * @return {Table}
 */
export const worldbankSamplesToTable = (samples) => {
  // samples |> DecoSamples({ top: 3, bottom: 1 }) |> says['worldbankSamplesToTable']
  /** @type {Table}  */const table = samples |> samplesToTable
  // if (!table?.head?.length || !table?.rows?.length) return table
  const indicatorDefs = init(table.column('indicator').map(({ id, value }) => [id, value]))
  table
    .mutateColumn('indicator', ({ id }) => id)
    .mutateColumn('country', ({ value }) => value)
    .renameColumn('date', 'year')
    .renameColumn('country', 'countryName')
    .renameColumn('countryiso3code', 'country')
  table.meta = {
    indicator: indicatorDefs,
    country: table.lookupTable('country', 'countryName'),
    year: table.coin('year') >= 0 ? (bound(table.column('year'))) : {},
    value: table.coin('year') >= 0 ? (table.column('value')|> bound) : {}
  }
  // table.meta |> deco |> says['worldbankSamplesToTable']
  table.title = Object.keys(table.meta.indicator).join(COSP)
  return table
}


