import { SAMPLES }             from '@analys/enum-tabular-types'
import { decoSamples, logger } from '@spare/logger'
import { getCountries }        from '../src'

const test = async () => {
  const samples = await getCountries({ format: SAMPLES })
  samples |> decoSamples |> logger
}

test().then()