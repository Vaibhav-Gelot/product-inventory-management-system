const logger = require('../helpers/logger');

const requestParser = (req, res, next) => {
  logger.log(`${req.method} ${req.url} : { params : ${JSON.stringify(req.params)}, query : ${JSON.stringify(req.query)}, body : ${JSON.stringify(req.body)}}`);
  next();
};

module.exports = requestParser;
