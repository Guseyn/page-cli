#!/usr/bin/env node

'use strict'

const { as } = require('@cuties/cutie');
const { CreatedInterface, AnswersOfQuestionedInterface, ClosedInterface } = require('@cuties/readline');
const { ExitedProcess } = require('@cuties/process');
const { Value, ParsedJSON, PrettyStringifiedJSON } = require('@cuties/json');
const { DeletedDirectoryRecursively, ReadDataByPath, WrittenFile } = require('@cuties/fs');
const { JoinedPaths } = require('@cuties/path');
const ProjectDetails = require('./ProjectDetails');
const ClonedRepo = require('./ClonedRepo');
const ChangedPackageJsonFile = require('./ChangedPackageJsonFile');
const ReadmeContent = require('./ReadmeContent');
const BuildingProcess = require('./BuildingProcess');
const RunningProcess = require('./RunningProcess');

let command = process.argv[2];
if (command === 'create') {
  new CreatedInterface({
    input: process.stdin,
    output: process.stdout
  }).as('interface').after(
    new ProjectDetails(
      [{name: 'name'}, {name: 'version', defaultValue: '1.0.0'},
       {name: 'author'}, {name: 'description'}, 
       {name: 'license', defaultValue: 'MIT'}],
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
          new Value(as('projectDetails'), 'name')
        ).after(
          new DeletedDirectoryRecursively(
            new JoinedPaths(
              new Value(as('projectDetails'), 'name'),
              '.git'
            )
          ).after(
            new JoinedPaths(
              new Value(as('projectDetails'), 'name'),
              'package.json'
            ).as('packageJsonPath').after(
              new WrittenFile(
                as('packageJsonPath'),
                new PrettyStringifiedJSON(
                  new ChangedPackageJsonFile(
                    new ParsedJSON(
                      new ReadDataByPath(
                        as('packageJsonPath'), {encoding: 'utf8'}
                      )
                    ), 
                    as('projectDetails'), 
                    ['repository', 'bugs', 'homepage']
                  )
                )
              ).after(
                new WrittenFile(
                  new JoinedPaths(
                    new Value(as('projectDetails'), 'name'),
                    'README.md'
                  ),
                  new ReadmeContent(
                    new Value(as('projectDetails'), 'name'),
                    new Value(as('projectDetails'), 'description')
                  )
                ).after(
                  new ExitedProcess(process, 0)
                )
              )
            )
          )
        )
      )
    )
  ).call();
} else if (command === 'update') {
  
} else if (command === 'build' || command === 'b') {
  let env = process.argv[3] || 'local';
  new BuildingProcess(env).call();
} else if (command === 'run' command === 'r') {
  let env = process.argv[3] || 'local';
  new RunningProcess(env).call();
} else {
  throw new Error(`no such command like ${command}`);
}
