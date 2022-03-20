const express = require("express");
const auth = require("../middleware/authenticator.js");
const Task = require("../models/taskmodel.js");

const taskController = express.Router();

taskController.get("/tasks", auth.token, async (request, response) => {
  try {
    console.log("Getting tasks...");
    response.json({tasks: await Task.find({username: request.username})});
  }
  catch(error) {
    console.log(error);
    response.sendStatus(400);
  }
}); 

taskController.post("/task", auth.token, async (request, response) => {
  try {
    request.body.username = request.username;
    let task = new Task(request.body);
    console.log("Inserting task:", JSON.stringify(task));
    await task.save();
    response.json(request.body);
  }
  catch(error) {
    console.log(error);
    response.sendStatus(400);
  }
});

taskController.put("/task", auth.token, async (request, response) => {
  try {
    // make sure that the user supplied their own username
    let task = new Task(request.body);
    task.username = request.username;
    console.log("Updating task:", JSON.stringify(task));

    let query = {
      _id: task._id,
      username: task.username
    };

    await Task.findOneAndUpdate(query, task);
    response.json(request.body);
  }
  catch(error) {
    console.log(error);
    response.sendStatus(400);
  }
});

taskController.delete("/task", auth.token, async (request, response) => {
  try {
    let task = new Task(request.body);
    task.username = request.username;
    console.log("Deleting task:", JSON.stringify(task))

    await task.delete();
    response.json(task);
  }
  catch(error) {
    console.log(error);
    response.sendStatus(400);
  }
}); 

module.exports = taskController;