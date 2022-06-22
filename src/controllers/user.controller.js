import httpStatus from 'http-status';
import sql from '../databases/busBookingDB.js';
import { createUser, updateUserDetails, userStatus } from '../services/user.service.js';
import catchAsync from '../utils/catchAsync.js';

export const registerUser = async (req, res, next) => {
  const trx = await sql.transaction();
  try {
    const newUser = await createUser(trx, req.body);
    return res.status(httpStatus.CREATED).json(newUser);
  } catch (error) {
    await trx.rollback();
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const trx = await sql.transaction();
  try {
    const updatedUser = await updateUserDetails(trx, req.params.user_id, req.body);
    return res.status(httpStatus.OK).json(updatedUser);
  } catch (error) {
    await trx.rollback();
    next(error);
  }
};

export const updateUserStatus = catchAsync(async (req, res) => {
  const update = await userStatus(req.params.user_id, req.body.status);
  return res.status(httpStatus.OK).json(update);
});