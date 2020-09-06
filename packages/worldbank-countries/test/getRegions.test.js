import { UNION }                              from '@analys/enum-join-modes'
import { TABLE }                              from '@analys/enum-tabular-types'
import { Table }                              from '@analys/table'
import { decoTable, logger }                  from '@spare/logger'
import { getCountriesAndRegions, getRegions } from '../src'

const test = async () => {
  let table1 = Table.from(await getRegions({ format: TABLE }))
  table1 = table1
    .deleteColumn('id')
    .renameColumn('code', 'id')
  table1 |> decoTable |> logger
  const table2 = Table.from(await getCountriesAndRegions({ format: TABLE })).find({ region: ({ id }) => id === 'NA' })
  table2 |> decoTable |> logger
  table1.join(table2, ['id'], UNION) |> decoTable |> logger


}

test().then()