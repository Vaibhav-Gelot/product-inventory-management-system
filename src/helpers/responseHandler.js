const responseHandler = (req, res, next) => {
  res.sendResponse = ({ data }) =>
    res.status(200).json({
      success: true,
      data,
    });

  res.sendError = ({ error }) =>
    res.status(error.status || 500).json({
      success: false,
      error,
    });
  next();
};
module.exports = responseHandler;
