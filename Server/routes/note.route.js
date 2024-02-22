const router = require("express").Router();
const {
  getUserNote,
  createUserNote,
  updateUserNote,
  deleteUserNote,
} = require("../controllers/note");
const {verifyjwt} =require('../utils/verifyJWT')
/* post -->/getNote ,/newTask, patch--> /updateNote , delete --> /deleteNote */

router.post("/getNote", verifyjwt ,getUserNote);
router.post("/newNote",verifyjwt ,  createUserNote);
router.patch("/updateNote",verifyjwt,updateUserNote);
router.delete("/deleteNote",verifyjwt,deleteUserNote);

module.exports = router;
