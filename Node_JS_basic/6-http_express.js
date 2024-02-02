const express = require('express');

// create express app
const app = express();

// route handler for endpoint '/'
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// server listening on port 1245
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

// export the app
module.exports = app;
