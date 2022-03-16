const express = require("express");
const User = require("../models/usermodel.js");

const userController = express.Router();

userController.post("/user/signup", async (request, response) => {
  console.log("Signing up user...:" + JSON.stringify(request.body));
  response.json(request.body);
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