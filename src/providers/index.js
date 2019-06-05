const knex = require('./knex')
const log = require('./log')
const allow = require('./allow')
const controller = require('./controller')
const clickhouse = require('./clickhouse')
const validation = require('./validation')

module.exports = config => {
	const providers = {
		controller: controller(),
		validation: validation(),
		log: log(config.log || {}),
	}

	//
	// optional providers
	//

	if (config.db) {
		providers.knex = knex(config.db, providers.log)
		providers.allow = allow(providers.knex)
	}
	if (config.clickhouse) {
		providers.clickhouse = clickhouse(config.clickhouse, providers.log)
	}
	return providers
}
