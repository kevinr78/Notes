import NoteView from "../Views/Note.js";
import Modal from "../Views/Modal.js";
import { sendAPIRequest } from "../helper/apiRequest.js";

export const Note = {
  currentNote: null,
  noteCount: 0,
};
1;
const user = {
  currentUser: null,
  lastLogin: null,
};

const note_title = document.getElementById("note_title");
const note_content = document.getElementById("note_content");
const note_priority = document.getElementById("note_priority");
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

NoteView.addHandlerNoteActions(showModal, removeNote);
Modal.addHandlerCloseModal(closeModal);

document.querySelector(".add_button").addEventListener("click", () => {
  processNewTaskData();
});

/* document.addEventListener("click", (e) => {
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

async function removeNote(ele) {
  let noteId = { id: ele.dataset.id };
  let deletedNote = await sendAPIRequest("note/deleteNote", "DELETE", noteId);
  /*   let localDeletedNote = deleteNoteFromLocal(deletedNote); */
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

async function getUserNotes() {
  let noteList = await sendAPIRequest("note/getNotes", "GET", null);
  Note.currentNote = noteList.note;
  NoteView.renderUI();
}

window.onload = function () {
  getUserNotes();
};
