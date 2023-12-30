import { sendAPIRequest } from "../helper.js";

export default class User {
  isDataValidated;
  constructor(name, emailId, password) {
    (this.name = name || ""),
      (this.emailId = emailId),
      (this.password = password);
  }

  validateUserData() {
    if (this.name.length < 2 || /\d/.test(this.name)) {
      this.isDataValidated = false;
      return "Name should be valid";
    } else if (this.emailId.length < 2 || this.emailId.indexOf("@") == -1) {
      this.isDataValidated = false;
      return "Email Id is incorrect";
    } else if (this.password.length < 2) {
      this.isDataValidated = false;
      return "Password is incorrect";
    }
    this.isDataValidated = true;
    return this.isDataValidated;
  }
}

class UserSignIn extends User {
  isUserSignedIn;

  signInUser(user) {
    let userObj = {
      name: user.name,
      email: user.emailId,
      password: user.password,
    };

    this.isUserSignedIn = sendAPIRequest("auth/signUp", "POST", userObj);
  }
}

class UserLogin {
  isUserLoggedIn;
  logInUser(user) {
    let userObj = {
      emailId: user.emailId,
      password: user.password,
    };

    this.isUserLoggedIn = sendAPIRequest("auth/login", "POST", userObj);
  }
}

let UsersSignIn = new UserSignIn();
let UsersLogin = new UserLogin();

export { UsersSignIn, UsersLogin };
