const errorTypes = require('./errorTypes');
const logger = require('./logger');

class Exception extends Error {
  constructor(name, message) {
    super(message);
    this.name = Object.prototype.hasOwnProperty.call(errorTypes, name) ? name : errorTypes.UnknownError.name;
    this.status = errorTypes[this.name].status;
    this.message = message;
  }

  // eslint-disable-next-line default-param-last
  static getExcetion(error = new Error(), message, errorCode = '') {
    try {
      const { name } = error;
      // eslint-disable-next-line no-prototype-builtins
      if (errorTypes.hasOwnProperty(name)) {
        return {
          name: error.name,
          message: error.message,
          status: errorCode || error.status,
        };
      }

      Exception.handleError(error);
      throw new Exception(error.name, message);
    } catch (e) {
      return {
        name: e.name,
        message: e.message,
        status: errorCode || e.status,
      };
    }
  }

  static handleError(error) {
    logger.error(error);
  }
}
module.exports = Exception;
