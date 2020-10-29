import { TABLE }             from '@analys/enum-tabular-types'
import { decoTable, logger } from '@spare/logger'
import { getTopTopics }      from '../src'

export const test = async () => {
  const samples = await getTopTopics({ format: TABLE })
  samples |> decoTable |> logger
}

test().then()