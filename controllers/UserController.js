const auth = require("../utils/jwtUtils");
const User = require("../models/userModel");
const { createUser, getUser } = require("../services/userServices");

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  // Your user registration logic here

  const hashedPassword = await auth.hashPassword(password);
  const user = { username, hashedPassword };

  // Generate a JWT token
  const token = auth.generateToken(user);
  try{

      const userSave = createUser({
        username,
        password: hashedPassword,
        jwt: token,
      });
    
      res.status(201).json(userSave);
  }catch(error){
    res.send(error)
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Your user login logic here

  const user = await getUser(username, password);

  res.send(user);
};

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = auth.verifyToken(token);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { registerUser, loginUser, authenticateUser };
