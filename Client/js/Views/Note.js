import {
  Note as noteData,
  priorityMap,
} from "../controllers/note.controller.js";
import { Modal } from "./Modal.js";

export const MODAL_ELEMENT = {};
class NoteView {
  _parentElement = document.querySelector(".task_card_container");

  registerOpenNoteModalListener() {
    this._parentElement.addEventListener("click", (e) => {
      let noteId, noteTitle, noteBody, notePriority, modal;
      const targetEle = e.target.closest(".card");

      if (!targetEle || targetEle === null || targetEle === undefined) return;

      noteId = targetEle.getAttribute("data-id");
      noteTitle = targetEle.querySelector(".card-title").innerText;
      noteBody = targetEle.querySelector(".card-text").innerText;
      notePriority = targetEle.querySelector(".card-priority").textContent;

      console.log("notePriority", typeof notePriority);
      modal = new Modal(noteTitle, noteBody, notePriority, noteId);
      MODAL_ELEMENT.modal = modal;
      modal.showModal();
    });
  }

  renderUI() {
    let monthMap = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      8: "Oct",
      9: "Nov",
      10: "Dec",
    };

    let month = monthMap[new Date().getMonth()];
    let day = new Date().getDate();

    // Rendering the task card UI

    for (const note of noteData.currentNote) {
      let badgeColor = priorityMap[note.priority];

      let template = this.generateNoteTemplate(note, badgeColor, month, day);
      this._parentElement.insertAdjacentHTML("beforeend", template);
    }
    this.clearTaskModal();
  }

  removeNotefromView(note) {
    document.querySelector(`div[data-id="${note.objectId}"]`).remove();
  }

  generateNoteTemplate(
    { _id, title, content, priority },
    badgeColor,
    month,
    day
  ) {
    return `
        <div class="card me-4 mb-4" style="width: 18rem;" data-id="${_id}">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${content}</p>
           
            <span class="badge ${badgeColor} me-2">
              <span class="material-symbols-outlined">
                priority_high
              </span>
             <span class="card-priority "> ${priority} </span>
            </span>
            <span class="badge text-bg-light">
                <span class="material-symbols-outlined">
                  schedule  
                </span> 
                ${month} ${day}
            </span>
          </div>
        </div>`;
  }

  clearTaskModal() {
    note_title.value = "";
    note_content.value = "";
    note_priority.value = "3";
  }
}

export default new NoteView();
