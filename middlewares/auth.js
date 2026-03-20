const { ERROR_TYPES } = require("../utils/error");
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith( 'Bearer ')) {
        return res
        .status(ERROR_TYPES.UNAUTHORIZED.statusCode)
        .send({ message: ERROR_TYPES.UNAUTHORIZED.message });
    }

    const token = authorization.replace("Bearer ", "");
    let payload;

    try{
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        res
        .status(ERROR_TYPES.UNAUTHORIZED.statusCode)
        .send({ message: ERROR_TYPES.UNAUTHORIZED.message })
    }
    req.user = payload;
    next();
    
};