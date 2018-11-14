'use strict'

// TODO: make copy of git repo with changed Readme.md, package.json
const { AsyncObject } = require('@cuties/cutie');

class CreatedPageSkeleton extends AsyncObject {

  constructor(answers) {
    super(answers);
  }

  definedSyncCall() {
    return (answers) => {
      console.log(answers);
      return answers;
    }
  }

}

module.exports = CreatedPageSkeleton;
