const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const { User } = require("../models/user");

exports.middlewareLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be looged in" });
  }
  const token = authorization.replace("Bearer ","");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be looged in" });
    }
    const { _id } = payload;
    User.findById(_id).then((userData) => {
      req.user = userData;
      next();
    });
    
  });
};

