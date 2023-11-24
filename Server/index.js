const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const Note = require("./model/noteModel");
const connection = require("./Conn");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
connection.ConnectDb();
/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods"
  );
  next();
}); */
app.get("/", (req, res) => {
  res.json("Hello");
});

app.post("/newTask", async (req, res) => {
  let cleanedData = trimData(req.body);
  console.log(cleanedData);
  let newNote = new Note(cleanedData);
  try {
    const note = await newNote.save();
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
});

app.delete("/deleteNote", async (req, res) => {
  let noteId = req.body.id.trim();

  try {
    let deletedNote = await Note.findByIdAndDelete({ _id: noteId });
    if (!deletedNote) {
      throw new Error("Error while deleting note");
    }
    console.log("Deleted Note : ", deletedNote);
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
});
function trimData(Data) {
  const { id, title, body, priority } = Data;
  let Uid = Number(id.toString().trim());
  let Utitle = title.trim();
  let Ubody = body.trim();
  let Upriority = Number(priority.toString().trim());
  return { Uid, Utitle, Ubody, Upriority };
}
app.listen("3000", () => {
  console.log("Listening on port 3000");
});
