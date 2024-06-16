module.exports = {
  ValidationError: {
    name: 'ValidationError',
    status: 400,
  },
  Unauthorized: {
    name: 'Unauthorized',
    status: 401,
  },
  Forbidden: {
    name: 'Forbidden',
    status: 403,
  },
  ObjectNotFoundError: {
    name: 'ObjectNotFoundError',
    status: 404,
  },

  AlreadyObjectExistsError: {
    name: 'AlreadyObjectExistsError',
    status: 409,
  },
  UnknownError: {
    name: 'UnknownError',
    status: 501,
  },
};
