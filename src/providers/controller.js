const controller = require('app-controller')

module.exports = () => {
	return controller.configure(req => Object.assign(
		{},
		req.query,
		req.body,
		req.params,
		{ current_user_id: req.session.user_id }
	))
}
