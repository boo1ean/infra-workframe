const fs = require('fs')
const http = require('http')
const https = require('https')
const httpShutdown = require('http-shutdown')
const express = require('express')
const requestLog = require('express-request-log')
const bodyParser = require('body-parser')

module.exports = (log, middlewares, config) => {
	process.on('uncaughtException', logErrorAndShutdown)
	process.on('unhandledRejection', logErrorAndShutdown)
	process.on('SIGINT', shutdown)
	process.on('SIGTERM', shutdown)

	const app = express()
	const httpServer = httpShutdown(http.createServer(app))
	let httpsServer

	app.use(middlewares.session)
	app.use(bodyParser.json())
	app.use(requestLog(log))

	if (config.ssl && config.ssl.privateKeyPath && config.ssl.certPath) {
		const privateKey  = fs.readFileSync(config.ssl.privateKeyPath, 'utf8')
		const certificate = fs.readFileSync(config.ssl.certPath, 'utf8')
		const credentials = { key: privateKey, cert: certificate }
		httpsServer = httpShutdown(https.createServer(credentials, app))
		app.use(function ensureSecure (req, res, next) {
			if (req.secure) {
				return next()
			}
			res.redirect('https://' + req.hostname + req.url)
		})
	}

	return { app, httpServer }

	function logErrorAndShutdown (error) {
		log.error('Fatal error shutdown', { error }, () => {
			shutdown(11)
		})
	}

	function shutdown (code) {
		httpServer.shutdown(() => {
			log.info('Application stopped')
			if (httpsServer) {
				httpsServer.shutdown(() => process.exit(code || 0))
			} else {
				process.exit(code || 0)
			}
		})
	}
}
