const logger = require('../helpers/logger');

const responseBuilder = (req, res, next) => {
  res.sendResponse = ({ data }) => {
    const resJson = { success: true, data };
    logger.info(`${req.method} ${req.originalUrl} : ${JSON.stringify(resJson)}`);
    res.status(200).json(resJson);
  };

  res.sendError = ({ error }) => {
    const resJson = { success: false, error };
    logger.error(`${req.method} ${req.originalUrl} : ${JSON.stringify(resJson)}`);
    res.status(error.status || 500).json(resJson);
  };

  next();
};

module.exports = responseBuilder;
