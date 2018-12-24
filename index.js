#!/usr/bin/env node

'use strict'

const { as, AsyncObject } = require('@cuties/cutie');
const { If, Else } = require('@cuties/if-else');
const { CreatedInterface, AnswersOfQuestionedInterface, ClosedInterface } = require('@cuties/readline');
const { ExitedProcess } = require('@cuties/process');
const { Value, ParsedJSON, PrettyStringifiedJSON } = require('@cuties/json');
const { DeletedDirectoryRecursively, CopiedDirectoryRecursively, ReadDataByPath, WrittenFile } = require('@cuties/fs');
const { JoinedPaths } = require('@cuties/path');
const { ResponseFromHttpsGetRequest, ResponseBody } = require('@cuties/https');
const { StringFromBuffer } = require('@cuties/buffer');
const ProjectDetails = require('./ProjectDetails');
const ClonedRepo = require('./ClonedRepo');
const ChangedPackageJsonFile = require('./ChangedPackageJsonFile');
const PackageJsonFileWithUpdatedDeps = require('./PackageJsonFileWithUpdatedDeps');
const ReadmeContent = require('./ReadmeContent');
const BuildingProcess = require('./BuildingProcess');
const RunningProcess = require('./RunningProcess');
const ExecutedTests = require('./ExecutedTests');
const LoggedPageVersion = require('./LoggedPageVersion');
const ConfigWithUpdatedPageVersion = require('./ConfigWithUpdatedPageVersion');
const AreVersionsEqual = require('./AreVersionsEqual');
const UpdatedSuccessfullyMessage = require('./UpdatedSuccessfullyMessage');
const WarningWithLatestVersionMessage = require('./WarningWithLatestVersionMessage')

let command = process.argv[2];
switch (command) {
  case 'create': {
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
    break;
  }
  case 'update': {
    new If(
      new AreVersionsEqual(
        new Value(
          new ParsedJSON(
            new StringFromBuffer(
              new ResponseBody(
                new ResponseFromHttpsGetRequest({
                  hostname: 'raw.githubusercontent.com',
                  path: '/Guseyn/page/master/config.json'
                })
              )
            )
          ).as('githubConfig'),
          'page.version'
        ),
        new Value(
          new ParsedJSON(
            new ReadDataByPath(
              'config.json', { encoding: 'utf8' }
            )
          ).as('localConfig'),
          'page.version'
        )
      ), 
      new WarningWithLatestVersionMessage(
        new Value(as('localConfig'), 'page.version')
      ),
      new Else(
        new WrittenFile(
          'config.json',
          new PrettyStringifiedJSON(
            new ConfigWithUpdatedPageVersion(
              as('localConfig'),
              new Value(
                as('githubConfig'), 'page.version'
              )
            ).as('updatedLocalConfig')
          )
        ).after(
          new WrittenFile(
            'package.json',
            new PrettyStringifiedJSON(
              new PackageJsonFileWithUpdatedDeps(
                new ParsedJSON(
                  new ReadDataByPath(
                    'package.json', {encoding: 'utf8'}
                  )
                ),
                new Value(
                  new ParsedJSON(
                    new StringFromBuffer(
                      new ResponseBody(
                        new ResponseFromHttpsGetRequest({
                          hostname: 'raw.githubusercontent.com',
                          path: '/Guseyn/page/master/package.json'
                        })
                      )
                    )
                  ), 'dependencies'
                )
              )
            )
          )
        )
      )
    ).call();
    break;
  }
  case 'build':
  case 'b': {
    let env = process.argv[3] || 'local';
    new BuildingProcess(process, env).call();
    break;
  }
  case 'run':
  case 'r': {
    let env = process.argv[3] || 'local';
    new RunningProcess(process, env).call();
    break;
  }
  case 'br': {
    let env = process.argv[3] || 'local';
    new RunningProcess(
      new BuildingProcess(process, env), env
    ).call();
    break;
  }
  case 'test': {
    new ExecutedTests(process).call();
  }
  case '-v':
  case '--version': {
    new LoggedPageVersion(
      new Value(
        new ParsedJSON(
          new ReadDataByPath(
            'config.json', { encoding: 'utf8' }
          )
        ), 'page.version'
      )
    ).call();
    break;
  }
  case '-h':
  case '--help': {
    console.log(
`commands:
  page create: creates a new project
  page update: upgrades the project to a new version of Page framework
  page build [evironment] | page b [evironment]: builds the project
  page run [evironment] | page r [evironment]: runs the project
  page br [evironment]: builds and then runs the project
  page test: run tests (via npm)
  page -v | page --version: check a version of the Page framework
  page -h | page --help: information about commands
`
    );
    break;
  }
  default:
    throw new Error(`
      no such command like ${command}, use page --help | page -h for more info
    `);
}
