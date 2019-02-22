'use strict'

const { AsyncObject } = require('@cuties/cutie')

class ReadmeContent extends AsyncObject {
  constructor (name, description) {
    super(name, description)
  }

  syncCall () {
    return (name, description) => {
      return `#${name}\r\n${description}\r\n`
    }
  }
}

module.exports = ReadmeContent
