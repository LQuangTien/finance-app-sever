const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Response = require("../helpers/response.helper");
const User = require("../models/user.model");
module.exports.register = async (req, res) => {
  const { name, password, confirmPassword } = req.body;
  console.log(name, password, confirmPassword);
  const user = await User.findOne({ name: name });
  if (user) {
    return Response.error(res, { message: "Username has been used" }, 403);
  }
  if(password !== confirmPassword) {
    return Response.error(res, { message: "Password not matched" }, 403);
  }
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({ name, password: hashPassword });
  await newUser.save();
  return Response.success(res, { newUser }, 201);
};
module.exports.login = async (req, res) => {
  const { name, password } = req.body;
  console.log(name);
  const user = await User.findOne({ name: name });
  if (!user) {
    return Response.error(res, { message: "User name does not exist" }, 403);
  }
  const isPasswordCorrect = await bcrypt.compare(password + "", user.password);
  if (!isPasswordCorrect) {
    return Response.error(res, { message: "Wrong password" }, 403);
  }
  const payload = {
    name: user.name,
    userId: user._id,
    exp: Date.now() + 60 * 10 * 1000 * 10
  };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  return Response.success(res, { accessToken }, 201);
};
