import { Acq }     from '@acq/acq'
import { SAMPLES } from '@analys/enum-tabular-types'

const BASE = 'http://api.worldbank.org/v2'

export const getTopLevelSources = async ({ format = SAMPLES, spin } = {}) =>
  await Acq.tabular({
    url: `${ BASE }/sources?format=json`,
    prep: ([, samples]) => samples,
    from: SAMPLES,
    to: format,
    spin
  })


export const getSource = async ({ sourceId, format = SAMPLES, spin } = {}) => await Acq.tabular({
  url: `${ BASE }/sources/${ sourceId }/indicators`,
  params: ({ format: 'json', per_page: 1024 }),
  prep: ([, samples]) => samples,
  from: SAMPLES,
  to: format,
  spin
})
