const statusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

const statusResponse = {
  BAD_REQUEST: 'Bad Request',
  NOT_FOUND: 'Not found',
  CONFLICT: 'Conflict',
  CREATED: 'Created',
  NO_CONTENT: 'No Content',
  UNAUTHORIZED: 'Unauthorized',
  UNPROCESSABLE_ENTITY: 'Unprocessable Entity',
  INTERNAL_SERVER_ERROR: 'Unexpected error. Please try again',
};

module.exports = {
  statusCode,
  statusResponse,
};
