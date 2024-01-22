#!/usr/bin/node
const request = require('request');
const url = process.argv[2];

request.get(url, (err, response, body) => {
  if (err) {
    console.error(err);
    return;
  }
  const todos = JSON.parse(body);
  const count = {};
  for (const todo of todos) {
    if (todo.completed) {
      if (count[todo.userId]) {
        count[todo.userId] = count[todo.userId] + 1;
      } else {
        count[todo.userId] = 1;
      }
    }
  }

  const sortedCount = Object.entries(count).sort((a, b) => a[0] - b[0]);
  const formattedOutput = {};
  for (const [userId, taskCount] of sortedCount) {
    formattedOutput[userId] = taskCount;
  }
  console.log(formattedOutput);
});
