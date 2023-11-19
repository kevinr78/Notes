const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const Note = require("./model/noteModel");
const connection = require("./Conn");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* connection.ConnectDb(); */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
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
      note,
      ok: false,
    });
  }
});

app.delete("/removeTask", async (req, res) => {
  let id = req.query.id;
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
  console.log();
});
