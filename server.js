// import the neccessary libraries
const express = require("express");
const server = express();
const port = 3000;

// configure express server
server.use(express.static("./"));

// send the root index.html
server.get("/", (request, response) => {
  console.log("New user connecting. Loading site..");
  response.sendFile("index.html");
})

// start server
server.listen(port, () => console.log("Listening on port " + port));
