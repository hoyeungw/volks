#! /usr/bin/env node

const { WorldbankCli } = require('../dist/index.cjs')

const main = async () => {
  await WorldbankCli.start()
}

main().then()