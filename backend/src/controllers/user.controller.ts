import { Response, Request } from 'express';

import { CustomRequest } from '../middleware/authentication';
import {
  serviceCheckDuplicateEmail,
  serviceCheckDuplicateNickname,
  serviceGetUserInfo,
  serviceLogin,
  serviceJoin,
  serviceFindUsers,
} from '../services/user.service';
import { ERROR_MESSAGE } from '../constance/errorMessage';
import { createPagination } from '../services/review.service';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const loginResult = await serviceLogin(email, password);

    // 사용자가 차단된 경우
    if ('suspendedUser' in loginResult) {
      return res.status(403).send({
        message: 'User is suspended',
        ...loginResult.suspendedUser,
      });
    }

    const { isAdmin, token, user } = loginResult;

    res
      .status(200)
      .cookie('access-token', token, { httpOnly: true })
      .send({ message: 'success', isAdmin, email: user.email });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie('access-token');
  res.sendStatus(204);
};

export const checkedDuplicateEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    await serviceCheckDuplicateEmail(email);
    res.status(200).send({ message: 'success', email });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const checkedDuplicateNickname = async (req: Request, res: Response) => {
  const { nickname } = req.body;
  try {
    await serviceCheckDuplicateNickname(nickname);
    res.status(200).send({ message: 'success', nickname });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const joinUser = async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;

  try {
    await serviceJoin(email, password, nickname);
    res.status(201).send({ message: 'Created' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserInfo = async (req: CustomRequest, res: Response) => {
  const { email } = req.user!;

  if (!email) {
    throw new Error(ERROR_MESSAGE.INVALID_USER);
  }

  try {
    const userInfoResult = await serviceGetUserInfo(email);

    // 사용자가 차단된 경우
    if ('suspendedUser' in userInfoResult) {
      return res.status(403).send({
        message: 'User is suspended',
        ...userInfoResult.suspendedUser,
      });
    }

    const { user } = userInfoResult;

    res.status(200).send({
      email: user.email,
      nickname: user.nickname,
      reportCount: user.reportCount,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

interface FullUserInfo {
  id: number;
  email: string;
  nickname: string;
  isAdmin: boolean;
  suspensionCount: number;
  status: string;
  banEndDate: Date | null;
}

export const getAllUsers = async (req: CustomRequest, res: Response) => {
  const { isAdmin } = req.user!;
  if (!isAdmin) {
    throw new Error(ERROR_MESSAGE.DENIED);
  }
  const { page } = req.query;

  try {
    const numberPage = Number(page) || 1;
    const result = await serviceFindUsers(numberPage);

    const { users, totalCount } = result as {
      users: FullUserInfo[];
      totalCount: number;
    };
    const pagination = await createPagination(numberPage, 12, totalCount);

    return res.status(200).send({
      users,
      pagination,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
