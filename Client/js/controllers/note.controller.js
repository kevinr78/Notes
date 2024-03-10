import NoteView from "../Views/Note.js";
import { Modal } from "../Views/Modal.js";
import { sendAPIRequest } from "../helper/apiRequest.js";
import { MODAL_ELEMENT } from "../Views/Note.js";
import { showErrorToast } from "../helper/toast.js";

export const Note = {
  currentNote: null,
  noteCount: 0,
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
const noteSearchBtn = document.getElementById("note-search-btn");
const noteInput = document.getElementById("search_note_input");

//Modal Update Button
const modalUpdateButton = document.getElementById("update-note-btn");

noteInput.oninput = searchForNotes;
noteSearchBtn.onclick = searchForNotes;

function searchForNotes() {
  let searchInputValue = noteInput.value.toLowerCase();
  if (searchInputValue === "") {
    NoteView.renderUI();
  }

  Note.currentNote.filter((note) => {
    if (!note.title.toLowerCase().includes(searchInputValue)) {
      document
        .querySelector(`div[data-id="${note._id}"]`)
        .classList.add("show-card");
    }
  });
}

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

async function processNewTaskData() {
  try {
    createNewNote();
    let noteFromServer = await sendAPIRequest(
      "note/newNote",
      "POST",
      Note.currentNote
    );

    getUserNotes();
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
  //console.log(MODAL_ELEMENT);
  updatedNote.titleElement = document.querySelector("#modal-note-title").value;
  updatedNote.bodyElement = document.querySelector("#modal-note-text").value;
  updatedNote.tagElement = document
    .querySelector("#modal_note_tags")
    .value.split(" ");

  MODAL_ELEMENT.modal.closeModal();
  let note = document.querySelector(
    `div[data-id="${MODAL_ELEMENT.modal.noteId}"]`
  );

  note.querySelector(".card-title").textContent = updatedNote.titleElement;
  note.querySelector(".card-text").textContent = updatedNote.bodyElement;
  note.querySelector("#card_note_tags").innerHTML = updatedNote.tagElement
    .map((ele) => {
      return `<span class="badge card_note_tags card_tag rounded-pill ${
        priorityMap[ele]?.[0] ?? "text-bg-primary"
      }  me-2">${ele}</span>`;
    })
    .join("");

  listOfNotesToBeUpdated(MODAL_ELEMENT.modal.noteId, updatedNote);
};

function cacheNotesToBeUpdated() {
  const cache = [];
  let i = 0;

  return function (key = null, value = null) {
    if (key === null && value === null) {
      return cache;
    } else {
      cache[i] = { key: key, value: value };
      i++;
    }
    return cache;
  };
}

setInterval(async () => {
  let payload = listOfNotesToBeUpdated();
  if (payload.length !== 0) {
    let serverresp = await sendAPIRequest("note/updateNote", "POST", payload);
    if (!serverresp.ok) {
      showErrorToast({ message: "Unable to update Notes at the moment." });
    }
  }
  payload.length = 0;
}, 15000);

window.onload = function () {
  getUserNotes();
  NoteView.registerNotelListener();
};
