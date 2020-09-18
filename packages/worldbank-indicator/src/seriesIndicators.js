import { says }                                  from '@palett/says'
import { time }                                  from '@valjoux/timestamp-pretty'
import { COUNTRIES, INDICATORS, WITHIN_5_YEARS } from './helpers/constants'
import { rawIndicators }                         from './rawIndicators'
import { seriesCrostab }                         from './seriesCrostab'

export const logger = says['seriesIndicators'].attach(time)

export const seriesIndicators = async function (
  { country = COUNTRIES, indicator = INDICATORS, year = WITHIN_5_YEARS, autoRefine = false, spin = false },
  { side, banner, sumBy, distinctBy }
) {
  const rawTable = await rawIndicators({ indicator, country, year, autoRefine, spin })
  return seriesCrostab(rawTable, { side, banner, sumBy, distinctBy })
}