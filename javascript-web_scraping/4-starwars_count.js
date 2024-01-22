#!/usr/bin/node
const request = require('request');
const url = process.argv[2];

request.get(url, (err, response, body) => {
  if (err) {
    console.error(err);
    return;
  }
  let count = 0;
  const result = JSON.parse(body).results;
  for (const film of result) {
    for (const charUrl of film.characters) {
      const charID = charUrl.split('/').filter(Boolean).pop();
      if (charID === '18') {
        count = count + 1;
      }
    }
  }
  console.log(count);
});
