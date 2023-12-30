export const Note = {
  currentNote: null,
  noteList: [],
  noteCount: 0,
  lastNoteEdited: null,
};

export const user = {
  currentUser: null,
  lastLogin: null,
};

const task_title = document.getElementById("task_title");
const task_body = document.getElementById("task_body");
const task_priority = document.getElementById("task_priority");

export function createNewNote() {
  let tempNote = Object.create({});

  if (
    task_title.textContent == "" ||
    task_body.textContent == "" ||
    task_priority.value == ""
  ) {
    alert("Please fill all the details");
    return;
  }
  tempNote["id"] = Note.noteCount + 1;
  tempNote["title"] = task_title.textContent.trim() || null;
  tempNote["body"] = task_body.textContent.trim();
  tempNote["priority"] = task_priority.value.trim();

  /*  tempTask["create_date"] = task_due_date.value; */

  Note.noteList.push(tempNote);
  Note.currentNote = tempNote;
  Note.noteCount++;
}

export function updateNoteId(note) {
  let findNote = Note.noteList.find((item) => {
    return item.id === Note.currentNote.id;
  });
  findNote.objectId = note.note._id;
  Note.currentNote["objectId"] = note.note._id;
}

export function deleteNoteFromLocal({ deletedNote }) {
  let noteList = Note.noteList;
  let noteTobeDeleted = noteList.find((note, idx) => {
    return note.objectId === deletedNote._id;
  });

  noteList.splice(
    noteList.findIndex((note) => note.objectId === deletedNote._id),
    1
  );

  return noteTobeDeleted;
}
