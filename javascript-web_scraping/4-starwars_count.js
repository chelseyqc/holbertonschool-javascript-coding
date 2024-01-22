#!/usr/bin/node
const request = require('request');
const url = 'https://swapi-api.hbtn.io/api/films/';
const wedgeID = 'https://swapi-api.hbtn.io/api/people/18/';

request.get(url, (err, response, body) => {
  if (err) {
    console.error(err);
    return;
  }
  let count = 0;
  const result = JSON.parse(body).results;
  for (const film of result) {
    if (film.characters.includes(wedgeID)) {
      count = count + 1;
    }
  }
  console.log(count);
});
