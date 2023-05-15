const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "JWT EXPIRED" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Not authorized" });
  }
};
