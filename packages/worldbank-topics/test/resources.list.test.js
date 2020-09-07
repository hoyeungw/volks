import { delogger } from '@spare/deco'
import { promises } from 'fs'

const SRC = 'packages/worldbank-topics/resources/topics'
const test = async () => {
  const list = await promises.readdir(SRC)
  list |> delogger
}

test().then()