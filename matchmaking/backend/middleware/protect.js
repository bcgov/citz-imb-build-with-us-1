const { isJWTValid } = require("../utils");

exports.protect = async (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(403).json({ error: "No authorization header found" });
  }

  const token = header.split(" ")[1];

  if (!(await isJWTValid(token))) {
    return res.status(403).json({ error: "Invalid token" });
  }
  req.token = token;

  next();
};
