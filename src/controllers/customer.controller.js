import httpStatus from 'http-status';
import { createCustomer } from '../services/customer.service.js';
import catchAsync from '../utils/catchAsync.js';

export const registerCustomer = catchAsync(async (req, res) => {
  const newCustomer = await createCustomer(req.body);
  return res.status(httpStatus.CREATED).json(newCustomer);
});