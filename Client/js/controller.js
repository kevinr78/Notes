//Imports

import { Note as noteData, createNewNote, updateNoteId } from "./model.js";
import { postDataToServer } from "./helper.js";
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

async function processNewTaskData() {
  try {
    createNewNote();
    let note = await postDataToServer(noteData.currentNote);
    updateNoteId(note);
    NoteView.renderUI();
  } catch (error) {
    console.error(error);
  }
}
