const express = require("express");
const Task = require("../models/taskmodel.js");

const userController = express.Router();

userController.post("/user/signup", async (request, response) => {
  console.log("Signing up user...:");
  
});

userController.post("/user/login", async (request, response) => {
  console.log("Logging in user...");
});

userController.post("/user/signout", async (request, response) => {
  console.log("Signing out user...:");
  
});

userController.delete("/user", async (request, response) => {
  console.log("Deleting user...");
}); 

module.exports = userController;