import { Note } from "../model.js";

class Modal {
  #parentElement = document.querySelector(".task_card_container");

  addDisplayModalHandler(handler) {
    this.renderModal();
  }

  addHandlerCloseModal(handler) {
    this.#parentElement.addEventListener("click", (e) => {
      let target = e.target?.id;
      let parentEle;

      if (target === undefined || target === "" || target === null) {
        parentEle = null;
      } else if (target === "close_modal_span") {
        parentEle = e.target.closest(".modal");
      }

      if (!parentEle) return;
      handler(parentEle);
    });
  }
  renderModal() {
    let note = Note.currentNote.note;

    let priority = note.Upriority == 3 ? "Low" : 2 ? "Medium" : "High";

    let modal = `
  <div class="modal">
    <div class='modal-container'>
    <div class="modal-content">
      <header> 
        <span class="close" id="close_modal_span">&times;</span>
        <div class="modal_priority_select_container ">
          <span class="material-symbols-outlined">
            priority_high
            </span> 
          <select  required aria-label="select priority" name="modal_task_priority" id="modal_task_priority">
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
            
          </select>
        </div>
      </header>
      <section>
        <p class="modal__note_title" contenteditable="true">
          <strong>
           ${note.Utitle}
          </strong>
         </p>

        <div class="modal_note_body"  contenteditable="true">
        ${note.Ubody}
        </div>
      </section>
      <footer>
        
      </footer>
    </div>
    </div>
   </div>
    `;

    this.#parentElement.insertAdjacentHTML("afterbegin", modal);
    document
      .querySelector(".modal")
      .querySelector("#modal_task_priority").selectedIndex = note.Upriority - 1;
  }
}

export default new Modal();
