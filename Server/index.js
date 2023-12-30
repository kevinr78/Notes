const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const Note = require("./model/noteModel");
const connection = require("./Conn");
console.log("DB");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const noteRoute = require("./routes/note.route");
const authRoute = require("./routes/auth.route");
/* connection.ConnectDb(); */
/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods"
  );
  next();
}); */

app.use("/note", noteRoute);
app.use("/auth", authRoute);
/* app.get("/", (req, res) => {
  res.json("Hello");
});

app.post("/newTask", async (req, res) => {
  let cleanedData = trimData(req.body);
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

app.post("/getNote", async (req, res) => {
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
});

app.delete("/deleteTask", async (req, res) => {
  try {
    let note = await Note.deleteMany();
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
