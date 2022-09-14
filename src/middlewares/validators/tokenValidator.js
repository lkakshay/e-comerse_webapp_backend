const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.JWT_KEY;

module.exports = (req, res, next) => {

  const token = req.headers.authorization.split(" ")[1];
  if (token === "undefined") {
    req.body.verifyStatus = false;
    return next();
  }

  try {
    const decoded = jwt.verify(token, key);
    req.body.user_id = decoded.data._id;
    req.body.verifyStatus = true;
    return next();
  } catch (error) {
    req.body.verifyStatus = false;
    return next();
  }
};
