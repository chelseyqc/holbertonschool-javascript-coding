const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(req, res) {
    try {
      const database = await readDatabase();
      const studentsByField = {};

      // Count the number of students in each field
      for (const student of database) {
        const field = student.field.toLowerCase();
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(student.firstName);
      }

      // Sort the fields alphabetically
      const sortedFields = Object.keys(studentsByField).sort();

      // Prepare the response
      let responseBody = 'This is the list of our students\n';
      for (const field of sortedFields) {
        const students = studentsByField[field];
        const numberOfStudents = students.length;
        const studentList = students.join(', ');
        responseBody += `Number of students in ${field.toUpperCase()}: ${numberOfStudents}. List: ${studentList}\n`;
      }

      res.status(200).send(responseBody);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static getAllStudentsByMajor(req, res) {
    try {
      const database = await readDatabase();
      const major = req.query.major.toUpperCase();

      if (major !== 'CS' && major !== 'SWE') {
        res.status(500).send('Major parameter must be CS or SWE');
        return;
      }

      let studentsByMajor = database.filter((student) => student.field.toUpperCase() === major)
        .map((student) => student.firstName);

      // Filter students by major
      for (const student of database) {
        if (student.major === major) {
          studentsByMajor.push(student.firstName);
        }
      }

      // Prepare the response
      const studentList = studentsByMajor.join(', ');
      const responseBody = `List: ${studentList}`;

      res.status(200).send(responseBody);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
