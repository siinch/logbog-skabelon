const express = require("express");
const authenticator = require("./authenticator");
const taskController = require("../controllers/taskcontroller.js");
const userController = require("../controllers/usercontroller.js");

const router = express.Router();

// task routes
router.get(
    "/tasks", 
    authenticator.verifyToken,
    taskController.findTasksByUsername
);

router.post (
    "/task",
    authenticator.verifyToken,
    taskController.insertTask
);

router.put(
    "/task",
    authenticator.verifyToken,
    taskController.updateTask
);

router.delete(
    "/task",
    authenticator.verifyToken,
    taskController.deleteTask
);

// user routes
router.post(
    "/user/signup",
    userController.signUp
);

router.post(
    "/user/login",
    userController.logIn
);

router.delete(
    "/user",
    authenticator.verifyToken,
    userController.deleteUser
);

module.exports = router;