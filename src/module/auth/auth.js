const bcrypt = require('bcrypt');
const AuthSQLModel = require('./auth.sql.model');
const validation = require('../../utils/validation');
const Exception = require('../../helpers/exception');
const JWT = require('../../utils/jwt');
const { logger } = require('../../helpers/logger');

class Auth {
  async signup(req, res) {
    try {
      const { username, password, confirmPassword } = req.body;
      if (!username || !validation.isEmailId(username)) {
        throw new Exception('ValidationError', 'Invalid username');
      }

      if (!password || !validation.isString(password)) {
        throw new Exception('ValidationError', 'Invalid password');
      }

      if (!confirmPassword || !validation.isString(confirmPassword)) {
        throw new Exception('ValidationError', 'Invalid confirm password');
      }

      if (confirmPassword !== password) {
        throw new Exception('ValidationError', 'password does not matched!!');
      }

      const userExists = await AuthSQLModel.getUser({ username });
      if (userExists && !validation.isEmpty(userExists)) {
        throw new Exception('AlreadyObjectExistsError', 'user aleady exists!!');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { id } = await AuthSQLModel.addUser({ username, password: hashedPassword, salt });

      const accessToken = JWT.generatAccessToken({ payload: { id, username } });
      const refreshToken = JWT.generateRefreshToken({ payload: { id, username } });

      const data = {
        user: {
          id,
          username,
        },
        accessToken,
        refreshToken,
      };
      res.sendResponse({ data });
    } catch (error) {
      res.sendError({ error: Exception.getExcetion(error, 'error while singup.') });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !validation.isEmailId(username)) {
        throw new Exception('ValidationError', 'Invalid username');
      }

      if (!password || !validation.isString(password)) {
        throw new Exception('ValidationError', 'Invalid password');
      }

      const userExists = await AuthSQLModel.getUser({ username });
      console.log(userExists)
      if (!userExists || validation.isEmpty(userExists)) {
        throw new Exception('ObjectNotFoundError', 'Invalid username or password.');
      }

      const isValid = await bcrypt.compare(password, userExists.password);

      if (!isValid) {
        throw new Exception('ValidationError', 'Invalid username or password.');
      }
      const accessToken = JWT.generatAccessToken({ payload: { id: userExists.id, username } });
      const refreshToken = JWT.generateRefreshToken({ payload: { id: userExists.id, username } });

      if (process.env.NODE_ENV !== 'local') {
        logger.info(`${userExists.id}_${username}`);
        // await global.redisConnection.set(`${userExists.id}_${username}`, refreshToken);
        // const data = await global.redisConnection.get(`${userExists.id}_${username}`);
        // logger.info(data);
      }

      const data = {
        user: {
          id: userExists.id,
          username,
        },
        accessToken,
        refreshToken,
      };
      res.sendResponse({ data });
    } catch (error) {
      res.sendError({ error: Exception.getExcetion(error, 'error while login.') });
    }
  }

  async refreshAccessToken(req, res) {
    try {
      const { refreshToken } = req.body;

      const decoded = JWT.verifyRefreshToken({ token: refreshToken });

      if (!decoded || validation.isEmpty(decoded)) {
        throw new Exception('Unauthorized', 'Refresh Token Invalid');
      }

      const { id, username } = decoded;
      const accessToken = JWT.generatAccessToken({ payload: { id, username } });
      res.sendResponse({ data: { accessToken } });
    } catch (error) {
      res.sendError({ error: Exception.getExcetion(error, 'error while refreshing access token.') });
    }
  }
}

module.exports = new Auth();
