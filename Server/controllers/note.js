const trimData = require("../helper");

const Note = require("../model/noteModel");
async function getUserNote(req, res) {
  let noteId = req.body.id.trim();

  try {
    let note = await Note.findById({ _id: noteId });
    if (!note) {
      throw new Error("Error while fetching note");
    }
    note.Utitle = note.Utitle.trim();
    note.Ubody = note.Ubody.trim();
    note.Upriority = note.Upriority.toString().trim();

    res.json({
      note,
      ok: true,
    });
  } catch (error) {
    res.json({
      error,
      ok: false,
    });
  }
}

async function createUserNote(req, res, next) {
  let cleanedData = trimData(req.body);
  let newNote = new Note(cleanedData);
  try {
    const note = await newNote.save();

    if (!note) {
      throw new Error("Error while saving Note!");
    }
    res.json({
      note,
      message: "Note created successfully!",
      ok: true,
    });
  } catch (error) {
    next(error);
  }
}

async function updateUserNote(req, res) {
  try {
    let filtered = Object.entries(req.body).filter(([key, value]) => {
      return key !== "_id" || key !== "createdAt" || key !== "__v";
    });
    console.log("Filtered", filtered);
    let updatedNote = await Note.findByIdAndUpdate(noteId, {});
  } catch (error) {}
}

async function deleteUserNote(req, res) {
  let noteId = req.body.id.trim();

  try {
    let deletedNote = await Note.findByIdAndDelete({ _id: noteId });
    if (!deletedNote) {
      throw new Error("Error while deleting note");
    }

    res.json({
      deletedNote,
      ok: true,
    });
  } catch (error) {
    res.json({
      error,
      ok: false,
    });
  }
}

module.exports = {
  getUserNote,
  createUserNote,
  updateUserNote,
  deleteUserNote,
};
