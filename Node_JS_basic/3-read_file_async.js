const fs = require('fs');

module.exports = function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = data.split('\n').slice(1).filter((line) => line.trim() !== '');

      let totalStudents = 0;
      const studentsByField = {};

      lines.forEach((line) => {
        const [firstname, , , field] = line.split(',');
        if (!studentsByField[field]) {
          studentsByField[field] = { count: 0, names: [] };
        }
        studentsByField[field].count += 1;
        studentsByField[field].names.push(firstname);
        totalStudents += 1;
      });
      console.log(`Number of students: ${totalStudents}`);
      Object.entries(studentsByField).forEach(([field, students]) => {
        console.log(`Number of students in ${field}: ${students.count}. List: ${students.names.join(', ')}`);
      });
      resolve();
    });
  });
};
