import httpStatus from 'http-status';
import { createUser } from '../services/user.service.js';
import catchAsync from '../utils/catchAsync.js';

export const registerUser = catchAsync(async (req, res) => {
  const newUser = await createUser(req.body);
  return res.status(httpStatus.CREATED).json(newUser);
});
