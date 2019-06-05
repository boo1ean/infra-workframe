const knex = require('knex')
module.exports = (config, log) => {
	const client = knex(config)
	client.raw('select 1')
		.catch(e => log.error('postgres connection error', e, () => process.exit(11)))
	return client
}
