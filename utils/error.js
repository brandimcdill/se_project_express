const ERROR_TYPES = {
  BAD_REQUEST: { statusCode: 400, message: 'BAD_REQUEST' },
  UNAUTHORIZED: { statusCode: 401, message: 'UNAUTHORIZED' },
  FORBIDDEN: { statusCode: 403, message: 'FORBIDDEN' },
  NOT_FOUND: { statusCode: 404, message: 'NOT_FOUND' },
  INTERNAL_SERVER_ERROR: { statusCode: 500, message: 'INTERNAL_SERVER_ERROR' }
};

module.exports = { ERROR_TYPES };