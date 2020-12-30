const _get = require('lodash/get')

module.exports = function (config) {
    return function (_, value) {
        if (typeof value !== 'string') {
            return value
        }

        const matches = /{{(.*)}}/.exec(value)
        if (!matches) {
            return value
        }

        const property = matches[1].trim()
        return _get(config, property) || value
    }
}
