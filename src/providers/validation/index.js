const ajv = require('ajv')
const en = require('./en')
const locales = { en }

const validation = new ajv({
	v5: true,
	allErrors: true,
	removeAdditional: true,
	coerceTypes: true,
	useDefaults: true
})

function createValidator (schema) {
	schema.$async = true
	const validate = validation.compile(schema)
	return (data, lang) => {
		return validate(data)
			.then(data => data)
			.catch(e => formatAndTranslateError(e, lang))
	}
}

function formatAndTranslateError ({ errors }, { lang }) {
	const locale = locales[lang || 'en']
	throw { validationErrors: errors.reduce(reduceError, {}) }

	function reduceError (result, error) {
		result[getErrorKey(error)] = locale(error)
		return result
	}

	function getErrorKey (error) {
		if (error.params.missingProperty) {
			return error.params.missingProperty
		}
		return error.dataPath.slice(1)
	}
}

validation.error = validationErrors => {
	const err = new Error('Validation error')
	err.validationErrors = validationErrors
	throw err
}

validation.addKeyword('notEmpty', {
	validate: function (_, val) {
		return !!val
	},
})
module.exports = () => {
	return new Proxy(createValidator, {
		get: (_, key) => validation[key].bind(validation),
	})
}
