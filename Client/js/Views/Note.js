import {
  Note as noteData,
  priorityMap,
} from "../controllers/note.controller.js";
import { sendAPIRequest } from "../helper/apiRequest.js";
import { Modal } from "./Modal.js";
import { showErrorToast, showSuccessToast } from "../helper/toast.js";

export const MODAL_ELEMENT = {};
class NoteView {
  _parentElement = document.querySelector(".task_card_container");

  registerOpenNoteModalListener() {
    this._parentElement.addEventListener("click", (e) => {
      const targetEleType = e.target.type ?? "card";
      const targetEle = e.target.closest(".card");
      const noteId = targetEle.getAttribute("data-id");
      console.log(noteId);
      switch (targetEleType) {
        case "button":
          this.removeNotefromView(noteId);
          break;
        case "card":
          this.showNoteModal(targetEle, noteId);
          break;
        default:
          return;
      }
    });
  }

  showNoteModal(targetEle, noteId) {
    let noteTitle, noteBody, notePriority, modal;

    if (!targetEle || targetEle === null || targetEle === undefined) return;

    noteTitle = targetEle.querySelector(".card-title").innerText;
    noteBody = targetEle.querySelector(".card-text").innerText;
    notePriority = targetEle.querySelector(".card-priority").textContent;

    modal = new Modal(noteTitle, noteBody, notePriority, noteId);
    MODAL_ELEMENT.modal = modal;
    modal.showModal();
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
      let priorityColorMap = priorityMap[note.priority];

      let template = this.generateNoteTemplate(
        note,
        priorityColorMap,
        month,
        day
      );
      this._parentElement.insertAdjacentHTML("beforeend", template);
    }
    this.clearTaskModal();
  }

  async removeNotefromView(noteId) {
    /*  const isNoteDeleted = await sendAPIRequest("note/deleteNote", "DELETE", {
      id: noteId,
    });

    if (!isNoteDeleted.ok) {
      showErrorToast("Error while Deleting");
    } */

    showSuccessToast("Note Deleted Successfully");
    /* document.querySelector(`div[data-id="${noteId}"]`).remove(); */
  }

  generateNoteTemplate(
    { _id, title, content, priority },
    priorityColorMap,
    month,
    day
  ) {
    return `
        <div class="card ${priorityColorMap[1]} ${priorityColorMap[2]} border-success-subtle me-4 mb-4" data-click="card" style="width: 18rem;" data-id="${_id}">
       
          <!--<img src="..." class="card-img-top" alt="..."> -->
          <div class="card-body" data-click="card">
            <div class="d-flex justify-content-between">
              <h3 class="card-title text-body-secondary">${title}</h3>
              <button type="button" data-click="button" class="btn-close show-close-btn"  aria-label="Close"></button>
            </div>
            <p class="card-text text-body-secondary">${content}</p>
           
            <span class="badge ${priorityColorMap[0]} me-2">
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
