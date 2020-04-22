(async function () {
  const fs = require('fs')
  const path = require('path')
  const { promisify } = require('util')
  const _ = require('lodash')
  const config = require('./theme.config')
  const replacer = require('./replacer')
  const { green } = require('kleur')
  const readFile = promisify(fs.readFile)
  const writeFile = promisify(fs.writeFile)
  const mkdir = promisify(fs.mkdir)

  const outputFileName = `${_.kebabCase(config.name)}-color-theme.json`
  console.log('> Processing theme file')
  const theme = await readFile('./theme.json', { encoding: 'utf-8' }).then(res => JSON.parse(res))
  const output = JSON.stringify(theme, replacer, 2)

  if (!fs.existsSync(config.outputDir)) {
    console.log(`> Creating ${config.outputDir} directory`)
    await mkdir(config.outputDir)
  }
  console.log(`> Writing ${outputFileName} to ${config.outputDir}`)
  await writeFile(path.join(config.outputDir, outputFileName), output)
  console.log(green('Done!'))
})()