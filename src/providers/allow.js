const errorTypes = require('../error-types')

module.exports = knex => {
	return (...arrayOrSpreadPermissions) => {

		const permissions = Array.isArray(arrayOrSpreadPermissions[0])
			? arrayOrSpreadPermissions[0]
			: arrayOrSpreadPermissions

		return params => {
			if (!params.current_user_id) {
				let error = new Error('Login required to proceed')
				error.type = errorTypes.InvalidUser
				return Promise.reject(error)
			}

			return knex
				.from('user_permissions')
				.where('user_id', params.current_user_id)
				.whereIn('type', permissions)
				.then(res => {
					if (!(res && res.length === permissions.length)) {
						const message = `User ${params.current_user_id} is not allowed to do all of these [${permissions}]`
						throw Object.assign(new Error(message), { type: errorTypes.InvalidPermissions })
					}
				})
		}
	}
}
