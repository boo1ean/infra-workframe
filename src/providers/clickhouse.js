module.exports = (config, log) => {
	try {
		const client = require('clickhouze')(config)
	} catch (e) {
		return log.error('Clickhouse config error. ', e).end(shutdown)
	}

	client.query('select 1 as val')
		.then(res => {
			if (!res || !res.val) {
				log.error('Clickhouse connection error, returned no value for "select 1 as val"').end(shutdown)
			}
		})
		.catch(e => log.error('Clickhouse connection error. ', e).end(shutdown))

	return client
}

function shutdown () {
	process.exit(11)
}
