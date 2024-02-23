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
