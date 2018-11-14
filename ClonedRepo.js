'use strict'

const { AsyncObject } = require('@cuties/cutie');
const clonedRepo = require('./custom-calls/clonedRepo');

// Represented result is exit code(number)
class ClonedRepo extends AsyncObject {

  constructor(url) {
    super(url);
  }

  definedAsyncCall() {
    return clonedRepo;
  }

}

module.exports = ClonedRepo;
