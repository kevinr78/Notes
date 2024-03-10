/* Users Login and SignUp */
import User from "../Views/User.js";
import { sendAPIRequest } from "../helper/apiRequest.js";
import { showErrorToast, showSuccessToast } from "../helper/toast.js";

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

//Event Listeners

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

document
  .getElementById("sign-in-form-button")
  .addEventListener("click", (e) => {
    e.preventDefault();
    addUserToApp();
  });

document.getElementById("login-in-form").addEventListener("click", (e) => {
  e.preventDefault();
  logInUserToApp();
});

export async function addUserToApp() {
  let name, emailId, password;
  name = document.getElementById("name").value;
  emailId = document.getElementById("sign-in-email").value;
  password = document.getElementById("sign-in-password").value;
  let newUser = new User(name, emailId, password);

  try {
    const { dataValidationSuccess, errors } = newUser.validateUserData();

    if (!dataValidationSuccess && errors.length > 0) {
      throw new Error("Please Provide valid inputs");
    }

    let { token, ok, message } = await newUser.userSignIn();

    if (!ok) {
      throw new Error(message);
    }

    localStorage.setItem("token", token);
    showSuccessToast(message);
    window.location.href = "http://localhost:5500/Client/html/note.html";
  } catch (error) {
    showErrorToast(error);
  }
}

export async function logInUserToApp() {
  let emailId, password;
  emailId = document.getElementById("login-email").value;
  password = document.getElementById("login-password").value;
  let newUser = new User(null, emailId, password);
  try {
    const { token, ok, message } = await newUser.logInUser({
      emailId,
      password,
    });
    if (!ok) {
      throw new Error(message);
    }
    localStorage.setItem("token", token);
    showSuccessToast(message);
    window.location.href = "http://localhost:5500/Client/html/note.html";
  } catch (error) {
    showErrorToast(error);
  }
}
