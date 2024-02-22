const { default: mongoose, Schema } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: String,
    content: String,
    priority: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
