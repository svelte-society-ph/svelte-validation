class Validation {
  constructor(name, value) {
    this.name = name
    this.value = value
    this.valid = true
    this.allowed = []
    this.messages = []
  }

  boolean(strict = false) {
    if (strict) {
      if (typeof this.value !== 'boolean') {
        this.messages.push(this.name + ' must be a boolean')
        this.valid = false
      }
    } else {
      if (
        ![1, 0, 'yes', 'no', true, false, 'true', 'false'].includes(this.value)
      ) {
        this.messages.push(this.name + ' must be a boolean')
        this.valid = false
      }
      this.value =
        this.value === 'true' ||
        this.value === true ||
        this.value === 1 ||
        this.value === '1' ||
        this.value === 'yes'
          ? true
          : false
    }

    return this
  }

  allow(allowed = []) {
    if (Array.isArray(allowed)) {
      this.allowed = allowed
    }
    return this
  }

  string() {
    if (typeof this.value !== 'string') {
      this.messages.push(this.name + ' must be a string')
      this.valid = false
    }
    return this
  }

  oneOf(stack = []) {
    if (!stack.includes(this.value)) {
      this.messages.push(this.name + ' must be one of ' + stack.join(','))
      this.valid = false
    }
    return this
  }

  number() {
    if (typeof this.value !== 'number') {
      this.messages.push(this.name + ' must be a number')
      this.valid = false
    }
    return this
  }

  email() {
    if (
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        this.value,
      ) === false
    ) {
      this.valid = false
      this.messages.push(this.name + ' must be a valid email')
    }
    return this
  }

  max(n) {
    if (typeof this.value === 'string' && String(this.value).length > n) {
      this.messages.push(
        this.name + ' value length must not be greater than ' + n,
      )
      this.valid = false
    }

    if (typeof this.value === 'number' && this.value > n) {
      this.messages.push(this.name + ' must not be greater than ' + n)
      this.valid = false
    }
    return this
  }

  min(n) {
    if (typeof this.value === 'string' && String(this.value).length < n) {
      this.messages.push(
        this.name + ' value length must not be lesser than ' + n,
      )
      this.valid = false
      return this
    }

    if (typeof this.value === 'number' && this.value < n) {
      this.messages.push(this.name + ' must not be lesser than ' + n)
      this.valid = false
    }
    return this
  }

  regex(exp = new RegExp()) {
    if (!exp.test(this.value)) {
      this.messages.push(this.name + ' does not match the express')
      this.valid = false
    }
    return this
  }

  lowercase() {
    if (typeof this.value === 'string') {
      this.value = this.value.toLowerCase()
    }
    return this
  }

  uppercase() {
    if (typeof this.value === 'string') {
      this.value = this.value.toUpperCase()
    }
    return this
  }

  trim() {
    if (typeof this.value === 'string') {
      this.value = this.value.trim()
    }
    return this
  }

  required() {
    if (this.allowed.includes(this.value)) {
      this.valid = true
      return this
    }

    if (this.value === null || this.value === '' || this.value === undefined) {
      this.messages.push(this.name + ' value is required')
      this.valid = false
    }
    return this
  }
}

class Runner {
  constructor() {
    this.messages = {}
    this.values = {}
    this.isValid = true
  }
  run(validations) {
    validations.forEach((field) => {
      this.values[field.name] = field.value
      if (!field.valid) {
        this.isValid = false
        this.messages[field.name] = field.messages
      }
    })
    return this
  }
}

module.exports = {
  make: (name, value) => new Validation(name, value),
  validate: (validations = []) => new Runner().run(validations),
}
