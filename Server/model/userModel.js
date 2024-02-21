const { default: mongoose, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: String,
  emailId: String,
  password: String,
  createdBy: String,
 
},{
  timestamps:true
});

module.exports = mongoose.model("User", UserSchema);
