'use strict'

const spawn = require('child_process').spawn

module.exports = (process, callback) => {
  console.log(`Tests:`)
  const npm = spawn('npm', ['test'], {
    stdio: [process.stdin, process.stdout, process.stderr]
  })
  npm.on('close', (code) => {
    if (code === 0) {
      callback(null, process)
    } else {
      callback(new Error(`tests failed with code ${code}`))
    }
  })
}
