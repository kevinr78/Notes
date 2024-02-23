const jwt = require("jsonwebtoken");

const verifyjwt = (req, res, next) => {
  let token, err;
  try {
    token = req.header("Authorization").split(" ")[1];

    let verifiedtoken = jwt.verify(token, process.env.SECRET_TOKEN);

    if (!verifiedtoken) {
      err = new Error("Not Authorized");
      err.status = 401;
      err.ok = false;
      throw err;
    }
    req.currentuser = verifiedtoken;
    next();
  } catch (error) {
    next(err);
  }
};

module.exports = { verifyjwt };
