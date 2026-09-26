import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../utils/config.js";
import UnauthorizedError from '../errors/UnauthorizedError.js';


export default (req, res, next) => {
    const { authorization } = req.headers;
    

    if (!authorization || !authorization.startsWith( 'Bearer ')) {
        return next(new UnauthorizedError('Authorization required'));
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try{
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return next(new UnauthorizedError('Authorization required'));
    }
    req.user = { _id: payload._id };
   
    return next();
};