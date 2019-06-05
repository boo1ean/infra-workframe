## infra-workframe

Set of frequently used tools in number of nodejs projects.

Main purpose is to reduce basic setup and configuration boilerplates for commonly used **providers**.

**Provider** - an opinionated name for modules which are reused across many apps and are not domain specific.

Examples are:

	- database interactions interface
	- message queue interactions interface
	- logger
	- validation engine

## Installation
```
npm i infra-workframe
```

## Example usage
```javascript
const { knex, log, validation } = require('infra-workframe')(config)
// ...
```

## License
MIT
