import sql from '../databases/busBookingDB.js';
import bcrypt from 'bcrypt';
import today from '../utils/manilaTimeZone.js';
export default class User {

  trx;

  constructor(trx) {
    this.trx = trx;
  }

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
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await this.trx('users').insert(newUser);
  }

  async updateUser(user_id, userUpdate) {
    userUpdate.updated_at = today(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    await this.trx('users').update(userUpdate).where('user_id', user_id);
  }

  async updateUserStatus(user_id, status) {
    let is_active = 1;
    if (status === 1) {
      is_active = 0;
    }
    await sql('users').update({ is_active }).where({ user_id });
  }

}