import { Acq }     from '@acq/acq'
import { SAMPLES } from '@analys/enum-tabular-types'

const BASE = 'http://api.worldbank.org/v2'

export const getTopTopics = async ({ format = SAMPLES, spin } = {}) =>
  await Acq.tabular({
    url: `${ BASE }/topic?format=json`,
    prep: ([, samples]) => samples,
    from: SAMPLES,
    to: format,
    spin
  })

export const getSubTopics = async ({ id, format = SAMPLES, spin } = {}) =>
  await Acq.tabular({
    url: `${ BASE }/topic/${ id }/indicator`,
    params: { format: 'json', per_page: 8096 },
    prep: ([, samples]) => samples,
    from: SAMPLES,
    to: format,
    spin
  })
