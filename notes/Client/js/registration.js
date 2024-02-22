("use strict");
import { addUserToApp, logInUserToApp } from "./controller.js";

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

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
