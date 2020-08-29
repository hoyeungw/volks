import { TABLE }             from '@analys/enum-tabular-types'
import { decoTable, logger } from '@spare/logger'
import { getIndicator }      from '../src/getIndicator'

const test = async () => {
  const table = await getIndicator({ format: TABLE, spin: true })
  table |> decoTable |> logger
}

test()