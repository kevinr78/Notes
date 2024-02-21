const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
async function loginUser(req, res, next) {
  let emailId, password, loggingInUser, passwordCheck, err, token;

  try {
    emailId = req.body.emailId;
    password = req.body.password;

    loggingInUser = await User.findOne({ emailId: emailId });
    if (!loggingInUser) {
      err = new Error("Email Id doesn't exist");
      err.ok = 0;
      err.status = 404;
      throw err;
    }
    passwordCheck = await bcrypt.compare(password, loggingInUser.password);

    if (!passwordCheck) {
      err = new Error("Password is incorrect");
      err.ok = 0;
      err.status = 404;
      throw err;
    }

    token = jwt.sign({ _id: loggingInUser._id }, process.env.TOKEN_SECRET);
    return res
      .status(200)
      .setHeader("authtoken", token)
      .send({ message: "Successfully Logged In", status: 1, ok: 1 });
  } catch (error) {
    next(err);
  }
}

async function signUpUser(req, res, next) {
  let emailExists, hashedPassword, passwordSalt, newuser, err;
  try {
    let name = req.body.name.trim();
    let emailId = req.body.email.trim();
    let password = req.body.password.trim();

    if (name == "" || emailId == "" || password == "") {
      err = new Error("Please fill in all the details");
      err.ok = 0;
      err.status = 400;
      throw err;
    }

    emailExists = await User.findOne({ emailId: emailId });
    if (emailExists) {
      err = new Error("User already exists. Please try logging in");
      err.ok = 0;
      err.status = 403;
      throw err;
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

    return res
      .status(200)
      .send({ message: "Account created successfully", status: 1, ok: 1 });
  } catch (error) {
    next(err);
  }
}

module.exports = { loginUser, signUpUser };
