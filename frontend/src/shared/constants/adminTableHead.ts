import { IAdminTableHead } from '@/features/admin';

export const ADMIN_USERS_TABLE_HEAD: IAdminTableHead[] = [
  { name: 'No', $widthRatio: 7 },
  { name: '이메일', $widthRatio: 20 },
  { name: '닉네임', $widthRatio: 20 },
  { name: '고유 아이디', $widthRatio: 15 },
  { name: '상태', $widthRatio: 10 },
  { name: '신고횟수', $widthRatio: 10 },
  { name: '정지 종료일', $widthRatio: 20 },
];

export const ADMIN_UNVERIFIED_REVIEWS_TABLE_HEAD: IAdminTableHead[] = [
  { name: 'No', $widthRatio: 7 },
  { name: '제목', $widthRatio: 45 },
  { name: '작성자(닉네임)', $widthRatio: 16 },
  { name: '작성일', $widthRatio: 16 },
  { name: '인증 사진', $widthRatio: 16 },
];

export const ADMIN_SUSPENDED_USERS_TABLE_HEAD: IAdminTableHead[] = [
  { name: 'No', $widthRatio: 7 },
  { name: '신고자', $widthRatio: 14 },
  { name: '신고 사유', $widthRatio: 20 },
  { name: '신고 당한 유저', $widthRatio: 14 },
  { name: '신고일자', $widthRatio: 12 },
  { name: '상태', $widthRatio: 8 },
  { name: '처리일자', $widthRatio: 12 },
  { name: '검토', $widthRatio: 10 },
  { name: '', $widthRatio: 20 },
];
