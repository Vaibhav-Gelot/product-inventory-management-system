const Exception = require('../helpers/exception');
const validation = require('../utils/validation');
const JWT = require('../utils/jwt');

function validateAccessToken(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization || !validation.isString(authorization)) {
      throw new Exception('Unauthorized', 'Access token is missing');
    }
    const token = authorization.split(' ')[1];

    if (!token || !validation.isString(token)) {
      throw new Exception('Unauthorized', 'Access token is missing');
    }

    const user = JWT.verifyAccessToken({token});
    if (!user || validation.isEmpty(user)) {
      throw new Exception('Forbidden', 'Invalid Token');
    }
    req.user = user;
    next();
  } catch (error) {
    res.sendError({ error: Exception.getExcetion(error, 'Invalid Token') });
  }
}

module.exports = validateAccessToken;
