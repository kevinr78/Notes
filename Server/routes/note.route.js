const router = require("express").Router();
const {
  getUserNotes,
  createUserNote,
  updateUserNote,
  deleteUserNote,
} = require("../controllers/note");
const { verifyjwt, hasJWTExpired } = require("../utils/JWT.js");
/* post -->/getNote ,/newTask, patch--> /updateNote , delete --> /deleteNote */

router.get("/getNotes", verifyjwt, hasJWTExpired, getUserNotes);
router.post("/newNote", verifyjwt, createUserNote);
router.post("/updateNote", verifyjwt, updateUserNote);
router.delete("/deleteNote", verifyjwt, deleteUserNote);

module.exports = router;
