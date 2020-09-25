import { MUT }                          from '@analys/enum-mutabilities'
import { Table }                        from '@analys/table'
import { NUM_DESC }                     from '@aryth/comparer'
import { Vinylize }                     from '@flua/vinylize'
import { Cards }                        from '@palett/cards'
import { HexDye }                       from '@palett/dye'
import { BOLD, ITALIC }                 from '@palett/enum-font-effects'
import { says }                         from '@palett/says'
import { deco }                         from '@spare/deco'
import { LF }                           from '@spare/enum-chars'
import { DecoTable, Xr }                from '@spare/logger'
import { Markdown }                     from '@spare/markdown'
import { capitalize }                   from '@spare/phrasing'
import { time }                         from '@valjoux/timestamp-pretty'
import { rawIndicators, seriesCrostab } from '@volks/worldbank-indicator/index'
import gulp                             from 'gulp'
import { IndicatorsCollection }         from '../src/IndicatorsCollection'

const DEST = 'packages/worldbank-premade/resources'
const logger = says['reportMaker'].attach(time)
const COUNTRIES = ['USA', 'CHN', 'JPN', 'GBR', 'DEU', 'RUS', 'IND']
const YEARS = [1999, 2019]
const red = HexDye(Cards.red.base, BOLD, ITALIC)

export const saveWorldbankPremadeTableCollection = async () => {
  for (let key in IndicatorsCollection)
    if (key === 'Education') {
      await saveGroup({
        topic: key,
        indicator: IndicatorsCollection[key],
        country: COUNTRIES,
        year: YEARS
      }).then(() => {
        Xr().finish(key).countries(COUNTRIES |> deco).year(YEARS |> deco) |> logger
      })
    }
}

const saveGroup = async ({ topic, indicator, country, year }) => {
  Xr().start(topic).countries(country |> deco).year(year |> deco) |> logger
  try {
    /** @type {Table} */
    const table = await rawIndicators({ indicator, country, year, autoRefine: true, spin: true })
    table.sort('year', NUM_DESC, MUT)
    table |> DecoTable({ top: 3, bottom: 1 }) |> logger
    scopeAndWriteFile.call({ dest: DEST, topic }, table, { side: 'year', banner: 'indicator', distinctBy: 'country' })
    scopeAndWriteFile.call({ dest: DEST, topic }, table, { side: 'year', banner: 'country', distinctBy: 'indicator' })
    scopeAndWriteFile.call({ dest: DEST, topic }, table, { side: 'country', banner: 'indicator', distinctBy: 'year' })
  }
  catch (e) {
    Xr()[red('error')](topic).trace(e |> deco) |> logger
  }
}

/**
 *
 * @param {Table} table
 * @param {string} side
 * @param {string} banner
 * @param {string} distinctBy
 */
const scopeAndWriteFile = function (table, { side, banner, distinctBy }) {
  const { dest, topic, header, footer } = this
  const crostabCollection = seriesCrostab(table, { side, banner, sumBy: 'value', distinctBy })
  const title = topic + '.byEach' + capitalize(distinctBy)
  const filename = title + '.md'
  const stream = Vinylize(filename)
    .p('## ' + title + LF + LF)
    .p((header ?? '') + LF + LF)
  Xr('writing').file(filename) |> logger
  for (let [key, table] of Object.entries(crostabCollection)) {
    const meta = table.meta
    // Xr('add file')[distinctBy](key).p(meta.filter |> deco) |> logger
    stream
      .p('### ' + key + LF + LF)
      .p('##### Table-spec:' + table.title + LF + LF)
      .p('##### Filter definition' + LF + Markdown.entries(Object.entries(meta.filter), { prefix: '- ' }) + LF + LF)
      .p('##### Sides definition' + LF + Markdown.entries(Object.entries(meta.side), { prefix: '- ' }) + LF + LF)
      .p('##### Banners definition' + LF + Markdown.entries(Object.entries(meta.banner), { prefix: '- ' }) + LF + LF)
      .p(table |> Markdown.table)
      .p(LF + '---' + LF + LF)
  }
  stream
    .p((footer ?? '') + LF + LF)
    .pipe(gulp.dest(dest))
  Xr('written').file(filename) |> logger
}

