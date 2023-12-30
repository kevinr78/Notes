const router = require("express").Router();
const { loginUser, signUpUser } = require("../controllers/auth");

router.route("/login").post(loginUser);
router.route("/signUp").post(signUpUser);

module.exports = router;
