import { esvar }    from '@flua/utils'
import { Vinylize } from '@flua/vinylize'
import { Verse }    from '@spare/verse'
import gulp         from 'gulp'

const SRC = 'packages/gulp-template/static'
const DEST = 'packages/gulp-template/resources'
const FILENAME = 'data'

const saveSomething = async () => await Vinylize(FILENAME + '.js')
  .p(esvar(FILENAME))
  .p(Verse.object({}))
  .pipe(gulp.dest(DEST))

export const templateTask = gulp.series(
  saveSomething
)