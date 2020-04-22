const replacer = require('./replacer')
const config = require('./theme.config')

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
  expect(parsed.name).toBe(config.name)
  expect(parsed.colors['background']).toBe(config.colors.lightGray)
  expect(parsed.colors['border']).toBe(config.colors.gray)
  expect(parsed.colors['foreground']).toBe(config.colors.blue)
})