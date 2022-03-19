const express = require("express");
const auth = require("../middleware/authenticator.js");
const Task = require("../models/taskmodel.js");

const taskController = express.Router();

taskController.get("/tasks", auth.token, async (request, response) => {
  console.log("Getting tasks...");
  response.json({tasks: await Task.find()});
}); 

taskController.post("/task", auth.token, async (request, response) => {
  let task = new Task(request.body);
  console.log("Inserting task:", JSON.stringify(task));
  await task.save();
  response.json(request.body);
});

taskController.put("/task", auth.token, async (request, response) => {
  let task = new Task(request.body);
  console.log("Updating task:", JSON.stringify(task));
  await Task.findByIdAndUpdate(task._id, task);
  response.json(request.body);
});

taskController.delete("/task", auth.token, async (request, response) => {
  let task = new Task(request.body);
  console.log("Deleting task:", JSON.stringify(task));
  await Task.findByIdAndDelete(task._id);
  response.json(request.body);
}); 

module.exports = taskController;