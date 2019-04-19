'use strict'

const spawn = require('child_process').spawn

module.exports = (process, env, otherEnvVars, callback) => {
  console.log(process, env, otherEnvVars, callback)
  const npm = spawn('npm', ['run', `run-${env}`].concat(otherEnvVars), {
    stdio: [process.stdin, process.stdout, process.stderr]
  })
  npm.on('close', (code) => {
    if (code === 0) {
      callback(null, process)
    } else {
      callback(new Error(`run failed with code ${code}`))
    }
  })
}
