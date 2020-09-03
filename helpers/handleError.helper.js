const { isCelebrate } = require("celebrate");
const Response = require("../helpers/response.helper");
const handleError = (err, req, res, next) => {
  if (isCelebrate(err)) {
    const { joi } = err;
    return Response.error(res, {
      type: joi.name,
      message: "Invalid request data",
      errors: joi.details.map((item) => {
        return {
          message: item.message.replace(/['"']/g, ""),
          type: item.type
        };
      })
    });
  }

  return Response.error({
    type: err.name,
    message: err.message
  });
};
module.exports = handleError;
