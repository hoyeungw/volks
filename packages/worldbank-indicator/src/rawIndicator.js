import { Acq }                                  from '@acq/acq'
import { samplesToTable }                       from '@analys/convert'
import { MUT }                                  from '@analys/enum-mutabilities'
import { bound }                                from '@aryth/bound-vector'
import { NUM_ASC, STR_DESC }                    from '@aryth/comparer'
import { COSP, RT, SC }                         from '@spare/enum-chars'
import { init }                                 from '@vect/object-init'
import { first, last }                          from '@vect/vector-index'
import { BASE, COUNTRIES, GDP, WITHIN_5_YEARS } from './helpers/constants'
import { parseLabel, parseYear }                from './helpers/parsers'
import { refineTable }                          from './helpers/refineTable'


/**
 *
 * @param {string|string[]} [country]
 * @param {string} [indicator]
 * @param {number|number[]} [year]
 * @param {boolean} [autoRefine]
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
  const years = parseYear(year)
  const per_page = countries.length * (last(years) - first(years) + 1)
  const { message, samples } = await Acq.fetch({
    title: indicator,
    url: `${ BASE }/country/${ countries.join(SC) }/indicator/${ indicator }`,
    params: ({ date: first(years) + RT + last(years), format: 'json', per_page: per_page }),
    prep: ([message, samples]) => ({ message, samples }),
    spin
  })
  const table = worldbankSamplesToTable(samples, countries, years, autoRefine)
  table.message = message
  return table
}

/**
 *
 * @param {Object[]} samples
 * @param {string[]} countries
 * @param {number[]} years
 * @param {boolean} autoRefine
 * @return {Table}
 */
export const worldbankSamplesToTable = (samples, countries, years, autoRefine) => {
  // samples |> DecoSamples({ top: 3, bottom: 1 }) |> says['worldbankSamplesToTable']
  /** @type {Table}  */const table = samples |> samplesToTable
  // if (!table?.head?.length || !table?.rows?.length) return table
  const indicatorDefs = init(table.column('indicator').map(({ id, value }) => [id, value]))
  table
    .mutateColumn('indicator', ({ id }) => id)
    .mutateColumn('countryiso3code', (x, i) => x?.length ? x : table.cell(i, 'country')?.id)
    .mutateColumn('country', ({ value }) => value)
    .renameColumn('date', 'year')
    .renameColumn('country', 'countryName')
    .renameColumn('countryiso3code', 'country')
    .proliferateColumn({ key: 'country', to: countries.indexOf.bind(countries), as: 'countryIndex' }, MUT)
    .sort('year', STR_DESC)
    .sort('countryIndex', NUM_ASC)
  if (years.length > 2) table.find({ year: y => years.includes(+y) }, MUT)
  table.meta = {
    indicator: indicatorDefs,
    country: table.lookupTable('country', 'countryName'),
    year: table.coin('year') >= 0 ? bound(table.column('year')) : {},
    value: table.coin('value') >= 0 ? bound(table.column('value')) : {}
  }
  // table.meta |> deco |> says['worldbankSamplesToTable']
  table.title = Object.keys(table.meta.indicator).join(COSP)
  if (autoRefine) refineTable(table, table.meta.indicator)

  return table
}


