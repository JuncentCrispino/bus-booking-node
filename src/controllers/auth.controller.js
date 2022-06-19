import httpStatus from 'http-status';
import { loginCustomer, loginUser } from '../services/auth.service.js';
import catchAsync from '../utils/catchAsync.js';

export const userLogin = catchAsync(async (req, res) => {
  const { email_address, password } = req.body;
  const user = await loginUser(email_address, password);
  return res.status(httpStatus.OK).json(user);
});

export const customerLogin = catchAsync(async (req, res) => {
  const { customer_email_address, password } = req.body;
  const customer = await loginCustomer(customer_email_address, password);
  return res.status(httpStatus.OK).json(customer);
});