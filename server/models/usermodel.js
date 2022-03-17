const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true, dropDubs: true},
  salt: {type: String, required: true},
  hash: {type: String, required: true}
});

const User = mongoose.model("User", userSchema);

module.exports = User;

