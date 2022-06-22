import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import ApiError from '../utils/ApiError.js';

export const verifyJwt = (req, res, next) => {
  let token = req.headers.authorization;
  if (typeof token !== 'undefined') {
    token = token.slice(7, token.length);
    return jwt.verify(token, config.jwt.secret, (err) => {
      if (err) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Authorization failed.');
      }
      next();
    });
  }
  throw new ApiError(httpStatus.UNAUTHORIZED, 'Authorization failed.');
};

export const decodeJwt = (token) => {
  if (typeof token !== 'undefined') {
    token = token.slice(7, token.length);
    return jwt.verify(token, config.jwt.secret, (err) => {
      if (err) {
        return null;
      } else {
        return jwt.decode(token, { complete: true }).payload;
      }
    });
  } else {
    return null;
  }
};