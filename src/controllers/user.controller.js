import httpStatus from 'http-status';
import { createUser, updateUserDetails, userStatus } from '../services/user.service.js';
import catchAsync from '../utils/catchAsync.js';

export const registerUser = catchAsync(async (req, res) => {
  const newUser = await createUser(req.body);
  return res.status(httpStatus.CREATED).json(newUser);
});

export const updateUser = catchAsync(async (req, res) => {
  const updatedUser = await updateUserDetails(req.params.user_id, req.body);
  return res.status(httpStatus.OK).json(updatedUser);
});

export const updateUserStatus = catchAsync(async (req, res) => {
  const update = await userStatus(req.params.user_id, req.body.status);
  return res.status(httpStatus.OK).json(update);
});