module.exports = (config, log) => {
	const client = require('clickhouze')(config)

	client.querySingle('select 1 as val')
		.then(res => {
			if (!res || !res.val) {
				log.error('Clickhouse connection error', e, () => process.exit(11))
			}
		})
		.catch(e => log.error('Clickhouse connection error', e, () => process.exit(11)))

	return client
}
