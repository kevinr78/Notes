const router = require("express").Router();
const {
  getUserNote,
  createUserNote,
  updateUserNote,
  deleteUserNote,
} = require("../controllers/note");
/* post -->/getNote ,/newTask, patch--> /updateNote , delete --> /deleteNote */

router.route("/getNote").post(getUserNote);
router.route("/newNote").post(createUserNote);
router.route("/updateNote").patch(updateUserNote);
router.route("/deleteNote").delete(deleteUserNote);

module.exports = router;
