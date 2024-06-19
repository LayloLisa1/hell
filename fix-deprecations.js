const fs = require('fs');
const path = require('path');

const filesToPatch = [
  path.join(__dirname, '../node_modules/whatwg-url/lib/url-state-machine.js'),
  // Add other file paths here that need patching if identified
];

filesToPatch.forEach((filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }
    const result = data.replace("require('punycode')", "require('punycode/')");

    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
      } else {
        console.log(`Deprecation fix applied to ${filePath}`);
      }
    });
  });
});
