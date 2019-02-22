'use strict'

const { AsyncObject } = require('@cuties/cutie')
const buildingProcess = require('./custom-calls/buildingProcess')

// Represented result is process
class BuildingProcess extends AsyncObject {
  constructor (process, env, otherEnvVars) {
    super(process, env || 'local', otherEnvVars || [])
  }

  asyncCall () {
    return buildingProcess
  }
}

module.exports = BuildingProcess
