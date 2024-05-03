const fs = require('fs');
const path = require('path');

class Helpers {
  // eslint-disable-next-line default-param-last
  getFiles(dir, files = [], extension) {
    const fileList = fs.readdirSync(dir);
    // eslint-disable-next-line no-restricted-syntax
    for (const file of fileList) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        if (file.endsWith(extension)) {
          files.push(filePath);
        }
      } else {
        this.getFiles(filePath, files, extension);
      }
    }
    return files;
  }
}
module.exports = new Helpers();
