const winston = require('winston')
const logform = require('logform')
const { SPLAT } = require('triple-beam')

const DEBUG_LOG_LEVEL = 'debug'

module.exports = config => {
	// It's supposed to use errors like log.error('Contextual message', new Error('HAHAHA'))

	const errorStackFormatter = logform.format(info => {
		const error = (info[SPLAT] || []).find(obj => obj instanceof Error)

		if (error) {
			const formatedError = {
				message: error.message,
				stack: error.stack.split('\n') || error.toString()
			}
			info.error = formatedError
			delete info.stack
		}

		return info
	})

	const winstonConsoleFormat = logform.format.combine(
		logform.format.label({ label: config.label }),
		logform.format.timestamp(),
		logform.format.splat(),
		errorStackFormatter(),
		logform.format.prettyPrint(),
	)

	const logger = winston.createLogger({
		level: config.level || DEBUG_LOG_LEVEL,
		exitOnError: false,
		transports: [
			new winston.transports.Console({
				format: winstonConsoleFormat,
			})
		],
	})

	return logger
}
