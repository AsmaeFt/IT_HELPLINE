const jwt = require("jsonwebtoken");
const User = require("../models/users");

//check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "No authorization header, authentication denied" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

//check if user is root
exports.isRoot = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== "root") {
      return res.status(403).json({ error: "OoPS ~~ Access denied ^-^!" });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//check if adminIT
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "adminIT") {
      return res.status(403).json({ error: "OoPS ~~ Access denied ^-^!" });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
