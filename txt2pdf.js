const fs = require('fs');
const path = require('path');
const convertapi = require('convertapi')('eY0aQHM8nAXOVyDS');

const dirPath = path.join(__dirname, '../wav');

async function convertPdf(file) {
  await convertapi
    .convert('pdf', { File: file })
    .then((result) => {
      console.log(index, result.file.url);
      result.file.save(`${currentDir}/${result.file.fileName}`);
    })
    .catch((err) => {
      console.error(err.toString());
    });
}

fs.readdir(dirPath, (err, dirs) => {
  dirs.forEach((dir) => {
    const currentDir = path.join(dirPath, dir);

    if (fs.statSync(currentDir).isDirectory()) {
      fs.readdir(currentDir, (err, files) => {
        files.forEach((file, index) => {
          const currentFile = path.join(currentDir, file);

          if (fs.statSync(currentFile).isFile()) {
            if (path.extname(currentFile) === '.txt') {
              convertPdf(currentFile);
            }
          }
        });
      });
    }
  });
});
