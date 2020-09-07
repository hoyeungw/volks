import { Acq }     from '@acq/acq'
import { SAMPLES } from '@analys/enum-tabular-types'

const BASE = 'http://api.worldbank.org/v2'

export const getTopSources = async ({ format = SAMPLES, spin } = {}) =>
  await Acq.tabular({
    url: `${ BASE }/sources?format=json`,
    prep: ([, samples]) => samples,
    from: SAMPLES,
    to: format,
    spin
  })


export const getSubSources = async ({ id, format = SAMPLES, spin } = {}) => await Acq.tabular({
  url: `${ BASE }/sources/${ id }/indicators`,
  params: ({ format: 'json', per_page: 8192 }),
  prep: ([, samples]) => samples,
  from: SAMPLES,
  to: format,
  spin
})
