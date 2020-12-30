const { test } = require('uvu')
const assert = require('uvu/assert')
const config = require('./theme.config')
const replacer = require('./replacer')(config)

const theme = {
  "name": "{{ name }}",
  "type": "light",
  "colors": {
    "background": "{{ colors.lightGray }}",
    "border": "{{ colors.gray }}",
    "foreground": "{{ colors.blue }}"
  }
}

test('replaces variable interpolation in JSON files based on theme config', () => {
  const stringified = JSON.stringify(theme, replacer)
  const parsed = JSON.parse(stringified)
  assert.equal(parsed.name, config.name)
  assert.equal(parsed.colors['background'], config.colors.lightGray)
  assert.equal(parsed.colors['border'], config.colors.gray)
  assert.equal(parsed.colors['foreground'], config.colors.blue)
})

test.run()
