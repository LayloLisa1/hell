const fs = require('fs');
const path = require('path');

function findFile(startPath, filter, callback) {
  if (!fs.existsSync(startPath)) {
    console.log("No directory found at", startPath);
    return;
  }

  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      findFile(filename, filter, callback);
    } else if (filter.test(filename)) {
      callback(filename);
    }
  }
}

findFile('./node_modules', /url-state-machine.js$/, function (filename) {
  console.log('-- found: ', filename);
});
