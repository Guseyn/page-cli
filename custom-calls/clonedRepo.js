// custom call

'use strict'

const spawn = require('child_process').spawn;

module.exports = (url, callback) => {
  const git = spawn('git', ['clone', url], {
    stdio: [process.stdin, process.stdout, process.stderr]
  });
  git.on('close', (code) => {
    if (code === 0) {
      callback(null, code);
    } else {
      callback(new Error(`error with code: ${code}`));
    }
  });
}
