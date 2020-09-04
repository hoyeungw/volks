#! /usr/bin/env node

(async function () { await require('..').WorldbankCli.start() })()

// const { WorldbankCli } = require('../dist/index.cjs')
//
// const main = async () => {
//   await WorldbankCli.start()
// }
//
// main().then()