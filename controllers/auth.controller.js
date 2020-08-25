const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/user.model");
module.exports.register = async (req, res, next) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name: name });
  if (user) {
    return res
      .status(403)
      .json({ success: false, msg: "Username has been used" });
  }
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({ name, password: hashPassword });
  await newUser.save();
  return res.status(201).json({ success: true, newUser });
};
module.exports.login = async (req, res, next) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name: name });
  if (!user) {
    return res
      .status(403)
      .json({ success: false, msg: "User name does not exist" });
  }
  const isPasswordCorrect = await bcrypt.compare(password + "", user.password);
  if (!isPasswordCorrect) {
    return res.status(403).json({ success: false, msg: "Wrong password" });
  }
  const payload = {
    name: user.name,
    exp: Date.now() + 60 * 10 * 1000 * 10
  };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  return res.status(201).json({ success: true, accessToken });
};
