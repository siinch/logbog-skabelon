// import the neccessary libraries
const express = require("express");
const server = express();
const port = 3000;

// configure express server
server.use(express.static("./"));
server.use(express.json());

// send the root index.html
server.get("/", async (request, response) => {
  console.log("New user connecting. Loading site..");
  response.sendFile("index.html");
});

server.post("/task", async (request, response) => {
  let task = request.body;
  console.log("Inserting task:", JSON.stringify(task));
  response.json(request.body);
}); 

// start server
server.listen(port, () => console.log("Listening on port " + port));
