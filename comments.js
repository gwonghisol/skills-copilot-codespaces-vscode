// Create web server
// To run: node comments.js
// To test: curl -X POST -d 'comment=Hello' -H 'Content-Type: application/x-www-form-urlencoded' http://localhost:3000/comments
//          curl http://localhost:3000/comments

const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

let comments = [];

http.createServer((req, res) => {
  let path = url.parse(req.url).pathname;
  if (req.method === 'POST' && path === '/comments') {
    let body = '';
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      let params = qs.parse(body);
      comments.push(params.comment);
      res.end();
    });
  } else if (req.method === 'GET' && path === '/comments') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(comments.join('\n'));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(3000);

console.log('Server running at http://localhost:3000/');