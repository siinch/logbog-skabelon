const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/usermodel.js");

const userController = express.Router();

// user sign up 
userController.post("/user/signup", async (request, response) => {

  let user = request.body;
  console.log("Signing up user...:" + JSON.stringify(user.username));

  if(user.username == "" || user.username == null) {
    console.log("Missing username!")
    return;
  }

  if(user.password == "" || user.password == null) {
    console.log("Missing password!");
    return;
  }

  if (user.password != user.passwordControl) {
    console.log("Control password did not match!");
    return;
  }

  delete user.passwordControl;
  // generate random salt between 20.000 and 30.000
  user.salt = Math.random()*30000-10000;

  // hash the password
  user.hash = await bcrypt.hash(user.password, user.salt);

  user = new User(user);
  await user.save();
  response.json({username: user.username});
});

// user login
userController.post("/user/login", async (request, response) => {
  console.log("Logging in user...");
});

// user log out
userController.post("/user/logout", async (request, response) => {
  console.log("Signing out user...:");
  
});

userController.delete("/user", async (request, response) => {
  console.log("Deleting user...");
});

module.exports = userController;