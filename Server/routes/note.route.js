const router = require("express").Router();
const {
  getUserNotes,
  createUserNote,
  updateUserNote,
  deleteUserNote,
} = require("../controllers/note");
const { verifyjwt } = require("../utils/verifyJWT");
/* post -->/getNote ,/newTask, patch--> /updateNote , delete --> /deleteNote */

router.get("/getNotes", verifyjwt, getUserNotes);
router.post("/newNote", verifyjwt, createUserNote);
router.patch("/updateNote", verifyjwt, updateUserNote);
router.delete("/deleteNote", verifyjwt, deleteUserNote);

module.exports = router;
