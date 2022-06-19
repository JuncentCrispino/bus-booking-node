import config from '../config/config.js';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import tokenTypes from '../config/tokenTypes.js';
import sql from '../databases/busBookingDB.js';
dayjs.extend(utc);
dayjs.extend(timezone);

export default class Token {

  async saveUserToken(token, user_id, expires, type, blacklisted = 0) {
    await sql('user_tokens').insert({
      token,
      user_id,
      expires: expires.toDate(),
      type,
      blacklisted
    });
    const newToken = await sql('user_tokens').where('token', token).limit(1).then(([res]) => res);
    return newToken;
  }

  async saveCustomerToken(token, customer_id, expires, type, blacklisted = 0){
    await sql('customer_tokens').insert({
      token,
      customer_id,
      expires: expires.toDate(),
      type,
      blacklisted
    });
    const newToken = await sql('user_tokens').where('token', token).limit(1).then(([res]) => res);
    return newToken;
  }

  async deleteUserTokens(user_id) {
    await sql('user_tokens').where('user_id', user_id).del();
  }

  async deleteCustomerTokens(customer_id) {
    await sql('customer_tokens').where('customer_id', customer_id).del();
  }

  generateToken (user_id, expires, type, secret = config.jwt.secret) {
    const payload = {
      sub: user_id,
      iat: dayjs(Date.now()).unix(),
      exp: expires.unix(),
      type
    };
    return jwt.sign(payload, secret);
  }

  async generateUserAuthToken(user_id) {
    const refreshTokenExpires = dayjs(Date.now()).add(config.jwt.refreshExpiresDays, 'days');
    const accessTokenExpires = dayjs(Date.now()).add(config.jwt.accessExpiresMins, 'minutes');

    const refreshToken = this.generateToken(user_id, refreshTokenExpires, tokenTypes.REFRESH);
    const accessToken = this.generateToken(user_id, accessTokenExpires, tokenTypes.ACCESS);

    await this.deleteUserTokens(user_id);
    await this.saveUserToken(refreshToken, user_id, refreshTokenExpires, tokenTypes.REFRESH);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss')
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss')
      }
    };
  }

  async generateCustomerAuthToken(customer_id) {
    const refreshTokenExpires = dayjs(Date.now()).add(config.jwt.refreshExpiresDays, 'days');
    const accessTokenExpires = dayjs(Date.now()).add(config.jwt.accessExpiresMins, 'minutes');

    const refreshToken = this.generateToken(customer_id, refreshTokenExpires, tokenTypes.REFRESH);
    const accessToken = this.generateToken(customer_id, accessTokenExpires, tokenTypes.ACCESS);

    await this.deleteCustomerTokens(customer_id);
    await this.saveCustomerToken(refreshToken, customer_id, refreshTokenExpires, tokenTypes.REFRESH);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss')
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss')
      }
    };
  }
}