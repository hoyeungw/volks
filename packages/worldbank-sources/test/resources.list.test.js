import { delogger } from '@spare/deco'
import { logger }   from '@spare/logger'
import { promises } from 'fs'
import { Sources }  from '../index'

const SRC = 'packages/worldbank-sources/resources/sources'
const test = async () => {
  const list = await promises.readdir(SRC)
  list |> delogger

  Object.keys(Sources) |> logger
}

test().then()