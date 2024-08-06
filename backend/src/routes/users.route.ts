import express from 'express';

import { authentication } from '../middleware/authentication';
import {
  checkedDuplicateEmail,
  checkedDuplicateNickname,
  joinUser,
  loginUser,
  logoutUser,
  getUserInfo,
  getAllUsers,
} from '../controllers/user.controller';
import {
  validateCheckedEmail,
  validateCheckedNickname,
  validateJoin,
  validateLogin,
} from '../validator/users.validator';

const router = express.Router();

router.post('/login', validateLogin, loginUser);
router.post('/logout', logoutUser);
router.post('/checkedEmail', validateCheckedEmail, checkedDuplicateEmail);
router.post(
  '/checkedNickname',
  validateCheckedNickname,
  checkedDuplicateNickname,
);
router.post('/join', validateJoin, joinUser);
router.get('/me', authentication(true), getUserInfo);
router.get('/all', authentication(true), getAllUsers);

export { router as usersRouter };
