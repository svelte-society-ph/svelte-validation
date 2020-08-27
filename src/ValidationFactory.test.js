const assert = require('assert')

const Validation = require('./ValidationFactory')

const firstName = Validation.make('firstName', 'John Dave').string()
const lastName = Validation.make('lastName', '').string().required()
const age = Validation.make('age', '').number().required()
const trimthis = Validation.make('trimthis', ' ').string().trim()

assert.strictEqual(firstName.valid, true)
assert.strictEqual(lastName.valid, false)
assert.strictEqual(age.valid, false)
assert.strictEqual(trimthis.value, '')
