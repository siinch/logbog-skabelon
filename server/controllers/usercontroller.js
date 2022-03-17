const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/usermodel.js");

const userController = express.Router();

// user sign up 
userController.post("/user/signup", async (request, response) => {

  let user = request.body;
  console.log("Signing up user...:" + JSON.stringify(user.username));

  // check the password
  if(user.password.length < 4 || user.password != user.passwordControl) {
    response.sendStatus(400);
    return;
  }

  // generate random salt
  user.salt = await bcrypt.genSalt();

  // hash the password
  user.hash = await bcrypt.hash(user.password, user.salt);

  user = new User(user);
  try {
    await user.save();
  }
  catch {
    response.statusCode=400;  
  }

  let token = jsonwebtoken.sign(
    user.username,
    process.env.TOKEN_SECRET,
    { expiresIn: '1800s' }
  );

  response.json({username: user.username, token: token});
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