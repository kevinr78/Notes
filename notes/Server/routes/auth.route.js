const router = require("express").Router();
const { loginUser, signUpUser } = require("../controllers/auth");

router.post("/login", loginUser);
router.post("/signUp", signUpUser);

module.exports = router;
