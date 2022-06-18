import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../config/config.js';
import sql from '../databases/busBookingDB.js';
import tokenTypes from '../config/tokenTypes.js';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await sql('users').where('id', payload.sub).limit(1).then(([user]) => user);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

export default jwtStrategy;