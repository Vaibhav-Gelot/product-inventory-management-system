const lodash = require('lodash');

class Validation {
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
