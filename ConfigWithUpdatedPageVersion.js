'use strict'

const { AsyncObject } = require('@cuties/cutie');

class ConfigWithUpdatedPageVersion extends AsyncObject {

  constructor(config, version) {
    super(config, version);
  }

  definedSyncCall() {
    return (config, version) => {
      config.page.version = version;
      return config;
    }
  }

}

module.exports = ConfigWithUpdatedPageVersion;
