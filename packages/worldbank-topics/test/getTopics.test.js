import { TABLE }             from '@analys/enum-tabular-types'
import { decoTable, logger }  from '@spare/logger'
import { getTopics } from '../src/getTopics'

export const test = async () => {
  const samples = await getTopics({ format: TABLE })
  samples |> decoTable |> logger
}

test().then()