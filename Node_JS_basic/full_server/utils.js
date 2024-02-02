const fs = require('fs');

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(Error('Cannot load the database'));
      } else {
        try {
          const lines = data.split('\n');
          const students = lines.slice(1); // remove headers
          const result = {};

          students.forEach((line) => {
            const [firstname, , , field] = line.split(',');
            if (!field || !firstname) return;

            if (!result[field]) {
              result[field] = [];
            }
            result[field].push(firstname);
          });
          resolve(result);
        } catch (error) {
          reject(Error('Failed to parse database file'));
        }
      }
    });
  });
}

module.exports = readDatabase;
