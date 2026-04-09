import jwt from 'jsonwebtoken';
import { ERROR_TYPES } from "../utils/error";
import { JWT_SECRET } from "../utils/config";

const handleAuthError = (res) => res
  .status(ERROR_TYPES.UNAUTHORIZED.statusCode)
  .send({ message: ERROR_TYPES.UNAUTHORIZED.message });

const extractBearerToken = (header) => header.slice(7).trim();

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
    return next();
};