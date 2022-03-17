const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/usermodel.js");

const userController = express.Router();

userController.post("/user/signup", async (request, response) => {

  let user = request.body;
  console.log("Signing up user...:" + JSON.stringify(user.username));

  // generate random salt between 20.000 and 30.000
  user.salt = Math.random()*30000-10000;

  // hash the password
  user.hash = await bcrypt.hash(user.password, user.salt);

  user = new User(user);

  await user.save();

  response.json({username: user.username});
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