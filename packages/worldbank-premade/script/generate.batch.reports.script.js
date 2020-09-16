import { toTable }              from '@analys/convert'
import { MUT }                  from '@analys/enum-mutabilities'
import { INCRE }                from '@analys/enum-pivot-mode'
import { Table }                from '@analys/table'
import { bound }                from '@aryth/bound-vector'
import { NUM_DESC }             from '@aryth/comparer'
import { round, roundD1 }       from '@aryth/math'
import { Vinylize }             from '@flua/vinylize'
import { says }                 from '@palett/says'
import { deco }                 from '@spare/deco'
import { LF }                   from '@spare/enum-chars'
import { DecoTable, Xr }        from '@spare/logger'
import { Markdown }             from '@spare/markdown'
import { makeReplaceable }      from '@spare/translator'
import { OBJ }                  from '@typen/enum-data-types'
import { isNumeric }            from '@typen/num-strict'
import { time }                 from '@valjoux/timestamp-pretty'
import { init, pair }           from '@vect/object-init'
import { rawIndicators }        from '@volks/worldbank-indicator'
import gulp                     from 'gulp'
import { IndicatorsCollection } from '../src/IndicatorsCollection'
import { countryTable }         from './counryTable'
import { refineIndicatorDefs }  from './refineIndicatorDefs'

const DEST = 'packages/worldbank-premade/resources'
const logger = says['reportMaker'].attach(time)
const COUNTRIES = ['USA', 'CHN', 'JPN', 'GBR', 'DEU', 'RUS', 'IND']
const YEAR_RANGE = [1999, 2019]


const saveTopic = async (topic, countries, yearRange) => {
  Xr().start(topic).countries(countries |> deco).year(yearRange |> deco) |> logger
  const indicatorDefs = IndicatorsCollection[topic]
  const countryDefs = countries.map(iso => [iso, countryTable.lookupOne(iso, 'id', 'name')]) |> init
  const indicatorsSpec = refineIndicatorDefs(indicatorDefs)
  // try {
  const table = Table
    .from(await rawIndicators({
      indicator: indicatorsSpec,
      country: countries,
      year: yearRange,
      spin: true
    }))
    .sort('date', NUM_DESC, MUT)
  table |> DecoTable({ top: 3, bottom: 1 }) |> logger
  crostabAndSave.call({
    dest: DEST,
    filename: topic + '.byEachCountry.raw',
    infotable: countryTable.lookupTable('id', ['name', 'region', 'incomeLevel', 'capitalCity']),
    note: '##### Banners definition' + LF + Markdown.entries(Object.entries(indicatorDefs), { prefix: '- ' })
  }, table, 'date', 'indicator', 'iso')
  crostabAndSave.call({
    dest: DEST,
    filename: topic + '.byEachIndicator.raw',
    infotable: indicatorDefs,
    note: '##### Banners definition' + LF + Markdown.entries(Object.entries(countryDefs), { prefix: '- ' })
  }, table, 'date', 'iso', 'indicator')
  // }
  // catch (e) {
  //   Xr().error('saveTopic').message(e.message).trace(e |> deco) |> logger
  // }
}

/**
 *
 * @param {Table} table
 * @param {string} side
 * @param {string} banner
 * @param {string} distinctBy
 */
const crostabAndSave = function (table, side, banner, distinctBy) {
  const { dest, filename, header, footer, note, infotable } = this
  const distinctLabels = table.distinctOnColumn(distinctBy)
  const stream = Vinylize(filename + '.md')
    .p('## ' + filename + LF + LF)
    .p((header ?? '') + LF + LF)
  Xr('writing').file(filename) |> logger
  for (let label of distinctLabels) {
    const filter = pair(distinctBy, new Function('x', `return ${ isNumeric(label) ? ('+x === ' + label) : (`x === '${ label }'`) }`))
    const crosTab = table.crosTab({
      side,
      banner,
      field: { value: INCRE },
      filter,
    })
    const subTable = crosTab.toTable(side) |> toTable
    for (let key of crosTab.head) {
      const { dif } = bound.call({ dif: true }, subTable.column(key))
      const round = dif <= 100 ? roundD1 : Math.round
      subTable.mutateColumn(key, round)
    }
    Xr('add table')[distinctBy](label).filter(filter |> deco) |> logger
    const info = infotable
      ? typeof infotable[label] === OBJ
        ? (Markdown.entries(Object.entries(infotable[label]), { prefix: '- ' }) + LF + LF)
        : String(infotable[label])
      : null
    stream
      .p('### ' + label + LF + LF)
      .p(info ? (info + LF + LF) : '')
      .p(note ? (note + LF + LF) : '')
      .p(subTable |> Markdown.table)
      .p(LF + '---' + LF + LF)
  }
  stream
    .p((footer ?? '') + LF + LF)
    .pipe(gulp.dest(dest))
  Xr('written').file(filename) |> logger
}

const generateReport = async () => {
  for (let indicatorKey in IndicatorsCollection) {
    await saveTopic(indicatorKey, COUNTRIES, YEAR_RANGE)
      .then(() => {
        Xr().finish(indicatorKey).countries(COUNTRIES |> deco).year(YEAR_RANGE |> deco) |> logger
      })
  }
}

generateReport().then()