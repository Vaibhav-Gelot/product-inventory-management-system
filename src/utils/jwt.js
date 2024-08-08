const jwt = require('jsonwebtoken');

class JWT {
  static generatAccessToken({ payload, secret = process.env.JWT_ACCESS_TOKEN_SECRET, expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRESIN, algorithm = process.env.JWT_TOEKN_ENCRYPTION_ALGO }) {
    return jwt.sign(payload, secret, { algorithm, expiresIn });
  }

  static verifyAccessToken({ token, secret = process.env.JWT_ACCESS_TOKEN_SECRET, algorithm = process.env.JWT_TOEKN_ENCRYPTION_ALGO }) {
    try {
      const res = jwt.verify(token, secret, { algorithm });
      return res;
    } catch (error) {
      return null;
    }
  }

  static generateRefreshToken({ payload, secret = process.env.JWT_REFRESH_TOKEN_SECRET, expiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRESIN, algorithm = process.env.JWT_TOEKN_ENCRYPTION_ALGO }) {
    return jwt.sign(payload, secret, { algorithm, expiresIn });
  }

  static verifyRefreshToken({ token, secret = process.env.JWT_REFRESH_TOKEN_SECRET, algorithm = process.env.JWT_TOEKN_ENCRYPTION_ALGO }) {
    try {
      return jwt.verify(token, secret, { algorithm });
    } catch (error) {
      return null;
    }
  }
}
module.exports = JWT;
