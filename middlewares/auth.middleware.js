const jwt = require("jsonwebtoken");
const Response = require("../helpers/response.helper");

module.exports.requireAuth = async function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) return Response.error(res, { message: "Missing token" }, 401);
  try {
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (payload.exp < Date.now()) {
      return Response.error(res, { message: "Token expired" }, 401);
    }
    req.tokenPayload = payload;
    next();
  } catch (e) {
    return Response.error(res, { message: "Invalid token" }, 401);
  }
};
