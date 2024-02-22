export const Note = {
  currentNote: null,
  
};

export const user = {
  currentUser: null,
  lastLogin: null,
};

const note_title = document.getElementById("note_title");
const note_content = document.getElementById("note_content");
const note_priority = document.getElementById("note_priority");
/* Bug to be fixed, throw error if values are null, since function continues executing */
export function createNewNote() {
  let tempNote = Object.create({});

  if (
    note_title.value == "" ||
    note_content.value == "" ||
    note_priority.value == ""
  ) {
    alert("Please fill all the details");
    return;
  }
  tempNote["id"] = Note.noteCount + 1;
  tempNote["title"] = note_title.value.trim() || null;
  tempNote["content"] = note_content.value.trim();
  tempNote["priority"] = note_priority.value.trim();

  Note.currentNote = tempNote
  
}

export function updateNoteId(note) {
  let findNote = Note.noteList.find((item) => {
    return item.id === Note.currentNote.id;
  });
  findNote.objectId = note.note._id;
  Note.currentNote["objectId"] = note.note._id;
}
/* 
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
} */
