const express = require("express");
const auth = require("../middleware/authenticator.js");
const Task = require("../models/taskmodel.js");

const taskController = {};

taskController.findTasksByUsername = async (request, response) => {
  try {
    console.log("Getting tasks...");
    let query = {username: request.username};
    let tasks = await Task.find(query);
    response.json({tasks: tasks});
  }
  catch(error) {
    console.log(error);
    response.sendStatus(400);
  }
}; 

taskController.insertTask = async (request, response) => {
  try {
    let task = new Task(request.body);
    task.username = request.username;
    console.log("Inserting task:", JSON.stringify(task));
    await task.save();
    response.json(request.body);
  }
  catch(error) {
    console.log(error);
    response.sendStatus(400);
  }
};

taskController.updateTask = async (request, response) => {
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
};

taskController.deleteTask = async (request, response) => {
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
};

taskController.deleteUserTasks = async (request, response) => {
  try {
    console.log("Deleting all tasks by user:", request.username);
    await Task.deleteMany({username: request.username});
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = taskController;