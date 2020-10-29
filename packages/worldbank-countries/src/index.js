import { Acq }     from '@acq/acq'
import { SAMPLES } from '@analys/enum-tabular-types'

const BASE = 'http://api.worldbank.org/v2'

export const getCountries = async function ({ format = SAMPLES } = {}) {
  return await Acq.tabular({
    title: 'countries',
    url: `${ BASE }/country`,
    params: ({ format: 'json', per_page: 512 }),
    prep: ([, samples]) => samples.filter(({ region: { id } }) => id !== 'NA'),
    from: SAMPLES,
    to: format,
  })
}

export const getCountriesAndRegions = async function ({ format = SAMPLES } = {}) {
  return await Acq.tabular({
    title: 'countries',
    url: `${ BASE }/country`,
    params: ({ format: 'json', per_page: 512 }),
    prep: ([, samples]) => samples,
    from: SAMPLES,
    to: format,
  })
}

export const getRegions = async function ({ format = SAMPLES } = {}) {
  return await Acq.tabular({
    title: 'regions',
    url: `${ BASE }/regions`,
    params: ({ format: 'json', per_page: 512 }),
    prep: ([, samples]) => samples,
    from: SAMPLES,
    to: format,
  })
}