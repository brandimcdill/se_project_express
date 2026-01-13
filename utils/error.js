module.exports = {
    error: [
        { statusCode: 400, message: 'BAD_REQUEST' },
        { statusCode: 401, message: 'UNAUTHORIZED' },
        { statusCode: 403, message: 'FORBIDDEN' },
        { statusCode: 404, message: 'NOT_FOUND' },
        { statusCode: 500, message: 'INTERNAL_SERVER_ERROR' }
    ]
};