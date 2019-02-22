'use strict'

const spawn = require('child_process').spawn

module.exports = (url, name, callback) => {
  const git = spawn('git', ['clone', url, name], {
    stdio: [process.stdin, process.stdout, process.stderr]
  })
  git.on('close', (code) => {
    if (code === 0) {
      callback(null, name)
    } else {
      callback(new Error(`error with code: ${code}`))
    }
  })
}
