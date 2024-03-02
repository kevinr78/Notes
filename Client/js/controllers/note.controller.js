import NoteView from "../Views/Note.js";
import { Modal } from "../Views/Modal.js";
import { sendAPIRequest } from "../helper/apiRequest.js";
import { MODAL_ELEMENT } from "../Views/Note.js";
import { showErrorToast } from "../helper/toast.js";

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
  ["Work"]: ["text-bg-danger", "bg-danger-subtle", "border-danger-subtle"],
  ["Productivity"]: [
    "text-bg-warning",
    "bg-warning-subtle",
    "border-warning-subtle",
  ],
  ["Personal"]: [
    "text-bg-success",
    "bg-success-subtle",
    "border-success-subtle",
  ],
};

const listOfNotesToBeUpdated = cacheNotesToBeUpdated();

const note_title = document.getElementById("note_title");
const note_content = document.getElementById("note_content");
const note_tags = document.getElementById("note_tags_choice");

//Modal Update Button
const modalUpdateButton = document.getElementById("update-note-btn");

/* Bug to be fixed, throw error if values are null, since function continues executing */

function createNewNote() {
  let tempNote = Object.create({});

  if (
    note_title.value == "" ||
    note_content.value == "" ||
    note_tags.value == ""
  ) {
    alert("Please fill all the details");
    return;
  }

  tempNote["id"] = Note.noteCount + 1;
  tempNote["title"] = note_title.value.trim() || null;
  tempNote["content"] = note_content.value.trim();
  tempNote["tags"] = note_tags.value.split(" ");
  console.log(tempNote);
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

    NoteView.renderUI();
  } catch (error) {
    console.error(error);
  }
}

async function getUserNotes() {
  let { message, status, ok, note } = await sendAPIRequest(
    "note/getNotes",
    "GET",
    null
  );

  if (status === 498 && !ok) {
    showErrorToast({ message });
    setTimeout(() => {
      window.location.href =
        "http://localhost:5500/Client/html/registration.html";
    }, 3000);
  }

  Note.currentNote = note;
  NoteView.renderUI();
}

modalUpdateButton.onclick = () => {
  let updatedNote = {};

  updatedNote.titleElement = document.querySelector("#modal-note-title").value;
  updatedNote.bodyElement = document.querySelector("#modal-note-text").value;
  updatedNote.tagElement = document.querySelector("#modal-note-priority").value;

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
    if (key === null && value === null) {
      return cache;
    } else {
      cache.set(key, value);
    }
    return cache;
  };
}

window.onload = function () {
  getUserNotes();
  NoteView.registerNotelListener();
};
