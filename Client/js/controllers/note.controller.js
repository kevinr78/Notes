import NoteView from "../Views/Note.js";
import { Modal } from "../Views/Modal.js";
import { sendAPIRequest } from "../helper/apiRequest.js";
import { MODAL_ELEMENT } from "../Views/Note.js";

export const Note = {
  currentNote: null,
  noteCount: 0,
};
1;
const user = {
  currentUser: null,
  lastLogin: null,
};

export const priorityMap = {
  ["High"]: "text-bg-danger",
  ["Medium"]: "text-bg-warning",
  ["Low"]: "text-bg-success",
};

console.log(priorityMap.High);

const listOfNotesToBeUpdated = cacheNotesToBeUpdated();

const note_title = document.getElementById("note_title");
const note_content = document.getElementById("note_content");
const note_priority = document.getElementById("note_priority");

//Modal Update Button
const modalUpdateButton = document.getElementById("update-note-btn");

/* Bug to be fixed, throw error if values are null, since function continues executing */

function createNewNote() {
  let tempNote = Object.create({});

  if (
    note_title.value == "" ||
    note_content.value == "" ||
    note_priority.value == ""
  ) {
    alert("Please fill all the details");
    return;
  }
  tempNote["id"] = Note.noteCount + 1;
  tempNote["title"] = note_title.value.trim() || null;
  tempNote["content"] = note_content.value.trim();
  tempNote["priority"] = note_priority.value.trim();

  Note.currentNote = tempNote;
}

export function updateNoteId(note) {
  let findNote = Note.noteList.find((item) => {
    return item.id === Note.currentNote.id;
  });
  findNote.objectId = note.note._id;
  Note.currentNote["objectId"] = note.note._id;
}

document.querySelector(".add_button").addEventListener("click", () => {
  processNewTaskData();
});

document.querySelector(".menu_btn").addEventListener("click", () => {
  let side_menu = document.querySelector(".side_menu_container");
  side_menu.classList.toggle("side_expand");
  document.querySelector(".menu_text").classList.toggle("menu_text");
});

async function processNewTaskData() {
  try {
    createNewNote();
    let noteFromServer = await sendAPIRequest(
      "note/newNote",
      "POST",
      Note.currentNote
    );
    Note.currentNote = [noteFromServer.note];
    /* updateNoteId(note); */
    NoteView.renderUI();
  } catch (error) {
    console.error(error);
  }
}

async function getUserNotes() {
  let noteList = await sendAPIRequest("note/getNotes", "GET", null);
  Note.currentNote = noteList.note;
  NoteView.renderUI();
}

modalUpdateButton.onclick = () => {
  let updatedNote = {};

  updatedNote.titleElement = document.querySelector("#modal-note-title").value;
  updatedNote.bodyElement = document.querySelector("#modal-note-text").value;
  updatedNote.priorityElement = document.querySelector(
    "#modal-note-priority"
  ).value;

  MODAL_ELEMENT.modal.closeModal();
  let note = document.querySelector(
    `div[data-id="${MODAL_ELEMENT.modal.noteId}"]`
  );

  note.querySelector(".card-title").textContent = updatedNote.titleElement;
  note.querySelector(".card-text").textContent = updatedNote.bodyElement;
  note.querySelector(".card-priority").textContent =
    updatedNote.priorityElement;

  note
    .querySelector(".badge")
    .classList.remove(
      `${priorityMap[note.querySelector(".card-priority").textContent]}`
    );

  note
    .querySelector(".badge")
    .classList.add(`${priorityMap[updatedNote.priorityElement]}`);
  listOfNotesToBeUpdated(MODAL_ELEMENT.modal.noteId, updatedNote);
};

function cacheNotesToBeUpdated() {
  const cache = new Map();

  return function (key = null, value = null) {
    if (key === null && value === null) return cache;
    if (cache.has(key)) {
      cache.set(key, value);
    } else {
      cache.set(key, value);
    }

    return cache;
  };
}

window.onload = function () {
  getUserNotes();
  NoteView.registerOpenNoteModalListener();
};
/* setInterval(() => {
  let data = listOfNotesToBeUpdated(null, null);
}, 5000);
 */
