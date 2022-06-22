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

export const updateUserDetails = async (user_id, userUpdate) => {
  const existUser = await user.findById(user_id);
  if (!existUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.updateUser(user_id, userUpdate);
  let updateUser = await user.findById(user_id);
  return updateUser;
};

export const userStatus = async (user_id, status) => {
  const existUser = await user.findById(user_id);
  if (!existUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.updateUserStatus(user_id, status);
  return ({ message: 'successfully update user status.' });
};