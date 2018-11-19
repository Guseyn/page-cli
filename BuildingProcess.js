'use strict'

const { AsyncObject } = require('@cuties/cutie');
const buildingProcess = require('./custom-calls/buildingProcess');

// Represented result is process
class BuildingProcess extends AsyncObject {

  constructor(process, env) {
    super(process, env);
  }

  definedAsyncCall() {
    return buildingProcess;
  }

}

module.exports = BuildingProcess;
