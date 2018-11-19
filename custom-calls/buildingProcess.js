'use strict'

const spawn = require('child_process').spawn;

module.exports = (process, env, callback) => {
  const npm = spawn('npm', ['run', `build-${env}`], {
    stdio: [process.stdin, process.stdout, process.stderr]
  });
  npm.on('close', (code) => {
    if (code === 0) {
      callback(null, process);
    } else {
      callback(new Error(`build failed with code ${code}`));
    }
  });
}
