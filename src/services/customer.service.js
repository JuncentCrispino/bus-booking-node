import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
import Customer from '../classes/Customer.js';

const customer = new Customer();

export const createCustomer = async (newCustomer) => {
  const existCustomer = await customer.findByEmail(newCustomer.customer_email_address);
  if (existCustomer) {
    throw new ApiError(httpStatus.CONFLICT, 'Email already exist');
  }
  await customer.createUser(newCustomer);
  const createdCustomer = await customer.findByEmail(newCustomer.customer_email_address);
  delete createdCustomer.password;
  return createdCustomer;
};
