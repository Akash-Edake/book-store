const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (user) => {
  const payload = { user };
  const secret = "solt code";
  const options = { expiresIn: "4h" };

  return jwt.sign(payload, secret, options);
};

const verifyToken = (token) => {
  const secret = "solt code";

  return jwt.verify(token, secret);
};

const hashPassword = async (password) => {
  const saltRounds = 8;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports= { generateToken, verifyToken, hashPassword, comparePassword };
