import sql from '../databases/busBookingDB.js';
import bcrypt from 'bcrypt';
export default class Customer {

  async findByEmail(email) {
    const customer = await sql('customers').where('customer_email_address', email).then(([customer]) => customer);
    return customer;
  }

  async findById(id) {
    const customer = await sql('customers').where('customer_id', id).limit(1).then(([customer]) => customer);
    return customer;
  }

  async finAllUser() {
    const customers = await sql('customers');
    for (let customer of customers) {
      delete customer.password;
    }
    return customers;
  }

  async findAllActiveUsers() {
    const customers = await sql('customers').where('is_active', 1);
    for (let customer of customers) {
      delete customer.password;
    }
    return customers;
  }

  async createUser(newCustomer) {
    newCustomer.password = await bcrypt.hash(newCustomer.password, 10);
    await sql('customers').insert(newCustomer);
  }

  async updateUser(id, userUpdate) {
    await sql('customers').update(userUpdate).where('customer_id', id);
  }

}