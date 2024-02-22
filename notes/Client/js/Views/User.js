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

  async signInUser(user) {
    let userObj = {
      name: user.name,
      email: user.emailId,
      password: user.password,
    };

    this.isUserSignedIn = await sendAPIRequest("auth/signUp", "POST", userObj);

    return this.isUserSignedIn;
  }
}

class UserLogin {
  isUserLoggedIn;
  async logInUser(user) {
    let userObj = {
      emailId: user.emailId,
      password: user.password,
    };

    this.isUserLoggedIn = await sendAPIRequest("auth/login", "POST", userObj);
    return this.isUserLoggedIn;
  }
}

let UsersSignIn = new UserSignIn();
let UsersLogin = new UserLogin();

export { UsersSignIn, UsersLogin };
