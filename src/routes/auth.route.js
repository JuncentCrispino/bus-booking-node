import express from 'express';
import { customerLogin, userLogin } from '../controllers/auth.controller.js';

const authRoute = express.Router();

authRoute.post('/users/login', userLogin);
authRoute.post('/customers/login', customerLogin);

export default authRoute;