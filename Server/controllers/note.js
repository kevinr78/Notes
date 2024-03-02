const trimData = require("../helper");
const mongoose = require("mongoose");
const Note = require("../model/noteModel");

async function getUserNotes(req, res, next) {
  debugger;
  try {
    let notes = await Note.find({
      createdBy: req.currentuser.id,
    }).select("content tags title _id ");
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
  let { title, content, tags } = req.body;
  let user = req.currentuser;
  let newNote = new Note({
    title,
    content,
    tags,
    createdBy: user.id,
  });
  try {
    const note = await newNote.save();

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
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
}

async function deleteUserNote(req, res) {
  let noteId = req.body.id.trim();

  try {
    let deletedNote = await Note.findByIdAndDelete({ _id: noteId });
    if (!deletedNote) {
      err = new Error("Error while saving notes");
      err.ok = 0;
      err.status = 404;
      throw err;
    }

    res.json({
      deletedNote,
      message: "Note deleted successfully",
      ok: true,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserNotes,
  createUserNote,
  updateUserNote,
  deleteUserNote,
};
