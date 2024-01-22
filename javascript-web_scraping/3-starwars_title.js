#!/usr/bin/node
const request = require('request');
const movieID = process.argv[2];
const url = `https://swapi-api.hbtn.io/api/films/${movieID}`;

request.get(url, (err, response, body) => {
  if (err) {
    console.error(err);
    return;
  }
  const movie = JSON.parse(body);
  console.log(`${movie.title}`);
});
