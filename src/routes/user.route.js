import express from 'express';
import { registerUser, updateUser, updateUserStatus } from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/auth.js';

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.put('/:user_id', verifyJwt, updateUser);
userRoute.patch('/:user_id', verifyJwt, updateUserStatus);

export default userRoute;