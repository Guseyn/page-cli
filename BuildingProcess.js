'use strict'

const { AsyncObject } = require('@cuties/cutie');
const buildingProcess = require('./custom-calls/buildingProcess');

// Represented result is true
class BuildingProcess extends AsyncObject {

  constructor(env) {
    super(env);
  }

  definedAsyncCall() {
    return buildingProcess;
  }

}

module.exports = BuildingProcess;
