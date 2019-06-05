const session = require('express-session')
const KnexSesssionStore = require('connect-session-knex')(session)

const DEFAULT_COOKIE_NAME = 'connect.sid'

module.exports = (config, knex) => {
	return session({
		secret: config.secret,
		name: config.name || DEFAULT_COOKIE_NAME,
		resave: false,
		saveUninitialized: true,
		cookie: config.cookies,
		store: new KnexSesssionStore({
			tablename: 'sessions',
			createtable: true,
			clearInterval: config.clearInterval || 1000 * 60 * 60 * 1, // 1 h
			knex,
		}),
	})
}
