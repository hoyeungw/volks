import { TABLE }           from '@analys/enum-tabular-types'
import { Table }           from '@analys/table'
import { esvar }           from '@flua/utils'
import { Vinylize }        from '@flua/vinylize'
import { snakeToPascal }   from '@spare/phrasing'
import { makeReplaceable } from '@spare/translator'
import { Verse }           from '@spare/verse'
import gulp                from 'gulp'
import { getTopTopics }    from '../src'

const SRC = 'packages/worldbank-topics/resources'
const DEST = SRC
const FILENAME = 'TopTopicTable'

const LEXICON = [
  [/Agriculture/gi, 'Agri'],
  [/Econom(?:y|ic)/gi, 'Econ'],
  [/Effectiveness/gi, 'Eff'],
  [/Development/gi, 'Dev'],
  [/Education/gi, 'Edu'],
  [/Environment/gi, 'Env'],
  [/Financial/gi, 'Fin'],
  [/Infrastructure/gi, 'Infras'],
  [/Science\s+(?:&|and)\s+Technology/gi, 'STEM'],
  [/Science/gi, 'Sci'],
  [/Technology/gi, 'Tech'],
  [/Millenium/gi, '2k'],
  [/Social\s+Protection/gi, 'SP'],
  [/Growth/gi, 'Gr'],
  [/Change/gi, 'Ch'],
  [/Internal/gi, 'Int'],
  [/External/gi, ''],
  [/Dev\s+Goals/i, 'Goals'],
  [/Mining/i, ''],
  [/Eff$/, ''],
  [/Sector$/, ''],
  [/Dev$/, ''],
  [/Ch$/, ''],
  [/Gr$/, ''],
  [/^SP/, '']
] |> makeReplaceable

export const saveTopTopics = async () => {
  const topTopicTable = Table
    .from(await getTopTopics({ format: TABLE }))
    .renameColumn('value', 'name')
  const codes = topTopicTable
    .column('name')
    .map(x => x.replace(LEXICON, snakeToPascal))
  topTopicTable.insertColumn('code', codes, { field: 'name', mutate: true })
  await Vinylize(FILENAME + '.js')
    .p(esvar(FILENAME))
    .p(Verse.table(topTopicTable))
    .asyncPipe(gulp.dest(DEST))
}

