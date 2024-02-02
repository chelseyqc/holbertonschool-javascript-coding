const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
// use the routes in indexRouter for any request to '/'
app.use('/', indexRouter);

// list on port 1245
const port = 1245;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
