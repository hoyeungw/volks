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
import { time }                         from '@valjoux/timestamp-pretty'
import { rawIndicators, seriesCrostab } from '@volks/worldbank-indicator/index'
import gulp                             from 'gulp'
import { IndicatorsCollection }         from '../src/IndicatorsCollection'

const DEST = 'packages/worldbank-premade/resources'
const logger = says['reportMaker'].attach(time)
const COUNTRIES = ['USA', 'CHN', 'JPN', 'GBR', 'DEU', 'RUS', 'IND']
const YEAR_RANGE = [1999, 2019]
const red = HexDye(Cards.red.base, BOLD, ITALIC)

const batchSaveReport = async ({ topic, indicator, country, year }) => {
  Xr().start(topic).countries(country |> deco).year(year |> deco) |> logger
  try {
    /** @type {Table}  */const table = (await rawIndicators({
      indicator: indicator,
      country: country,
      year: year,
      autoRefine: true,
      spin: true
    }))
      .sort('year', NUM_DESC, MUT)
    table |> DecoTable({ top: 3, bottom: 1 }) |> logger
    saveSeriesCrostab.call(
      { dest: DEST, filename: topic + '.byEachCountry.raw', },
      table,
      { side: 'year', banner: 'indicator', distinctBy: 'country' }
    )
    saveSeriesCrostab.call(
      { dest: DEST, filename: topic + '.byEachIndicator.raw', },
      table,
      { side: 'year', banner: 'country', distinctBy: 'indicator' }
    )
  }
  catch (e) {
    Xr()[red('error')](topic).message(e.message).trace(e |> deco) |> logger
  }
}

/**
 *
 * @param {Table} table
 * @param {string} side
 * @param {string} banner
 * @param {string} distinctBy
 */
const saveSeriesCrostab = function (table, { side, banner, distinctBy }) {
  const { dest, filename, header, footer } = this
  const crostabCollection = seriesCrostab(table, { side, banner, sumBy: 'value', distinctBy })
  const stream = Vinylize(filename + '.md')
    .p('## ' + filename + LF + LF)
    .p((header ?? '') + LF + LF)
  Xr('writing').file(filename) |> logger
  for (let [key, table] of Object.entries(crostabCollection)) {
    const meta = table.meta
    Xr('add table')[distinctBy](key).filter(meta.filter |> deco) |> logger
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

const generateReport = async () => {
  for (let indicatorKey in IndicatorsCollection) {
    await batchSaveReport({
      topic: indicatorKey,
      indicator: IndicatorsCollection[indicatorKey],
      country: COUNTRIES,
      year: YEAR_RANGE
    })
      .then(() => {
        Xr().finish(indicatorKey).countries(COUNTRIES |> deco).year(YEAR_RANGE |> deco) |> logger
      })
  }
}

generateReport().then()