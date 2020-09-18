import { round, roundD1 }  from '@aryth/math'
import { trim }            from '@spare/string'
import { makeReplaceable } from '@spare/translator'
import { isNumeric }       from '@typen/num-strict'

const cleanerDictionary = [
  [/\(number\)$/g, ''],
  [/volatility$/g, 'volatility (ratio)']
] |> makeReplaceable

/**
 *
 * @param {Object<string,string>} indicatorDefs
 * @return {{}}
 */
export const refineIndicators = (indicatorDefs) => {
  const spec = {}
  for (let field in indicatorDefs) {
    const definition = indicatorDefs[field].replace(cleanerDictionary, trim)
    if (/current\sUS\$/i.test(definition)) {
      indicatorDefs[field] = definition.replace(/current US\$/gi, 'current billion US\$')
      spec[field] = x => isNumeric(x) ? round(+x / 1E+9) : 0 ?? 0
      continue
    }
    if (/%/.test(definition)) {
      spec[field] = x => isNumeric(x) ? roundD1(+x) : 0 ?? 0
      continue
    }
    if (/population/i.test(definition) && !/\(.*\)/.test(definition)) {
      indicatorDefs[field] = definition + ' (million people)'
      spec[field] = x => isNumeric(x) ? round(+x / 1E+6) : 0 ?? 0
      continue
    }
    spec[field] = null
  }
  return spec
}