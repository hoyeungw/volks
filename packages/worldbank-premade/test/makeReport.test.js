import { IMMUT, MUT }           from '@analys/enum-mutabilities'
import { Table }                from '@analys/table'
import { NUM_DESC }             from '@aryth/comparer'
import { distinct }             from '@aryth/distinct-vector'
import { round, roundD1 }       from '@aryth/math'
import { Vinylize }             from '@flua/vinylize'
import { says }                 from '@palett/says'
import { deco }                 from '@spare/deco'
import { LF }                   from '@spare/enum-chars'
import { DecoTable, Xr }        from '@spare/logger'
import { Markdown }             from '@spare/markdown'
import { makeReplaceable }      from '@spare/translator'
import { isNumeric }            from '@typen/num-strict'
import { time }                 from '@valjoux/timestamp-pretty'
import { init, pair }           from '@vect/object-init'
import { CountryTable }         from '@volks/worldbank-countries'
import { getIndicators }        from '@volks/worldbank-indicator'
import gulp                     from 'gulp'
import { IndicatorsCollection } from '../src/IndicatorsCollection'

const DEST = 'packages/worldbank-premade/resources'
const logger = says['reportMaker'].attach(time)
const COUNTRIES = ['USA', 'CHN', 'JPN', 'GBR', 'DEU', 'RUS', 'IND']
const YEAR_RANGE = [1999, 2019]

const cleanFieldDefinitionLexicon = [
  [/\(number\)$/g, ''],
  [/volatility$/g, 'volatility (ratio)']
] |> makeReplaceable

const saveTopic = async (topic, countries, yearRange) => {
  Xr().start(topic).countries(countries |>deco).year(yearRange |>deco) |> logger
  const indicators = IndicatorsCollection[topic]
  const indicatorKeys = Object.keys(indicators)
  try {
    const table = Table
      .from(await rawIndicators({ indicator: indicatorKeys, country: countries, year: yearRange, spin: true }))
      .sort('date', NUM_DESC, MUT)
    table |> DecoTable({ top: 3, bottom: 1 }) |> logger
    for (let field in indicators) {
      const fieldDefinition = indicators[field].replace(cleanFieldDefinitionLexicon)
      if (/current US\$/i.test(fieldDefinition)) {
        indicators[field] = fieldDefinition.replace(/current US\$/gi, 'current billion US\$')
        table.mutateColumn(field, x => isNumeric(x) ? round(+x / 1E+9) : x ?? '')
      }
      else if (/%/.test(fieldDefinition)) {
        table.mutateColumn(field, x => isNumeric(x) ? roundD1(+x) : x ?? '')
      }
      else if (/population/i.test(fieldDefinition) && !/\(.*\)/.test(fieldDefinition)) {
        indicators[field] = fieldDefinition + ' (million people)'
        table.mutateColumn(field, x => isNumeric(x) ? round(+x / 1E+6) : x ?? '')
      }
    }
    const header = '##### Banners definition' + LF + Markdown.entries(Object.entries(indicators), { prefix: '- ' })
    const countryInfos = Table.from(CountryTable)
      .toSamples()
      .map(({ id, name, region, incomeLevel, capitalCity }) => [id, { name, region, incomeLevel, capitalCity }])
      |> init
    pickAndSaveTableThrough.call({
      dest: DEST,
      filename: topic + '.byEachYear',
      note: header
    }, table, 'date')
    pickAndSaveTableThrough.call({
      dest: DEST,
      filename: topic + '.byEachCountry',
      infotable: countryInfos,
      note: header
    }, table, 'iso')
  }
  catch (e) {
    Xr().error(saveTopic).message(e.message).trace(e |>deco) |> logger
  }
}

const pickAndSaveTableThrough = function (table, field) {
  const { dest, filename, header, footer, note, infotable } = this
  const distinctLabels = table.column(field) |> distinct
  if (field === 'date') distinctLabels.sort(NUM_DESC)
  const stream = Vinylize(filename + '.md')
    .p('## ' + filename + LF + LF)
    .p((header ?? '') + LF + LF)
  Xr('writing').file(filename) |> logger
  for (let label of distinctLabels) {
    const filter = pair(field, new Function('x', `return ${ isNumeric(label) ? ('+x === ' + label) : (`x === '${ label }'`) }`))
    const subTable = table.find(filter, IMMUT)
    Xr('add table')[field](label).filter(filter |> deco) |> logger
    stream
      .p('### ' + label + LF + LF)
      .p((infotable ? (Markdown.entries(Object.entries(infotable[label]), { prefix: '- ' }) + LF + LF) : ''))
      .p(note ? (note + LF + LF) : '')
      .p(subTable |> Markdown.table)
      .p(LF + LF)
  }
  stream
    .p((footer ?? '') + LF + LF)
    .pipe(gulp.dest(dest))
  Xr('written').file(filename) |> logger
}

const test = async () => {
  for (let indicatorKey in IndicatorsCollection) {
    await saveTopic(indicatorKey, COUNTRIES, YEAR_RANGE)
      .then(() => {
        Xr().finish(indicatorKey).countries(COUNTRIES |> deco).year(YEAR_RANGE |> deco) |> logger
      })
  }
}

test()