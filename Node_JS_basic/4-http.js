// import module
const http = require('http');
// create server
const app = http.createServer((req, res) => {
  // handle server requests
  // plain text header
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // send response body
  res.end('Hello Holberton School!');
});

// make server listen on port 1245
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

// export server variable
module.exports = app;
