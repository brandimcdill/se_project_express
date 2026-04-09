// eslint-disable-next-line import/prefer-default-export
export const ERROR_TYPES = {
  BAD_REQUEST: { statusCode: 400, message: 'Invalid data' },
  UNAUTHORIZED: { statusCode: 401, message: 'Unauthorized access' },
  FORBIDDEN: { statusCode: 403, message: 'Access forbidden' },
  NOT_FOUND: { statusCode: 404, message: 'Resource not found' },
  DUPLICATE_LOGIN: {statusCode: 409, message: 'Email or Password already in use'},
  INTERNAL_SERVER_ERROR: { statusCode: 500, message: 'An error has occurred on the server' }
};
