// import the neccessary libraries
const express = require("express");
const mongoose = require("mongoose");

// configure express server
const port = 3000;
const server = express();
server.use(express.static("../client"));
server.use(express.json());

// configure the database model
const databaseConnectionString = "mongodb://localhost:27017/webapp";
mongoose.connect(databaseConnectionString);
const Task = mongoose.model("Task", new mongoose.Schema({
  title: String,
  state: Number
}));

// send the root index.html
server.get("/", async (request, response) => {
  console.log("New user connecting. Loading site..");
  response.sendFile("index.html");
});

server.get("/tasks", async (request, response) => {
  console.log("Getting tasks:");
  response.json({tasks: await Task.find()});
}); 

server.post("/task", async (request, response) => {
  let task = new Task(request.body);
  console.log("Inserting task:", JSON.stringify(task));
  await task.save();
  response.json(request.body);
});

server.put("/task", async (request, response) => {
  let task = new Task(request.body);
  console.log("Updating task:", JSON.stringify(task));
  await Task.findByIdAndUpdate(task._id, task);
  response.json(request.body);
});

server.delete("/task", async (request, response) => {
  let task = new Task(request.body);
  console.log("Deleting task:", JSON.stringify(task));
  await Task.findByIdAndDelete(task._id);
  response.json(request.body);
}); 

// start server
server.listen(port, () => console.log("Listening on port " + port));
