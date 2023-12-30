const { default: mongoose, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: String,
  emailId: String,
  password: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
