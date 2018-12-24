'use strict'

const { AsyncObject } = require('@cuties/cutie');
const executedTests = require('./custom-calls/executedTests');

// Represented result is process
class ExecutedTests extends AsyncObject {

  constructor(process) {
    super(process);
  }

  definedAsyncCall() {
    return executedTests;
  }

}

module.exports = ExecutedTests;
