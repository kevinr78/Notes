const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const Note = require("./model/noteModel");
const connection = require("./Conn");
console.log("DB");
const cors = require("cors");
const cookie = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie());
/* app.use(cors()); */

/* connection.ConnectDb(); */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const noteRoute = require("./routes/note.route");
const authRoute = require("./routes/auth.route");

app.use("/note", noteRoute);
app.use("/auth", authRoute);

app.use((err, req, res, next) => {
  return res.status(err.status || 500).send({
    message: err.message || "Something went wrong",
    status: err.status || 500,
    ok: err.ok || 0,
  });
});

app.listen("3000", () => {
  console.log("Listening on port 3000");
});
