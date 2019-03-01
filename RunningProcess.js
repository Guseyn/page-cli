'use strict'

const { AsyncObject } = require('@cuties/cutie')
const runningProcess = require('./custom-calls/runningProcess')

// Represented result is process
class RunningProcess extends AsyncObject {
  constructor (process, env, otherEnvVars) {
    super(process, env || 'local', otherEnvVars || [])
  }

  asyncCall () {
    return runningProcess
  }
}

module.exports = RunningProcess
