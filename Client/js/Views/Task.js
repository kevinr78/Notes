import { Note as noteData } from "../model.js";

class NoteView {
  _parentElement = document.querySelector(".task_card_container");

  /* constructor(title, body, date, priority) {
    this.title = title;
    this.body = body;
    this.date = date;
    this.priority = priority;
  } */
  addHandlerRemoveCard(handler) {
    document
      .querySelector(".task_card_container")
      .addEventListener("click", (e) => {
        let ele = e.target.closest("span");
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
        <div class="task_card" data-id=${objectId}>
                <div class="task_card_header" >
                  <p id="task_card_header_text">${title}</p>
                  <span class="material-symbols-outlined" id="delete_card_button" data-id=${objectId} role="button">disabled_by_default</span>
                </div>
                <div class="task_card_body">
                  <div class="task_card_body_content">
                  ${body}
                  </div>
                </div>
                <div class="card_metadata">
                  <p class="card_metadata_body ${badgeColor}">
                    <span class="material-symbols-outlined">
                      priority_high
                    </span> 
                    <span class="card_metadata_priority">${
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
