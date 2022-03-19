require("dotenv").config({path: "./config/.env"});
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/usermodel.js");
const auth = require("../middleware/authenticator.js");

const userController = express.Router();

// user sign up 
userController.post("/user/signup", async (request, response) => {
  try {
    // read the request body and log username
    let user = request.body;
    console.log("Signing up user...:" + JSON.stringify(user.username));

    // control if the password is valid
    if(user.password.length < 4 || user.password != user.passwordControl) {
      throw "Invalid password";
    }

    // hash the password
    let salt = await bcrypt.genSalt();
    user.hash = await bcrypt.hash(user.password, salt);

    // save the user in the database
    user = new User(user);
    await user.save();

    // create an authentication token
    let token = jsonwebtoken.sign(
      { username: user.username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1800s" }
    );

    // respond with authentication token and username
    response.json({username: user.username, token: token});
  }
  catch(error) {
    // respond with 400 bad request in case of error
    console.log(error);
    response.sendStatus(400);
  }
});

// user login
userController.post("/user/login", async (request, response) => {
  try {
    // read the request body and log the username
    let userForLogin = request.body;
    console.log("Logging in user...:", userForLogin.username);

    // find the user by username in the database
    let user = await User.findOne({ username: userForLogin.username });

    // check if the password is correct using the hash
    let isPasswordCorrect = await bcrypt.compare(
      userForLogin.password,
      user.hash
    );
    if(!isPasswordCorrect) {
      throw "Incorrect password";
    }

    // create authentication token
    let token = jsonwebtoken.sign(
      { username: user.username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1800s" }
    );

    // send response with the authentication token
    response.json({username: user.username, token: token});
  }
  catch (error) {
    // respond with 400 bad request in case of error
    console.log(error);
    response.sendStatus(400);
  }
});

// user log out
userController.post("/user/logout", async (request, response) => {
  console.log("Signing out user...:");
  
});

userController.delete("/user", auth.token, async (request, response) => {
  console.log("Deleting user...");
});

module.exports = userController;