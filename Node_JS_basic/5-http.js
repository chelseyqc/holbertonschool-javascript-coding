const http = require('http');
const fs = require('fs').promises;

// countStudents function
async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n').slice(1).filter((line) => line.trim());
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
    let result = `Number of students: ${totalStudents}\n`;
    Object.entries(studentsByField).forEach(([field, students]) => {
      result += `Number of students in ${field}: ${students.count}. List: ${students.names.join(', ')}\n`;
    });
    return result;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

// create http server
const app = http.createServer(async (req, res) => {
  // route handler for / and /students
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    try {
      const studentsInfo = await countStudents(process.argv[2]);
      res.write(`This is the list of our students\n${studentsInfo}`);
      res.end();
    } catch (error) {
      res.writeHead(500);
      res.end('This is the list of our students\nCannot load the database');
    }
  }
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;
