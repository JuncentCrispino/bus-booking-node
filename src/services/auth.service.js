import ApiError from '../utils/ApiError.js';
import User from '../classes/User.js';
import Customer from '../classes/Customer.js';
import Token from '../classes/Token.js';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';

const token = new Token();
const user = new User();
const customer = new Customer;

export const loginUser = async (email_address, password) => {
  const existUser = await user.findByEmail(email_address);
  if (!existUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email and password does not match');
  }
  if (existUser.is_active === 0) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Disalbed user.');
  }
  const authPass = await bcrypt.compare(password, existUser.password);
  if (!authPass) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email and password does not match');
  }
  delete existUser.password;
  const tokens = await token.generateUserAuthToken(existUser.user_id);
  return { user: existUser, tokens };
};

export const loginCustomer = async (customer_email_address, password) => {
  const existCustomer = await customer.findByEmail(customer_email_address);
  if (!existCustomer) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email and password does not match.');
  }
  if (existCustomer.is_active === 0) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Disabled user');
  }
  const authPass = await bcrypt.compare(password, existCustomer.password);
  if (!authPass) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email and password does not match.');
  }
  delete existCustomer.password;
  const tokens = await token.generateCustomerAuthToken(existCustomer.customer_id);
  return { customer: existCustomer, tokens };
};