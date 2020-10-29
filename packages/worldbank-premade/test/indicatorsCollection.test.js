import { says }                 from '@palett/says'
import { deco }                 from '@spare/deco'
import { SP }                   from '@spare/enum-chars'
import { decoTable }            from '@spare/logger'
import { time }                 from '@valjoux/timestamp-pretty'
import { rawIndicators }        from '@volks/worldbank-indicator'
import ora                      from 'ora'
import { countries }            from '../src/countries'
import { IndicatorsCollection } from '../src/IndicatorsCollection'

const test = async () => {
  const spinner = ora()
  for (let key in IndicatorsCollection) {
    const indicators = IndicatorsCollection[key]
    spinner.start(time() + ' querying ' + deco(indicators) + ' for ' + deco(countries))
    const table = await rawIndicators({
      country: countries,
      indicator: Object.keys(indicators),
      year: [1999, 2019],
      spin: true
    }).catch(error => {
      spinner.fail(time() + SP + deco(error))
    })
    spinner.succeed(time() + ' queried');
    (table ?? {}) |> decoTable |> says[key]
  }
}

test().then()