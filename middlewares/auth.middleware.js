const jwt = require("jsonwebtoken");
module.exports.requireAuth = async function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(401).json({ msg: "Missing token" }); // fail fast technique
  try {
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (payload.exp < Date.now()) {
      return res.status(401).json({ msg: "Token expired" });
    }
    req.tokenPayload = payload;
    next();
  } catch (e) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
