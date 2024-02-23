const trimData = require("../helper");
const mongoose = require("mongoose");
const Note = require("../model/noteModel");
async function getUserNotes(req, res, next) {
  debugger;
  try {
    let notes = await Note.find({
      createdBy: req.currentuser.id,
    }).select("content priority title _id ");
    if (!notes) {
      err = new Error("Error while fetching notes");
      err.ok = 0;
      err.status = 404;
      throw err;
    }

    res.json({
      note: notes,
      ok: true,
    });
  } catch (error) {
    next(error);
  }
}

async function createUserNote(req, res, next) {
  debugger;
  let { title, content, priority } = trimData(req.body);
  let user = req.currentuser;
  let newNote = new Note({
    title,
    content,
    priority,
    createdBy: user.id,
  });
  try {
    const note = await newNote.save();
    console.log(note);
    if (!note) {
      err = new Error("Error while saving notes");
      err.ok = 0;
      err.status = 404;
      throw err;
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
  getUserNotes,
  createUserNote,
  updateUserNote,
  deleteUserNote,
};
