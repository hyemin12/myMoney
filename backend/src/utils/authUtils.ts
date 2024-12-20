import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SALT_ROUNDS, TOKEN_PRIVATE_KEY } from '../settings';
import { IUserInfo } from '../middleware/authentication';
import { IUserWithReportInfo } from '../models/user.model';
import { ERROR_MESSAGE } from '../constance/errorMessage';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  loginUserPassword: string,
) => {
  return await bcrypt.compare(password, loginUserPassword);
};

export const generateToken = (loginUser: IUserInfo) => {
  const { email, id, isAdmin } = loginUser;
  return jwt.sign({ email, id, isAdmin }, TOKEN_PRIVATE_KEY!, {
    expiresIn: '10h',
  });
};

/** 정지 종료일 계산
 * @param count : number
 * @param date : str
 * @returns remainingSeconds (초단위의 정지 종료일)
 */
export const calcSuspensionEndDate = (count: number, date: Date | null) => {
  let suspensionEndDate = date ? new Date(date) : new Date();

  switch (count) {
    case 5:
      suspensionEndDate.setMonth(suspensionEndDate.getFullYear() + 100);
      break; // 영구정지
    case 4:
    case 3:
      suspensionEndDate.setMonth(suspensionEndDate.getMonth() + 1);
      break; // 한 달 후
    case 1:
    case 2:
      suspensionEndDate.setDate(suspensionEndDate.getDate() + 1);
      break; // 하루 후
  }

  return suspensionEndDate;
};

export interface ISuspendedUser {
  email: string;
  reportCount: number;
  isSuspended: boolean;
  suspensionRemainingDays: number;
}

/** 정지 유저의 response 값을 연산하는 함수 */
export const suspendedUser = (user: IUserWithReportInfo) => {
  const { reportReason, reportedDate } = user;

  if (!reportedDate) throw new Error(ERROR_MESSAGE.INVALID_DATA);

  const reportedDateAsDate =
    typeof reportedDate === 'string' ? new Date(reportedDate) : reportedDate;

  const remainingDays = calcSuspensionEndDate(
    user.reportCount,
    reportedDateAsDate,
  );

  const suspendedUser = {
    email: user.email,
    reportCount: user.reportCount,
    isSuspended: true,
    reportReason,
    suspensionRemainingDays: remainingDays,
  };

  return { suspendedUser };
};
