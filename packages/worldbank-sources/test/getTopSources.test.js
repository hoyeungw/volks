import { TABLE }             from '@analys/enum-tabular-types'
import { decoTable, logger } from '@spare/logger'
import { getTopSources }     from '../src/getSources'

export const test = async () => {
  const samples = await getTopSources({ format: TABLE })
  samples |> decoTable |> logger
}

test().then()