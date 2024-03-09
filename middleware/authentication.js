const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new BadRequestError("no token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = { name: decoded.name, userId: decoded.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Unauthorized to access this route");
  }
};
module.exports = authMiddleware;
