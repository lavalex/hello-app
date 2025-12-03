const http = require("http");
const port = 8080;
http.createServer((req, res) => {
  res.end("<h2>Hello from OpenShift! This is version 1!</h2>\n");
}).listen(port, () => console.log(`Listening on ${port}`));

