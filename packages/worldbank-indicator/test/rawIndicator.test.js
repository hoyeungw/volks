import { says }         from '@palett/says'
import { deco }         from '@spare/deco'
import { decoTable }    from '@spare/logger'
import { rawIndicator } from '../src/rawIndicator'

const test = async () => {
  /** @type {Table}  */const table = await rawIndicator({
    country: ['USA', 'SSF', 'SAS'],
    year: [2019, 2014, 2007],
    autoRefine: true,
    spin: true
  })
  table |> decoTable |> says[table.title]
  const { message, meta } = table
  message |> deco |> says['message']
  meta |> deco |> says['meta']
}

test()