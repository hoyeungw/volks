import { toTable }              from '@analys/convert'
import { INCRE }                from '@analys/enum-pivot-mode'
import { bound as boundVector } from '@aryth/bound-vector'
import { roundD1 }              from '@aryth/math'
import { Rename }               from '@ject/rename'
import { says }                 from '@palett/says'
import { deco }                 from '@spare/deco'
import { Xr }                   from '@spare/logger'
import { isNumeric }            from '@typen/num-strict'
import { time }                 from '@valjoux/timestamp-pretty'
import { pair }                 from '@vect/object-init'

export const logger = says['seriesIndicators'].attach(time)

/**
 *
 * @param {Table} rawTable
 * @param {Object} rawTable.meta
 * @param {string} side
 * @param {string} banner
 * @param {string} sumBy
 * @param {string} distinctBy
 * @param {boolean} spin
 * @return {Object<string,Table>}}
 */
export const seriesCrostab = (rawTable, { side, banner, sumBy, distinctBy, spin }) => {
  const { meta } = rawTable
  const tables = {}
  // rawTable |> decoTable |> logger
  for (let topic of rawTable.distinctOnColumn(distinctBy)) {
    const topicName = meta[distinctBy][topic] ?? topic
    const field = pair(sumBy, INCRE)
    const filter = pair(distinctBy,
      (new Function('x', `return ${ isNumeric(topic) ? ('+x === ' + topic) : (`x === '${ topic }'`) }`)) |> Rename('f')
    )
    const crosTab = rawTable.crosTab({ side, banner, field, filter })
    const subTable = crosTab.toTable(side) |> toTable
    for (let key of crosTab.head) {
      const { max, dif } = boundVector(subTable.column(key))
      const round = max < 1000 && dif <= 100 ? roundD1 : Math.round
      subTable.mutateColumn(key, round)
    }
    subTable.title = `(${ side }) cross (${ banner }) sum by (${ sumBy }) when (${ distinctBy }) is (${ topicName })`
    subTable.meta = {
      side: meta[side],
      banner: meta[banner],
      filter: pair(distinctBy, topicName)
    }
    tables[topic] = subTable
    if (spin) Xr('add table').filter(filter|> deco) |> logger
  }
  return tables
}