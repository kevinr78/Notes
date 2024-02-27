import { Note as noteData } from "../controllers/note.controller.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

export class Modal {
  modalElementId = "#modal";
  constructor(mtitle, mText, mPriority, noteId) {
    this.modal = new bootstrap.Modal(this.modalElementId);
    this.modalElementBody = this.modal._element;
    this.title = mtitle;
    this.body = mText;
    this.priority = mPriority || "";
    this.noteId = noteId || "";
  }

  get modal() {
    return this._modal;
  }

  set modal(value) {
    this._modal = new bootstrap.Modal(this.modalElementId);
  }

  get noteId() {
    return this._id;
  }

  set noteId(value) {
    this._id = value;
  }

  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }

  get body() {
    return this._body;
  }

  set body(value) {
    this._body = value;
  }

  get priority() {
    return this._priority;
  }

  set priority(value) {
    this._priority = value.toString().trim();
  }

  ModalElement() {
    return this._modal;
  }
  /*  get modalElementBody() {
    return this.modalElementBody;
  }

  set modalElementBody(value) {
    this._modalElementBody = this._modal._element;
  } */

  showModal() {
    let titleElement, bodyElement, priorityElement;

    titleElement = this.modalElementBody.querySelector("#modal-note-title");
    bodyElement = this.modalElementBody.querySelector("#modal-note-text");
    priorityElement = this.modalElementBody.querySelector(
      "#modal-note-priority"
    );

    console.log(this.priority);
    titleElement.value = this.title;
    bodyElement.innerText = this.body;
    priorityElement.value = this.priority;

    this.modal.show();
  }

  updateNote() {}

  closeModal() {
    this.modal.hide();
  }
}
