import { round, roundD1 }  from '@aryth/math'
import { makeReplaceable } from '@spare/translator'
import { isNumeric }       from '@typen/num-strict'

const cleanFieldDefinitionLexicon = [
  [/\(number\)$/g, ''],
  [/volatility$/g, 'volatility (ratio)']
] |> makeReplaceable

export const refineIndicatorDefs = (indicatorDefs) => {
  const spec = {}
  for (let field in indicatorDefs) {
    const definition = indicatorDefs[field].replace(cleanFieldDefinitionLexicon)
    if (/current US\$/i.test(definition)) {
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