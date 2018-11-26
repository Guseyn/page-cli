'use strict'

const { AsyncObject } = require('@cuties/cutie');

class WarningLatestVersionMessage extends AsyncObject {

  constructor(version) {
    super(version);
  }

  definedSyncCall() {
    return (version) => {
      let message = `You use latest version of Page (${version})`
      console.log(message);
      return message;
    }
  }

}

module.exports = WarningLatestVersionMessage;
