import { sendAPIRequest } from "../helper/apiRequest.js";

function User(name, emailId, password) {
  (this.isDataValidated = false),
    (this.isUserSignedIn = false),
    (this.isUserLoggedIn = false);
  (this.name = name || ""),
    (this.emailId = emailId),
    (this.password = password);
}

function validateUserData() {
  let validErrors = [];
  if (this.name.length < 2 || /\d/.test(this.name)) {
    this.isDataValidated = false;
    validErrors.push("Name should be valid");
  } else if (this.emailId.length < 2 || this.emailId.indexOf("@") == -1) {
    this.isDataValidated = false;
    validErrors.push("Email Id is incorrect");
  } else if (this.password.length < 2) {
    this.isDataValidated = false;
    validErrors.push("Password Length should be greate than 2 ");
  }

  if (validErrors.length > 0) {
    return { isDataValidated: this.isDataValidated, errors: validErrors };
  } else {
    return { isDataValidated: !this.isDataValidated, errors: validErrors };
  }
}

async function userSignIn() {
  let userObj = {
    name: this.name,
    email: this.emailId,
    password: this.password,
  };

  this.isUserSignedIn = await sendAPIRequest("auth/signUp", "POST", userObj);

  return this.isUserSignedIn;
}

async function logInUser() {
  let userObj = {
    emailId: this.emailId,
    password: this.password,
  };

  this.isUserLoggedIn = await sendAPIRequest("auth/login", "POST", userObj);
  return this.isUserLoggedIn;
}

Object.setPrototypeOf(User.prototype, {
  validateUserData,
  logInUser,
  userSignIn,
});

export default User;
