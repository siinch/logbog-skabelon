const express = require("express");
const taskController = require("../controllers/taskcontroller.js");

const router = express();
router.use(taskController);

module.exports = router;