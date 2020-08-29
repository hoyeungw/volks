import { Acq }            from '@acq/acq'
import { SAMPLES, TABLE } from '@analys/enum-tabular-types'
import { bound }          from '@aryth/bound-vector'
import { RT }             from '@spare/enum-chars'

const BASE = 'http://api.worldbank.org/v2'

export const parseLabel = label => Array.isArray(label) ? label : [label]

export const parseYear = year => {
  if (!Array.isArray(year) || !year?.length) return year
  const { max, min } = bound(year)
  return [min, max]
}

const COUNTRIES = ['USA', 'CHN', 'JPN', 'ECS'] // 'ECS': Europe & Central Asia
const GDP = 'NY.GDP.MKTP.CD', POP = 'SP.POP.TOTL'
const INDICATORS = [GDP, POP]
const WITHIN_5_YEARS = [2015, 2020]

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
export const getIndicator = async function (
  {
    country = COUNTRIES,
    indicator = INDICATORS,
    year = WITHIN_5_YEARS,
    format = TABLE, easy = false, spin = false
  } = {}
) {
  const countries = parseLabel(country)
  const indicators = parseLabel(indicator)
  const yearEntry = parseYear(year)
  return await Acq.tabular({
    title: 'indicator',
    url: `${ BASE }/country/${ countries.join(';') }/indicator/${ indicators.join(';') }`,
    params: ({ date: yearEntry.join(RT), format: 'json', per_page: 2048, source: 2 }),
    prep: ([, samples]) => samples,
    fields: null,
    from: SAMPLES,
    to: format,
    easy,
    spin
  })
}
