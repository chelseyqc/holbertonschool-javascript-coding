const express = require('express');
const fs = require('fs').promises;

const app = express();

app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const databasePath = process.argv[2];
  try {
    const data = await fs.readFile(databasePath, 'utf8');
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

    let responseText = `This is the list of our students\nNumber of students: ${totalStudents}\n`;
    Object.entries(studentsByField).forEach(([field, students]) => {
      responseText += `Number of students in ${field}: ${students.count}. List: ${students.names.join(', ')}\n`;
    });

    res.type('text/plain');
    res.send(responseText);
  } catch (error) {
    res.type('text/plain');
    res.status(500).send('This is the list of our students\nCannot load the database');
  }
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;
