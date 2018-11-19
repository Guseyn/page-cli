'use strict'

const { AsyncObject } = require('@cuties/cutie');

class PatchFiles extends AsyncObject {

  constructor(str) {
    super(str);
  }

  definedSyncCall() {
    return (str) => {
      return str.split('\n').filter(file => file.trim().length !== 0);
    }
  }

}

module.exports = PatchFiles;
