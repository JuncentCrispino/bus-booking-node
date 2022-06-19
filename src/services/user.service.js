import ApiError from '../utils/ApiError.js';
import User from '../classes/User.js';
import httpStatus from 'http-status';

const user = new User();

export const createUser = async (newUser) => {
  const existUser = await user.findByEmail(newUser.email_address);
  if (existUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Email already exist');
  }
  await user.createUser(newUser);
  const createdUser = await user.findByEmail(newUser.email_address);
  delete createdUser.password;
  return createdUser;
};
