module.exports.success = (res, data, status = 200) => {
  return res.status(status).json({
    success: true,
    ...data
  });
};
module.exports.error = (res, err, status = 400) => {
  return res.status(status).json({
    success: false,
    error: {
      message: err.message,
      type: err.type,
      errors: err.errors
    }
  });
};
