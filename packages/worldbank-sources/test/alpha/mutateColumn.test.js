import { Table }             from '@analys/table'
import { decoTable, logger } from '@spare/logger'

const table = Table.from({
  head: ['id', 'topics'],
  rows: [
    [1, ['foo']],
    [2, ['foo', 'bar']],
    [3, []]
  ]
})

table.mutateColumn('topics', x => x?.length ? x.map(x => x) : null)

table |> decoTable |> logger