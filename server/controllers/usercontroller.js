require("dotenv").config({path: "./config/.env"});
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/usermodel.js");

const userController = express.Router();

// user sign up 
userController.post("/user/signup", async (request, response) => {
  try {
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
    
    await user.save();

    let token = jsonwebtoken.sign(
      { username: user.username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1800s" }
    );

    response.json({username: user.username, token: token});
  }
  catch(error) {
    console.log(error);
    response.sendStatus(400);
  }
});

// user login
userController.post("/user/login", async (request, response) => {
  let userForLogin = request.body;
  console.log("Logging in user...:", userForLogin.username);

  let user;
  let isPasswordCorrect;
  try {
    user = await User.findOne({ username: userForLogin.username });
    user = new User(user);

    isPasswordCorrect = await bcrypt.compare(
      userForLogin.password,
      user.hash
    );
  }
  catch {
    response.sendStatus(400);
    return;
  }

  if(!isPasswordCorrect) {
    response.sendStatus(400);
    return;
  }

  let token = jsonwebtoken.sign(
    { username: user.username },
    process.env.TOKEN_SECRET,
    { expiresIn: "1800s" }
  );

  response.json({username: user.username, token: token});
});

// user log out
userController.post("/user/logout", async (request, response) => {
  console.log("Signing out user...:");
  
});

userController.delete("/user", async (request, response) => {
  console.log("Deleting user...");
});

module.exports = userController;