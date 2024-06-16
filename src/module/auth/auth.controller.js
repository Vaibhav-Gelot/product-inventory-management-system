const express = require('express');

const auth = require('./auth');

const router = express.Router();

class AuthController {
  constructor(app) {
    router.post('/signup', auth.signup);
    router.post('/login', auth.login);
    router.post('/refresh-token', auth.refreshAccessToken);
    app.use('/api/v1/auth', router);
  }
}
module.exports = AuthController;
