const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  username: String,
  title: {type: String, validate: titleValidator},
  state: {type: Number, min: 0, max: 3}
});

const Task = mongoose.model("Task", taskSchema);

// check that the title does not contain any of the
// specified special characters
function titleValidator (title) {
  return !/["<>'`´]/.test(title);
}

module.exports = Task;

