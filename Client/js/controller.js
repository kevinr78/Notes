//Imports

("use strict");
import {
  Note as noteData,
  createNewNote,
  updateNoteId,
  deleteNoteFromLocal,
} from "./model.js";
import { sendAPIRequest } from "./helper.js";
import NoteView from "./Views/Task.js";

// Handles events and other stuff

//Event Listeners

document
  .querySelector(".new_task_input_container")
  .addEventListener("click", (e) => {
    document.querySelector(".toggle_input").classList.add("expand");
  });

document.addEventListener("click", (e) => {
  let ele = document.querySelector(".toggle_input");
  if (!document.querySelector(".new_task_container").contains(e.target)) {
    if (ele.classList.contains("expand")) {
      ele.classList.remove("expand");
    }
  }
});

document.querySelector(".menu_btn").addEventListener("click", () => {
  let side_menu = document.querySelector(".side_menu_container");
  side_menu.classList.toggle("side_expand");
  document.querySelector(".menu_text").classList.toggle("menu_text");
});
/* sideNavMenuBtn.addEventListener("click", (e) => {
  document.querySelector(".side_menu").classList.add("expand_side");
}); */
document.querySelector(".add_button").addEventListener("click", () => {
  processNewTaskData();
});

NoteView.addHandlerRemoveCard(removeNote);
async function processNewTaskData() {
  try {
    createNewNote();
    let note = await sendAPIRequest("newTask", "POST", noteData.currentNote);
    updateNoteId(note);
    NoteView.renderUI();
  } catch (error) {
    console.error(error);
  }
}

async function removeNote(ele) {
  let noteId = { id: ele.dataset.id };
  let deletedNote = await sendAPIRequest("deleteNote", "DELETE", noteId);
  console.log(deletedNote);
  let localDeletedNote = deleteNoteFromLocal(deletedNote);
  NoteView.removeNotefromView(localDeletedNote);
}
