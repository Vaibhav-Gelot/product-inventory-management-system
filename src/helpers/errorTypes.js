module.exports = {
  ValidationError: {
    name: 'ValidationError',
    status: 400,
  },
  ObjectNotFoundError: {
    name: 'ObjectNotFoundError',
    status: 404,
  },

  AlreadyObjectExistsError: {
    name: 'AlreadyObjectExistsError',
    status: 403,
  },
  UnknownError: {
    name: 'UnknownError',
    status: 501,
  },
};
