'use strict'

const { AsyncObject } = require('@cuties/cutie');

class AreVersionsEqual extends AsyncObject {

  constructor(v1, v2) {
    super(v1, v2);
  }

  definedSyncCall() {
    return (v1, v2) => {
      return v1 === v2;
    }
  }

}

module.exports = AreVersionsEqual;
