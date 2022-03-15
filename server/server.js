// import the neccessary libraries
const express = require("express");
const mongoose = require("mongoose");
const router = require("./config/router.js");

// configure express server
const port = 3000;
const server = express();
server.use(express.static("../client"));
server.use(express.json());
server.use(router);

// connect to the database
const databaseConnectionString = "mongodb://localhost:27017/webapp";
mongoose.connect(databaseConnectionString);

// send the root index.html
server.get("/", async (request, response) => {
  console.log("New user connecting. Loading site..");
  response.sendFile("index.html");
});

// start server
server.listen(port, () => console.log("Listening on port " + port));
