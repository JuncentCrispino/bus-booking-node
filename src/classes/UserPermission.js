import sql from '../databases/busBookingDB.js';

export default class UserPermission {

  trx;

  constructor(trx) {
    this.trx = trx;
  }

  async createUserPermission(user_id, permissions) {
    const newUserPerm = [];
    for (let permission_id of permissions) {
      newUserPerm.push({
        user_id,
        permission_id
      });
    }
    await this.trx('user_permissions').insert(newUserPerm);
  }

  async updateUserPermission(user_id, permissions) {
    await this.trx('user_permissions').where({ user_id }).del();
    const newUserPerm = [];
    if (permissions.length > 0) {
      for (let permission_id of permissions) {
        newUserPerm.push({
          user_id,
          permission_id
        });
      }
      await this.trx('user_permissions').insert(newUserPerm);
    }
  }
}