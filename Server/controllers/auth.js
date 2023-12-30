const bcrypt = require("bcrypt");
const User = require("../model/userModel");
async function loginUser(req, res) {
  let emailId, password, loggingInUser, passwordCheck;

  try {
    debugger;
    emailId = req.body.emailId;
    password = req.body.password;

    console.log(emailId, password);
    loggingInUser = await User.findOne({ emailId: emailId });
    if (!loggingInUser) {
      throw new Error("Email Id doesn't exist");
    }
    console.log(loggingInUser);
    passwordCheck = await bcrypt.compare(password, loggingInUser.password);

    if (!passwordCheck) {
      throw new Error("Password is incorrect");
    }
    console.log("SUccess");
  } catch (error) {
    return res.status(400).json(error);
  }
}

async function signUpUser(req, res) {
  let emailExists, hashedPassword, passwordSalt, newuser;
  try {
    let name = req.body.name.trim();
    let emailId = req.body.email.trim();
    let password = req.body.password.trim();

    if (name == "" || emailId == "" || password == "") {
      throw new Error("Invalid user data Provided");
    }

    emailExists = await User.findOne({ emailId: emailId });
    if (emailExists) {
      throw new Error("Email Already exist");
    }

    passwordSalt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, passwordSalt);

    newUser = new User({
      name: name,
      emailId: emailId,
      password: hashedPassword,
      createdBy: "Admin",
    });

    await newUser.save();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

module.exports = { loginUser, signUpUser };
