#!/usr/bin/env node

'use strict'

const { as } = require('@cuties/cutie');
const { CreatedInterface, AnswersOfQuestionedInterface, ClosedInterface } = require('@cuties/readline');
const { ExitedProcess } = require('@cuties/process');
const { Value } = require('@cuties/json');
const { DeletedDirectoryRecursively } = require('@cuties/fs');
const { JoinedPaths } = require('@cuties/path');
const ProjectDetails = require('./ProjectDetails');
const ClonedRepo = require('./ClonedRepo');
const OverriddenRepo = require('./OverriddenRepo');

if (process.argv[2] === 'create') {
  new CreatedInterface({
    input: process.stdin,
    output: process.stdout
  }).as('interface').after(
    new ProjectDetails(
      ['projectName', 'version', 'author', 'description', 'license'],
      new AnswersOfQuestionedInterface(
        as('interface'), 'License: (MIT) ',
        new AnswersOfQuestionedInterface(
          as('interface'), 'Description: ',
          new AnswersOfQuestionedInterface(
            as('interface'), 'Author: ',
            new AnswersOfQuestionedInterface(
              as('interface'), 'Version: (1.0.0) ',
              new AnswersOfQuestionedInterface(
                as('interface'), 'Project name: '
              )
            )
          )
        )
      )
    ).as('projectDetails').after(
      new ClosedInterface(as('interface')).after(
        new ClonedRepo(
          'https://github.com/Guseyn/page.git',
          new Value(as('projectDetails'), 'projectName')
        ).after(
          new DeletedDirectoryRecursively(
            new JoinedPaths(
              new Value(as('projectDetails'), 'projectName'),
              '.git'
            )
          ).after(
            new ExitedProcess(process, 0)
          )
        )
      )
    )
  ).call();
}
