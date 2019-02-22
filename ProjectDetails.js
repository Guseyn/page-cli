'use strict'

const { AsyncObject } = require('@cuties/cutie')

class ProjectDetails extends AsyncObject {
  constructor (keys, answers) {
    super(keys, answers)
  }

  syncCall () {
    return (keys, answers) => {
      let details = {}
      if (keys.length !== answers.length) {
        throw new Error('keys and answers have different lengths')
      }
      keys.forEach((key, index) => {
        details[key.name] = answers[index] || (key.defaultValue || '')
      })
      return details
    }
  }
}

module.exports = ProjectDetails
