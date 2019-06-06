const winston = require('winston');

const DEBUG_LOG_LEVEL = 7

module.exports = config => {
	const logger = new winston.createLogger({
		level: config.level || DEBUG_LOG_LEVEL,
		exitOnError: false,
		format: winston.format.combine(
			winston.format.label({ label: config.label }),
			winston.format.timestamp(),
			winston.format.prettyPrint(),
		),
	})

	if (config.hasConsoleTransport) {
		logger.add(new winston.transports.Console({
			json: true,
			handleExceptions: true,
		}))
	}

	return logger
}
