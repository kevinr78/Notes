const { default: mongoose, Schema } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    priority: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
