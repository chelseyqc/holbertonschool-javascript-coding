#!/usr/bin/node
const request = require('request');
const url = process.argv[2];

request.get(url, (err, response, body) => {
  if (err) {
    console.err(err);
    return;
  }
  if (response) {
    console.log(`code: ${response.statusCode}`);
  }
});
