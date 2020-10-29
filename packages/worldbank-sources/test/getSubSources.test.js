import { TABLE }                from '@analys/enum-tabular-types'
import { Table }                from '@analys/table'
import { says }                 from '@palett/says'
import { deco }                 from '@spare/deco'
import { decoTable, Xr }        from '@spare/logger'
import { getSubTopics, Topics } from '@volks/worldbank-topics'

export const test = async () => {
  const id = 1
  const table = await getSubTopics({ id: id, format: TABLE })
  const topTopicsTable = Topics |> Table.from
  const info = topTopicsTable.row('id', id, true)
  table |> decoTable |> says[info.value]
  Xr().count(table.rows.length).p(info |> deco) |> says[info.value]
}

test().then()