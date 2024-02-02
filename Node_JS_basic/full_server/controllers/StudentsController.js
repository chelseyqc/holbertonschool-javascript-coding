const readDatabase = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const database = await readDatabase(process.argv[2]);
      res.status(200)
        .send(`This is the list of our students\nNumber of students in CS: ${database.CS.length}.\
 List: ${database.CS.join(', ')}\nNumber of students in SWE: ${database.SWE.length}.\
 List: ${database.SWE.join(', ')}`);
      res.end();
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    try {
      const major = req.params.major.toUpperCase();
      if (!['CS', 'SWE'].includes(major)) {
        return res.status(500).send('Major parameter must be CS or SWE');
      }
      const database = await readDatabase(process.argv[2]);
      if (!database[major]) {
        return res.status(500).send(`Major ${major} does not exist`);
      }
      return res.status(200).send(`List: ${database[major].join(', ')}`);
    } catch (error) {
      return res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
