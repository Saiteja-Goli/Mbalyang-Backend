const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    res.json({ Message: "Something Went Wrong" });
  }
  const token = req.headers.authorization?.split(" ")[1];

  jwt.verify(token, process.env.TOKEN, function (err, decoded) {
    if (err) {
      res.json({ Message: "Login Failure" });
    }
    req.body.userId = decoded.userId;
    next();
  });
};

module.exports = { authentication };
