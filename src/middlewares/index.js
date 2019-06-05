const session = require('./session')
const handleError = require('./handle-error')

module.exports = (config, providers) => {
	const middlewares = {
		handleError: handleError(providers.log),
	}
	if (config.session && providers.knex) {
		middlewares.session = session(config.session, providers.knex)
	}
	return middlewares
}
