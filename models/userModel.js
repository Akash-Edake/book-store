const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true,unique: [true,"name already exist" ] },
  password: { type: String, required: true },
  jwt:{type:String}
});

const User = mongoose.model('User', userSchema);

module.exports = User;