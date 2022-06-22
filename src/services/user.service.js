import ApiError from '../utils/ApiError.js';
import User from '../classes/User.js';
import httpStatus from 'http-status';
import UserPermission from '../classes/UserPermission.js';

export const createUser = async (trx, { newUser, userPermissions }) => {
  const user = new User(trx);
  const permission = new UserPermission(trx);
  const existUser = await user.findByEmail(newUser.email_address);
  if (existUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Email already exist');
  }
  await user.createUser(newUser);
  const createdUser = await user.findByEmail(newUser.email_address);
  (userPermissions.length > 0) && await permission.createUserPermission(createdUser.user_id, userPermissions);
  delete createdUser.password;
  await trx.commit();
  return createdUser;
};

export const updateUserDetails = async (trx, user_id, { userUpdate, userPermissions }) => {
  const user = new User(trx);
  const permission = new UserPermission(trx);
  const existUser = await user.findById(user_id);
  if (!existUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.updateUser(user_id, userUpdate),
  (userPermissions.length > 0) && await permission.updateUserPermission(user_id, userPermissions);
  await trx.commit();
  let updatedUser = await user.findById(user_id);
  return updatedUser;
};

export const userStatus = async (user_id, status) => {
  const user = new User();
  const existUser = await user.findById(user_id);
  if (!existUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.updateUserStatus(user_id, status);
  return ({ message: 'successfully update user status.' });
};