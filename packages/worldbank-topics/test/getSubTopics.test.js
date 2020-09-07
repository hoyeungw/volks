import { TABLE }             from '@analys/enum-tabular-types'
import { decoTable, logger } from '@spare/logger'
import { getSubTopics }      from '../src'

export const test = async () => {
  const samples = await getSubTopics({ id: 3, format: TABLE })
  samples |> decoTable |> logger
}

test().then()