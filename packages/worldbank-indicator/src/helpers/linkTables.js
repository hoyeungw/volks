import { Table }   from '@analys/table'
import { acquire } from '@vect/vector-merge'

export const linkTables = (...tables) => {
  const table = new Table([], [], '')
  const meta = {}
  for (let another of tables) {
    for (let field in another.meta)
      Object.assign(field in meta ? meta[field] : (meta[field] = {}), another.meta[field])
    if (!table.head.length) table.head = acquire(table.head, another.head)
    table.rows = acquire(table.rows, another.rows)
  }
  table.title = tables.map(({ title }) => title)
  table.meta = meta
  return table
}