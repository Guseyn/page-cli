# page-cli

[![NPM Version](https://img.shields.io/npm/v/@page-libs/cli.svg)](https://npmjs.org/package/@page-libs/cli)
[![Build Status](https://travis-ci.org/Guseyn/page-cli.svg?branch=master)](https://travis-ci.org/Guseyn/page-cli)

Command line interface for [Page](https://github.com/Guseyn/page) framework.

## install

`npm install @page-libs/cli -g`

## build

`npm run build`

## commands

* `page create`: creates a new project
* `page update`: upgrades the project to a new version of Page framework
* `page build [evironment][,...otherEnvVars] | page b [evironment][,...otherEnvVars]`: builds the project
* `page run [evironment][,...otherEnvVars] | page r [evironment][,...otherEnvVars]`: runs the project
* `page br [evironment][,...otherEnvVars]`: builds and then runs the project
* `page test`: run tests (via npm)
* `page -v | page --version`: check a version of the Page framework
* `page -h | page --help`: information about commands

By default `environment` is `local`. For more information visit Page [docs](https://github.com/Guseyn/page).
