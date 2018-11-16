'use strict'

const { AsyncObject } = require('@cuties/cutie');
const runningProcess = require('./custom-calls/runningProcess');

// Represented result is true
class RunningProcess extends AsyncObject {

  constructor(env) {
    super(env);
  }

  definedAsyncCall() {
    return runningProcess;
  }

}

module.exports = RunningProcess;
