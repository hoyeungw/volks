import { TABLE }        from '@analys/enum-tabular-types'
import { says }         from '@palett/says'
import { deco }         from '@spare/deco'
import { decoTable }    from '@spare/logger'
import { rawIndicator } from '../src/rawIndicator'

const test = async () => {
  /** @type {Table}  */const table = await rawIndicator({ format: TABLE, spin: true })
  table |> decoTable |> says[table.title]
  const { message, indicators, countries } = table
  message |> deco |> says['message']
  indicators |> deco |> says['indicators']
  countries |> deco |> says['countries']
}

test()