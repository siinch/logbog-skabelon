const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  username: String,
  title: String,
  state: {type: Number, min: 0, max: 3}
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

