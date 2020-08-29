import { TABLE }           from '@analys/enum-tabular-types'
import { Table }           from '@analys/table'
import { esvar }           from '@flua/utils'
import { Vinylize }        from '@flua/vinylize'
import { snakeToPascal }   from '@spare/phrasing'
import { makeReplaceable } from '@spare/translator'
import { Verse }           from '@spare/verse'
import gulp                from 'gulp'
import { getTopics }       from '../src/getTopics'

const SRC = 'packages/worldbank-topics/resources'
const DEST = SRC
const FILENAME = 'Topics'

const LEXICON = [
  [/Agriculture/gi, 'Agri'],
  [/Econom(?:y|ic)/gi, 'Econ'],
  [/Effectiveness/gi, 'Eff'],
  [/Development/gi, 'Dev'],
  [/Education/gi, 'Edu'],
  [/Environment/gi, 'Env'],
  [/Financial/gi, 'Fin'],
  [/Infrastructure/gi, 'Infras'],
  [/Science/gi, 'Sci'],
  [/Technology/gi, 'Tech'],
  [/Millenium/gi, '2k'],
  [/External/gi, 'Ext'],
  [/Internal/gi, 'Int'],
  [/Social Protection/gi, 'SP'],
  [/Sector$/gi, ''],
  [/Growth/gi, 'Gr'],
  [/Change/gi, 'Ch'],
] |> makeReplaceable

const saveTopics = async () => {
  const topics = Table.from(await getTopics({ format: TABLE }))
  const codes = topics
    .column('value')
    .map(x => x.replace(LEXICON) |> snakeToPascal)
  topics.insertColumn('code', codes, { field: 'value', mutate: true })
  await Vinylize(FILENAME + '.js')
    .p(esvar(FILENAME))
    .p(Verse.table(topics))
    .pipe(gulp.dest(DEST))
}


export const saveWorldbankTopics = gulp.series(
  saveTopics
)