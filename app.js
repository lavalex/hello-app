const http = require("http");
const port = process.env.PORT || 8080;
const version =  "7";

// Capture deployment/start time
const startTime = new Date();

function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
}

http.createServer((req, res) => {
  log(`${req.method} ${req.url}`);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <html>
        <head>
          <meta charset="UTF-8">
          <title>OpenShift App</title>
          <meta http-equiv="refresh" content="10">
          <style>
            body {
              font-family: Arial;
              text-align: center;
              margin-top: 50px;
            }
          </style>
        </head>
        <body>
          <h1>🚀 Hello from OpenShift!</h1>
          <p>This is <strong>version ${version}</strong> of the demo app 🎉</p>
          <p>⏱ Auto-refreshing every 10 seconds</p>
          <p>Current server time: <strong>${new Date().toLocaleString()}</strong></p>
          <p>📦 App started at: <strong>${startTime.toLocaleString()}</strong></p>
          <hr />
          <p>Try other endpoints:</p>
          <ul style="list-style:none; padding:0;">
            <li><a href="/time">/time</a></li>
            <li><a href="/health">/health</a></li>
            <li><a href="/env">/env</a></li>
          </ul>
        </body>
      </html>
    `);
  }

  else if (req.url === "/time") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
      serverTime: new Date().toISOString(),
      startTime: startTime.toISOString(),
      version
    }));
  }

  else if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
      status: "ok",
      version,
      startTime: startTime.toISOString()
    }));
  }

  else if (req.url === "/env") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(process.env, null, 2));
  }

  else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 - Not found\n");
  }

}).listen(port, () => log(`Server running on port ${port}, version ${version}`));

