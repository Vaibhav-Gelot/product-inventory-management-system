const errorTypes = require('./errorTypes');

('');
class Exception extends Error {
  constructor(name, message) {
    super(message);
    this.name = errorTypes.hasOwnProperty(name) ? name : errorTypes.UnknownError.name;
    this.status = errorTypes[this.name].status;
    this.message = message;
  }

  // eslint-disable-next-line default-param-last
  static getExcetion(error = new Error(), message) {
    try {
      const { name } = error;
      // eslint-disable-next-line no-prototype-builtins
      if (errorTypes.hasOwnProperty(name)) {
        return {
          name: error.name,
          message: error.message,
          status: error.status,
        };
      }

      Exception.handleError(error);
      throw new Exception(error.name, message);
    } catch (e) {
      return {
        name: e.name,
        message: e.message,
        status: e.status,
      };
    }
  }

  static handleError(error) {
    console.error(error);
  }
}
module.exports = Exception;