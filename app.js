const http = require("http");
const port = 8080;
http.createServer((req, res) => {
  res.end("Hello from OpenShift! Fuck Yaron :)\n");
}).listen(port, () => console.log(`Listening on ${port}`));

