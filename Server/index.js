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

app.post("/newTask", async (req, res) => {});
app.post("/loginUser", async (req, res) => {
  console.log(req.body);
});

app.delete("/deleteNote", async (req, res) => {});

app.post("/getNote", async (req, res) => {});

app.patch("/updateNote", async (req, res) => {}); */

app.listen("3000", () => {
  console.log("Listening on port 3000");
});
