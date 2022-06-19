import ApiError from '../utils/ApiError.js';
import User from '../classes/User.js';
import Token from '../classes/Token.js';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';

const token = new Token();
const user = new User();

export const loginUser = async (email_address, password) => {
  const existUser = await user.findByEmail(email_address);
  if (!existUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Email and password does not match');
  }
  if (existUser.is_active === 0) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Disalbed user.');
  }
  const authPass = bcrypt.compareSync(password, existUser.password);
  if (!authPass) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email and password does not match');
  }
  delete existUser.password;
  const tokens = await token.generateAuthToken(existUser.user_id);
  return { existUser, tokens };
};