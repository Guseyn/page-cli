'use strict'

const { AsyncObject } = require('@cuties/cutie')

class UpdatedSuccessfullyMessage extends AsyncObject {
  constructor (version) {
    super(version)
  }

  syncCall () {
    return (version) => {
      let message = `Page updated successfully to version ${version}`
      console.log(message)
      return message
    }
  }
}

module.exports = UpdatedSuccessfullyMessage
