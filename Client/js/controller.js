//Imports
("use strict");
import {
  Note as noteData,
  createNewNote,
  updateNoteId,
  deleteNoteFromLocal,
  Note,
} from "./model.js";
import { sendAPIRequest } from "./helper.js";
import NoteView from "./Views/Task.js";
import Modal from "./Views/Modal.js";

import User, { UsersSignIn, UsersLogin } from "./Views/User.js";
// Handles events and other stuff

//Event Listeners

async function processNewTaskData() {
  try {
    createNewNote();
    let note = await sendAPIRequest(
      "note/newNote",
      "POST",
      noteData.currentNote
    );
    updateNoteId(note);
    NoteView.renderUI();
  } catch (error) {
    console.error(error);
  }
}

async function removeNote(ele) {
  let noteId = { id: ele.dataset.id };
  let deletedNote = await sendAPIRequest("note/deleteNote", "DELETE", noteId);
  let localDeletedNote = deleteNoteFromLocal(deletedNote);
  NoteView.removeNotefromView(localDeletedNote);
}

function closeModal(ele) {
  let modal = document.querySelector(".modal");
  if (document.querySelector("body").contains(ele)) {
    updateNoteDetails();
    modal.style.display = "none";
  }
}
async function showModal(ele) {
  let noteId = { id: ele.dataset.id };
  let note = await sendAPIRequest("note/getNote", "POST", noteId);

  noteData.currentNote = note;
  Modal.addDisplayModalHandler();
}
async function updateNoteDetails() {
  debugger;
  let eleNote = noteData.currentNote.note;
  let ele = document.querySelector(`[data-id='${eleNote._id}']`);
  let modalNote = document.querySelector(".modal");
  let updatedNote = compareNoteValue(modalNote, eleNote);

  /*  let note = await sendAPIRequest("updateNote", "PATCH", updatedNote); */

  for (const data in noteData.lastNoteEdited) {
    if (noteData.lastNoteEdited[data][1]) {
      if (data === "Upriority") {
        let priority =
          noteData.lastNoteEdited[data][0] === 1
            ? "High"
            : noteData.lastNoteEdited[data][0] === 2
            ? "Medium"
            : "Low";
        let badgeColor =
          noteData.lastNoteEdited[data][0] === 1
            ? "text-bg-danger"
            : noteData.lastNoteEdited[data][0] === 2
            ? "text-bg-warning"
            : "text-bg-success";
        ele.querySelector(".card_metadata_priority").textContent = priority;
        ele.querySelector(".card_metadata_body").classList.add(badgeColor);
      } else {
        ele.querySelector(`[name='${data}']`).textContent =
          noteData.lastNoteEdited[data][0];
      }
    }
  }
}

function compareNoteValue(currentNote, existingNote) {
  let selected = currentNote.querySelector("#modal_task_priority");
  /*KEY: [VALUE, ISFEILDMODIFIED]  */
  let changedNote = {
    Ubody: [
      currentNote.querySelector(".modal_note_body").textContent.trim(),
      false,
    ],
    Upriority: [
      Number(
        selected.options[selected.selectedIndex].textContent === "Low"
          ? "3"
          : selected.options[selected.selectedIndex].textContent === "Medium"
          ? "2"
          : "1"
      ),
      false,
    ],
    Utitle: [
      currentNote.querySelector(".modal__note_title strong").textContent.trim(),
      false,
    ],
  };

  let toBeCompared = new Map(Object.entries(existingNote));

  for (const key in changedNote) {
    if (
      toBeCompared.has(key) &&
      changedNote[key][0] === toBeCompared.get(key)
    ) {
      toBeCompared.delete(key);
    } else {
      toBeCompared.set(key, changedNote[key]);
      changedNote[key][1] = true;
    }
    z;
  }
  noteData.lastNoteEdited = changedNote;
  return Object.fromEntries(toBeCompared);
}

/* Users Login and SignUp */

export async function addUserToApp() {
  let name, emailId, password;

  name = document.getElementById("name").value;
  emailId = document.getElementById("sign-in-email").value;
  password = document.getElementById("sign-in-password").value;
  let newUser = new User(name, emailId, password);
  if (newUser.validateUserData()) {
    let result = await UsersSignIn.signInUser(newUser);

    if (result.ok) {
      alert(result.message);
      window.location.href = "http://localhost:5500/Client/html/index.html";
    } else {
      alert("here",result.message);
    }
  }
}

export async function logInUserToApp() {
  let emailId, password;
  emailId = document.getElementById("login-email").value;
  password = document.getElementById("login-password").value;
  const userLoggedIn = await UsersLogin.logInUser({ emailId, password });
  if (userLoggedIn.ok) {
    alert(userLoggedIn.message);
     window.location.href = "http://localhost:5500/Client/html/index.html";
  } else {
   
  }
}

function init() {
  document
    .querySelector(".new_task_input_container")
    .addEventListener("click", (e) => {
      document.querySelector(".toggle_input").classList.add("expand");
    });

  /*   document.addEventListener("click", (e) => {
    let ele = document.querySelector(".toggle_input");
    if (!document.querySelector(".new_task_container").contains(e.target)) {
      if (ele.classList.contains("expand")) {
        ele.classList.remove("expand");
      }
    }
  });
 */
  document.querySelector(".menu_btn").addEventListener("click", () => {
    let side_menu = document.querySelector(".side_menu_container");
    side_menu.classList.toggle("side_expand");
    document.querySelector(".menu_text").classList.toggle("menu_text");
  });

  document.querySelector(".add_button").addEventListener("click", () => {
    processNewTaskData();
  });

  NoteView.addHandlerNoteActions(showModal, removeNote);
  Modal.addHandlerCloseModal(closeModal);
}
/* 
init(); */
