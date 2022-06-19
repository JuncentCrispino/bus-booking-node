import httpStatus from 'http-status';
import { loginUser } from '../services/auth.service.js';
import catchAsync from '../utils/catchAsync.js';

export const login = catchAsync(async (req, res) => {
  const { email_address, password } = req.body;
  console.log(req.body);
  const user = await loginUser(email_address, password);
  return res.status(httpStatus.OK).json(user);
});