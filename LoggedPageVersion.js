'use strict'

const { AsyncObject } = require('@cuties/cutie')

class LoggedPageVersion extends AsyncObject {
  constructor (version) {
    super(version)
  }

  syncCall () {
    return (version) => {
      console.log(`v${version}`)
      return version
    }
  }
}

module.exports = LoggedPageVersion
