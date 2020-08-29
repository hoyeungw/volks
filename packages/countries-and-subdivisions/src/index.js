import { Acq }     from '@acq/acq'
import { SAMPLES } from '@analys/enum-tabular-types'

const BASE = 'http://api.worldbank.org/v2'

export const getCountries = async function ({ format = SAMPLES } = {}) {
  return await Acq.tabular({
    title: 'countryList',
    url: `${ BASE }/country`,
    params: ({ format: 'json', per_page: 512 }),
    prep: ([, samples]) => samples,
    from: SAMPLES,
    to: format,
  })
}

export const getDivisions = async function ({ format = SAMPLES } = {}) {
  return await Acq.tabular({
    title: 'countryList',
    url: `${ BASE }/country`,
    params: ({ format: 'json', per_page: 512 }),
    prep: ([, samples]) => samples,
    from: SAMPLES,
    to: format,
  })
}