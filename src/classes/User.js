import sql from '../databases/busBookingDB.js';

export default class User {

  async findByEmail(email) {
    const user = await sql('users').where('email_address', email).then(([user]) => user);
    return user;
  }

  async findById(id) {
    const user = await sql('users').where('user_id', id).limit(1).then(([user]) => user);
    return user;
  }

  async finAllUser() {
    const users = await sql('users');
    for (let user of users) {
      delete user.password;
    }
    return users;
  }

  async findAllActiveUsers() {
    const users = await sql('users').where('is_active', 1);
    for (let user of users) {
      delete user.password;
    }
    return users;
  }

  async createUser(newUser) {
    await sql('users').insert(newUser);
  }

  async updateUser(id, userUpdate) {
    await sql('users').update(userUpdate).where('user_id', id);
  }

}