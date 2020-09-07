import { says }                          from '@palett/says'
import { decoObject, decoTable, logger } from '@spare/logger'
import { getIndicators }                 from '../src/getIndicators'

const test = async () => {
  const table = await getIndicators({ spin: true })
  table.indicators |> decoObject |> says['indicators']
  table.countries |> decoObject |> says['countries']
  table |> decoTable |> logger
}

test()