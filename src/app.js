import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import httpStatus from 'http-status';
import config from './config/config.js';
import { stream } from './utils/logger.js';
import jwtStrategy from './middlewares/passport.js';
import authLimiter from './middlewares/authLimiter.js';
import routes from './routes/index.js';
import ApiError from './utils/ApiError.js';
import { errorConverter, errorHandler } from './middlewares/error.js';

const app = express();

app.use(morgan(config.logFormat, { stream }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}
app.use('/v1', routes);
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Route Not Found.'));
});
app.use(errorConverter);
app.use(errorHandler);
export default app;