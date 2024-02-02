const fs = require('fs');

module.exports = function countStudents(path) {
  try {
    // Read the database file synchronously
    const data = fs.readFileSync(path, 'utf8');
    // Split the data by lines and remove header
    const lines = data.split('\n').slice(1).filter(line => line.trim() !== '');

    let totalStudents = 0;
    const studentsByField = {};

    // Iterate over the lines and count students by field
    lines.forEach(line => {
      const [firstname, , , field] = line.split(',');
      if (!studentsByField[field]) {
        studentsByField[field] = { count: 0, names: []};
      }
      studentsByField[field].count = studentsByField[field].count + 1;
      studentsByField[field].names.push(firstname);
      totalStudents = totalStudents + 1;
    });

    // Log the number of students
    console.log(`Number of students: ${totalStudents}`);

    // Log the number of students by field
    for (const field in studentsByField) {
      if (studentsByField[field]) {
        console.log(`Number of students in ${field}: ${studentsByField[field].count}.\
      List: ${studentsByField[field].names.join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
