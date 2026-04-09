import { ERROR_TYPES } from "../utils/error.js";
import { JWT_SECRET }  from "../utils/config.js";
import jwt from 'jsonwebtoken';

const handleAuthError = (res) => {
    res
    .status(ERROR_TYPES.UNAUTHORIZED.statusCode)
    .send({ message: ERROR_TYPES.UNAUTHORIZED.message });
};

const extractBearerToken = (header) => {
    return header.slice(7).trim();
};

export default (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith( 'Bearer ')) {
        return handleAuthError(res);
    }

    const token = extractBearerToken(authorization);
    let payload;

    try{
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return handleAuthError(res);
    }
    req.user = payload;
    next();
    
};