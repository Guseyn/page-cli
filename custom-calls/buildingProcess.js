'use strict'

const spawn = require('child_process').spawn;

module.exports = (env, callback) => {
  const npm = spawn('npm', ['run', `build-${env}`], {
    stdio: [process.stdin, process.stdout, process.stderr]
  });
  npm.on('close', (code) => {
    callback(null, true);
  });
}
