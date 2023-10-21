const { default: mongoose, Schema } = require("mongoose");

const NoteSchema = new Schema({
  Utitle: String,
  Ubody: String,
  createdBy: String,
  Upriority: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", NoteSchema);
