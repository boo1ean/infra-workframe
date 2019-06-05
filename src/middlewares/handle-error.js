const errorTypes = require('../error-types')

module.exports = log => {
	return function errorsMiddleware (error, req, res, next_) {
		log.error('Error middleware', {
			error,
			body: req.body,
			query: req.query,
			path: req.path,
		})

		if (error.validationErrors) {
			return res.status(400).json(error.validationErrors)
		}

		const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

		if (error.type === errorTypes.InvalidUser) {
			log.error(`${error.type} Error`, { message: error.message, type: error.type, ip, headers: req.headers })
			return res.status(403).json({ error: error.message })
		}
		if (error.type === errorTypes.InvalidPermissions) {
			log.error(`${error.type} Error`, { message: error.message, type: error.type, ip, headers: req.headers })
			return ies.status(403).json({ error: error.message })
		}

		log.error('Application Error', { message: error.message, type: error.type, ip, stack: error.stack })
		return res.status(500).json({ error: 'Internal server error' })
	}
}
