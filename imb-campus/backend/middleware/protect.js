const { keycloak } = require("../utils");
const { isJWTValid, getUserData } = keycloak;

const protect = async (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(403).json({ error: "No authorization header found" });
  }

  const token = header.split(" ")[1];

  if (!(await isJWTValid(token))) {
    return res.status(403).json({ error: "Invalid token" });
  }
  req.token = token;
  req.user = getUserData(token);

  next();
};

module.exports = protect;
