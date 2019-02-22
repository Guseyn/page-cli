'use strict'

const { AsyncObject } = require('@cuties/cutie')

class ChangedPackageJsonFile extends AsyncObject {
  constructor (packageJson, projectDetails, propertiesToDelete) {
    super(packageJson, projectDetails, propertiesToDelete || [])
  }

  syncCall () {
    return (packageJson, projectDetails, propertiesToDelete) => {
      propertiesToDelete.forEach(key => {
        delete packageJson[key]
      })
      return Object.assign(packageJson, projectDetails)
    }
  }
}

module.exports = ChangedPackageJsonFile
