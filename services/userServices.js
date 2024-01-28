const User = require("../models/userModel");
const auth = require("../utils/jwtUtils");
exports.createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

exports.getUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user || !(await auth.comparePassword(password, user.password))) {
    return { data: { message: "Invalid credentials" }, status: 404 };
  }
  const hashedPassword = await auth.hashPassword(password);

  // Generate a JWT token
  const jwt = { username, hashedPassword };
  const token = await auth.generateToken(jwt);
  await User.updateOne(
    { username },
    { $set: { password: hashedPassword, jwt: token } }
  );
  return { data: { username, jwt: token }, status: 200 };
};
