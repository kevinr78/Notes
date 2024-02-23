//Imports
("use strict");

import { createNewNote, updateNoteId } from "./model.js";
import { sendAPIRequest } from "./helper/apiRequest.js";
import NoteView from "./Views/Note.js";
import Modal from "./Views/Modal.js";

//Event Listeners

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
