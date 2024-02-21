import { Note as noteData } from "../model.js";

class NoteView {
  _parentElement = document.querySelector(".task_card_container");

  addHandlerNoteActions(showModal, removeNote) {
    this._parentElement.addEventListener("click", (e) => {
      let target = e.target?.id;
      let parentEle;

      if (target === undefined || target === "" || target === null) {
        parentEle = e.target.closest(".task_card");
      } else if (target === "delete_card_button") {
        parentEle = e.target.closest("#delete_card_button");
      }

      if (!parentEle) return;

      const action = parentEle.dataset.action;

      switch (action) {
        case "open_modal":
          e.stopPropagation();
          showModal(parentEle);
          break;
        case "close":
          e.stopPropagation();
          removeNote(parentEle);
          break;
      }
    });
  }

  detectNoteChange(handler) {
    document
      .querySelector(".task_card_container")
      .addEventListener("keyup", (e) => {
        let ele = e.target.closest("div");
        if (!ele) return;
        handler(ele);
      });
  }

  renderUI() {
    let badgeColor =
      noteData.currentNote.priority === "1"
        ? "text-bg-danger"
        : noteData.currentNote.priority === "2"
        ? "text-bg-warning"
        : "text-bg-success";
    let template = this.#generateNoteTemplate(noteData.currentNote, badgeColor);
    this._parentElement.insertAdjacentHTML("beforeend", template);

    this.clearTaskModal();
  }
  removeNotefromView(note) {
    document.querySelector(`div[data-id="${note.objectId}"]`).remove();
  }

  #generateNoteTemplate({ id, title, body, priority, objectId }, badgeColor) {
    return `
        <div class="task_card"  data-id="${objectId}" data-action="open_modal">
                <div class="task_card_header">
                  <p id="task_card_header_text" name="Utitle">${title.trim()}    </p>
                  <span class="material-symbols-outlined" id="delete_card_button" data-id=${objectId} data-action="close" role="button">disabled_by_default</span>
                </div>
                <div class="task_card_body">
                  <div class="task_card_body_content" name="Ubody" >
                  ${body.trim()}
                  </div>
                </div>
                <div class="card_metadata">
                  <p class="card_metadata_body ${badgeColor}">
                    <span class="material-symbols-outlined">
                      priority_high
                    </span> 
                    <span class="card_metadata_priority" name="Upriority ">${
                      priority === "1"
                        ? "High"
                        : priority === "2"
                        ? "Medium"
                        : "Low"
                    }</span>
                  </p>
                  <p class="card_metadata_body text-bg-secondary">
                    <span class="material-symbols-outlined">
                      schedule
                      </span>
                    <span class="card_metadata_date"> ${new Date().toLocaleDateString()}</span>
                  </p>
                </div>
              </div>`;
  }

  clearTaskModal() {
    task_title.value = "";
    task_body.value = "";
    task_priority.value = "3";
  }
}

export default new NoteView();
