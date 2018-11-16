'use strict'

const { AsyncObject } = require('@cuties/cutie');
const ExecutedGruntBuild = require('./ExecutedGruntBuild');

class OnPageStaticJsFilesChangeEvent extends AsyncObject {

  constructor(pageStaticJsFilesDirectory, pageBundleJsFile) {
    super(pageStaticJsFilesDirectory, pageBundleJsFile);
  }

  definedSyncCall() {
    return (pageStaticJsFilesDirectory, pageBundleJsFile) => {
      return (eventType, fileName) => {
        if (eventType === 'change') {
          new ExecutedGruntBuild().call();
        }
      }
    }
  }

}

module.exports = OnPageStaticJsFilesChangeEvent;
