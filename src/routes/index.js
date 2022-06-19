import express from 'express';
import authRoute from './auth.route.js';
import userRoute from './user.route.js';
import customerRoute from './customer.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/customers',
    route: customerRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;