#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const meow = require('meow')
const build = require('./build')

const cli = meow()
// default to a `theme.config.js` file, but allow them to pass in anything
let configFile = cli.input.length === 0 ? 'theme.config.js' : cli.input.join(' ').trim()
if (!fs.existsSync(path.join(process.cwd(), configFile))) {
    console.error(`Config file ${configFile} does not exist.`)
    process.exit(1)
}
const config = require(path.join(process.cwd(), configFile))
module.exports = build(config)
