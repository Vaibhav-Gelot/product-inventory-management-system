// TODO Logging
const logger = require('./logger');

const requestHandler = (req, res, next) => {
  logger.log(`${req.method} ${req.url}`);
  next();
};

const responseHandler = (req, res, next) => {
  res.sendResponse = ({ data }) => {
    const resJson = { success: true, data };
    logger.log(`${req.method} ${req.originalUrl} : ${JSON.stringify(resJson)}`);
    res.status(200).json(resJson);
  };

  res.sendError = ({ error }) => {
    const resJson = { success: false, error };
    logger.error(`${req.method} ${req.originalUrl} : ${JSON.stringify(resJson)}`);
    res.status(error.status || 500).json(resJson);
  };

  next();
};
module.exports = { requestHandler, responseHandler };
