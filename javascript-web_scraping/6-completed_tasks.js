#!/usr/bin/node
const request = require('request');
const url = 'https://jsonplaceholder.typicode.com/todos';

request.get(url, (err, response, body) => {
  if (err) {
    console.error(err);
    return;
  }
  const todos = JSON.parse(body);
  let count = {};
  for (const todo of todos) {
    if (todo.completed) {
      if (count[todo.userId]) {
        count[todo.userId] = count[todo.userId] + 1;
      }
      else {
        count[todo.userId] = 1;
      }
    }
  }
  console.log(count);
});
