import { Acq }     from '@acq/acq'
import { SAMPLES } from '@analys/enum-tabular-types'

const BASE = 'http://api.worldbank.org/v2'

export const getTopics = async ({ format = SAMPLES, spin } = {}) =>
  await Acq.tabular({
    url: `${ BASE }/topic?format=json`,
    prep: ([, samples]) => samples,
    from: SAMPLES,
    to: format,
    spin
  })
