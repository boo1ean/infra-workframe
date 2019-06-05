module.exports = e => {
	let out = 'Invalid field value'
	let n
	let cond

	switch (e.keyword) {
		case '$ref':
			out = 'can\\\'t resolve reference ' + e.params.ref
			break
		case 'additionalProperties':
			out = 'should not have additional properties'
			break
		case 'anyOf':
			out = 'should match some schema in "anyOf"'
			break
		case 'constant':
			out = 'should be equal to constant'
			break
		case 'custom':
			out = 'should pass "' + e.keyword + '" keyword validation'
			break
		case 'dependencies':
			out = ''
			n = e.params.depsCount
			out += 'should have propert'
			if (n == 1) {
				out += 'y'
			} else {
				out += 'ies'
			}
			out += ' ' + e.params.deps + ' when property ' + e.params.property + ' is present'
			break
		case 'enum':
			out = 'should be equal to one of predefined values'
			break
		case 'format':
			out = 'should match format "' + e.params.format + '"'
			if (e.params.format === 'email') {
				out = 'Invalid email address'
			}
			break
		case 'formatMaximum':
			out = ''
			cond = e.params.comparison + ' ' + e.params.limit
			out += 'should be ' + cond
			break
		case 'formatMinimum':
			out = ''
			cond = e.params.comparison + ' ' + e.params.limit
			out += 'should be ' + cond
			break
		case 'maximum':
			out = ''
			cond = e.params.comparison + ' ' + e.params.limit
			out += 'should be ' + cond
			break
		case 'maxItems':
			out = ''
			n = e.params.limit
			out += 'should not have more than ' + n + ' item'
			if (n != 1) {
				out += 's'
			}
			break
		case 'maxLength':
			out = ''
			n = e.params.limit
			out += 'should not be longer than ' + n + ' character'
			if (n != 1) {
				out += 's'
			}
			break
		case 'maxProperties':
			out = ''
			n = e.params.limit
			out += 'should not have more than ' + n + ' propert'
			if (n == 1) {
				out += 'y'
			} else {
				out += 'ies'
			}
			break
		case 'minimum':
			out = ''
			cond = e.params.comparison + ' ' + e.params.limit
			out += 'should be ' + cond
			break
		case 'minItems':
			out = ''
			n = e.params.limit
			out += 'should not have less than ' + n + ' item'
			if (n != 1) {
				out += 's'
			}
			break
		case 'minLength':
			out = ''
			n = e.params.limit
			out += 'should not be shorter than ' + n + ' character'
			if (n != 1) {
				out += 's'
			}
			break
		case 'minProperties':
			out = ''
			n = e.params.limit
			out += 'should not have less than ' + n + ' propert'
			if (n == 1) {
				out += 'y'
			} else {
				out += 'ies'
			}
			break
		case 'multipleOf':
			out = 'should be a multiple of ' + e.params.multipleOf
			break
		case 'not':
			out = 'should not be valid according to schema in "not"'
			break
		case 'oneOf':
			out = 'should match exactly one schema in "oneOf"'
			break
		case 'pattern':
			out = 'should match pattern "' + e.params.pattern + '"'
			break
		case 'patternGroups':
			out = ''
			n = e.params.limit
			out += 'should have ' + e.params.reason + ' ' + n + ' propert'
			if (n == 1) {
				out += 'y'
			} else {
				out += 'ies'
			}
			out += ' matching pattern "' + e.params.pattern + '"'
			break
		case 'patternRequired':
			out = 'should have property matching pattern "' + e.params.missingPattern + '"'
			break
		case 'required':
			out = 'Field is required'
			break
		case 'switch':
			out = 'should pass "switch" keyword validation, case ' + e.params.caseIndex + ' fails'
			break
		case 'type':
			out = 'should be ' + e.params.type
			break
		case 'uniqueItems':
			out = 'should not have duplicate items (items ## ' + e.params.j + ' and ' + e.params.i + ' are identical)'
			break

		// custom validators
		case 'uniqueEmail':
			out = 'This email is already used'
			break
		case 'uniqueUsername':
			out = 'This username is already used'
			break
		case 'passwordRepeat':
			out = 'Passwords should match'
			break
		case 'notEmpty':
			out = 'Should not be empty'
			break
		case 'validCurrentUserPassword':
			out = 'Invalid password'
			break
	}

	return out
}
