#!/usr/bin/env node

'use strict'

const { as } = require('@cuties/cutie');
const { CreatedInterface, AnswersOfQuestionedInterface, ClosedInterface } = require('@cuties/readline');
const { ExitedProcess } = require('@cuties/process');
const ClonedRepo = require('./ClonedRepo');

if (process.argv[2] === 'create') {
  new ClonedRepo('https://github.com/Guseyn/page.git').after(
    new CreatedInterface({
      input: process.stdin,
      output: process.stdout
    }).as('interface').after(
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
      ).after(
        new ClosedInterface(as('interface')).after(
          new ExitedProcess(process, 0)
        )
      )
    )
  ).call();
}
