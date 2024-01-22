#!/usr/bin/node
const request = require('request');
const url = 'https://swapi-api.hbtn.io/api/films/';
const wedgeID = 18;

request.get(url, (err, response, body) => {
  if (err) {
    console.error(err);
    return;
  }
  let count = 0;
  const result = JSON.parse(body).results;
  for (const film of result) {
    for (const charUrl of film.characters) {
      const charID = charUrl.split('/'). filter(Boolean).pop();
      if (charID === '18')  {
        count = count + 1;
      }
    }
  }
  console.log(count);
});
