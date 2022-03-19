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
    request.body.username = request.username;
    let taskForUpdate = new Task(request.body);
    console.log("Updating task:", JSON.stringify(taskForUpdate));

    // make sure the user is the owner of the task
    let task = await Task.findById(taskForUpdate._id);
    if(task.username != taskForUpdate.username)
      throw "User is not owner of the task they tried to update";

    await Task.findByIdAndUpdate(taskForUpdate._id, taskForUpdate);
    response.json(request.body);
  }
  catch(error) {
    console.log(error);
    response.sendStatus(400);
  }
});

taskController.delete("/task", auth.token, async (request, response) => {
  try {
    request.body.username = request.username;
    let taskForDeletion = new Task(request.body);
    console.log("Deleting task:", JSON.stringify(taskForDeletion));

    // make sure the user is the owner of the task
    let task = await Task.findById(taskForDeletion._id);
    if(task.username != taskForDeletion.username)
      throw "User is not owner of the task they tried to delete";

    await Task.findByIdAndDelete(taskForDeletion._id);
    response.json(request.body);
  }
  catch(error) {
    console.log(error);
    response.sendStatus(400);
  }
}); 

module.exports = taskController;