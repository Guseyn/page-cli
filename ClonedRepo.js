'use strict'

const { AsyncObject } = require('@cuties/cutie')
const clonedRepo = require('./custom-calls/clonedRepo')

// Represented result is name
class ClonedRepo extends AsyncObject {
  constructor (url, name) {
    super(url, name)
  }

  asyncCall () {
    return clonedRepo
  }
}

module.exports = ClonedRepo
