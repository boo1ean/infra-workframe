const createApp = require('./create-app')

module.exports = config => {
	const providers = require('./providers')(config)
	const middlewares = require('./middlewares')(config, providers)

	return {
		...providers,
		middlewares,
		createApp,
	}
}
