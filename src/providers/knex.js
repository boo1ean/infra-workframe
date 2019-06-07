const knex = require('knex')
module.exports = (config, log) => {
	try {
		const client = knex(config)
	} catch (e) {
		return log.error('Knex config error. ', e).end(shutdown)
	}

	client.raw('select 1')
		.catch(e => log.error('Postgres connection error. ', e).end(shutdown))

	return client
}

function shutdown () {
	process.exit(11)
}
