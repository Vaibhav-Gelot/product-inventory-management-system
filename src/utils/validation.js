const lodash = require('lodash');
const { EMAILID_REGEX_PATTERN } = require('./constants');

class Validation {
  isEmailId(emailId) {
    try {
      const regexPattern = new RegExp(EMAILID_REGEX_PATTERN, 'gm');
      return regexPattern.test(emailId);
    } catch (error) {
      return false;
    }
  }

  isString(str) {
    try {
      return lodash.isString((str && str.trim()) || str);
    } catch (error) {
      return false;
    }
  }

  isNumber(number) {
    try {
      return lodash.isNumber(Number(number));
    } catch (error) {
      return false;
    }
  }

  isEmpty(obj) {
    try {
      return lodash.isEmpty(obj);
    } catch (error) {
      return true;
    }
  }
}
module.exports = new Validation();
