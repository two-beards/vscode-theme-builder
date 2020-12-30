const fs = require('fs')
const path = require('path')
const _get = require('lodash/get')
const _kebabCase = require('lodash/kebabCase')
const replacer = require('./replacer')
const { green } = require('kleur')

function buildTheme(config) {
    // name is required
    if (!_get(config, 'name')) {
        console.error('Config is missing the required field `name`')
        process.exit(1)
    }
    // get output file name for theme, and ensure it's a JSON file
    let outputFileName = _get(config, 'outputFileName', `${_kebabCase(config.name)}-color-theme.json`)
    let extension = path.extname(outputFileName)
    if (extension !== '.json') {
        outputFileName = `${path.basename(outputFileName, extension)}.json`
    }

    console.log('> Processing theme file')
    // make sure we have an input file to use
    if (!_get(config, 'inputFile')) {
        console.error('Config is missing the required field `inputFile`')
        process.exit(1)
    }

    const themeFile = path.join(process.cwd(), _get(config, 'inputFile'))
    if (!fs.existsSync(themeFile)) {
        console.error(`Error processing theme: inputFile ${themeFile} does not exist.`)
        process.exit(1)
    }

    const theme = fs.readFileSync(themeFile, { encoding: 'utf-8' })
    let output
    try {
        output = JSON.stringify(JSON.parse(theme), replacer(config), 4)
    } catch (e) {
        console.error('Input file is invalid JSON')
        process.exit(1)
    }

    // ensure we have an output directory, default to 'themes' if none is provided
    let outputDir = path.join(process.cwd(), _get(config, 'outputDir', 'themes'))
    if (!fs.existsSync(outputDir)) {
        console.log(`> Creating ${outputDir} directory`)
        fs.mkdir(outputDir)
    }
    console.log(`> Writing ${outputFileName} to ${outputDir}`)
    fs.writeFileSync(path.join(outputDir, outputFileName), output)
    console.log(green('Done!'))
}

module.exports = function (options) {
    if (Array.isArray(options)) {
        for (let config of options) {
            buildTheme(config)
        }
    } else {
        buildTheme(options)
    }
}
