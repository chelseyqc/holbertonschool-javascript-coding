const { readFile } = require('fs').promises;

async function readDatabase(path) {
  try {
    const data = await readFile(path, 'utf-8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    const studentData = lines.slice(1).map((line) => line.split(','));

    const cs = [];
    const swe = [];
    for (let i = 0; i < studentData.length; i += 1) {
      if (studentData[i][3] === 'CS') {
        cs.push(studentData[i][0]);
      } else if (studentData[i][3] === 'SWE') {
        swe.push(studentData[i][0]);
      }
    }
    return {
      CS: cs,
      SWE: swe,
    };
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = readDatabase;