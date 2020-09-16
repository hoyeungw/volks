export const distinctIdValue = (idValueList) => {
  const o = {}
  for (let { id, value } of idValueList) o[id] = value
  return o
}