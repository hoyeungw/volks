import { TABLE }             from '@analys/enum-tabular-types'
import { decoTable, logger }  from '@spare/logger'
import { getTopLevelSources } from '../src'

export const test = async () => {
  const samples = await getTopLevelSources({ format: TABLE })
  samples |> decoTable |> logger
}

test().then()