'use strict'

const { AsyncObject } = require('@cuties/cutie');

class PackageJsonFileWithUpdatedDeps extends AsyncObject {

  constructor(packageJson, newDeps) {
    super(packageJson, newDeps);
  }

  definedSyncCall() {
    return (packageJson, newDeps) => {
      packageJson.dependencies = Object.assign(packageJson.dependencies, newDeps);
      return packageJson;
    }
  }

}

module.exports = PackageJsonFileWithUpdatedDeps;
