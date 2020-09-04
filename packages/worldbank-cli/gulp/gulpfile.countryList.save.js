import { esvar }       from '@flua/utils'
import { Vinylize }    from '@flua/vinylize'
import { says }        from '@palett/says'
import { SP }          from '@spare/enum-chars'
import { Verse }       from '@spare/verse'
import { CountryIsos } from '@volks/countries-and-subdivisions'
import gulp            from 'gulp'

const DEST = 'packages/worldbank-cli/resources'
const FILENAME = 'countryList'

export const saveCountryList = async () => {
  const samples = Object.entries(CountryIsos)
    .map(
      ([name, id]) => ({ name: name.replace(/_/g, SP) + ' | ' + id, value: id })
    )
  samples.length |> says['countryList.length']
  await Vinylize(FILENAME + '.js')
    .p(esvar(FILENAME))
    .p(Verse.samples(samples))
    .pipe(gulp.dest(DEST))
}