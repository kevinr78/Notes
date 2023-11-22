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
