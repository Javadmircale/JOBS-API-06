const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Email");
  }
  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    throw new UnauthenticatedError("Invalid password");
  }
  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({ token, name: user.name });
};
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    token,
    user: {
      name: user.name,
    },
  });
};
module.exports = { login, register };
