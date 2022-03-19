const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  username: String,
  title: String,
  state: Number
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

