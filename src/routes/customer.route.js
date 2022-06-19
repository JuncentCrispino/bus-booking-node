import express from 'express';
import { registerCustomer } from '../controllers/customer.controller.js';

const customerRoute = express.Router();

customerRoute.post('/register', registerCustomer);

export default customerRoute;