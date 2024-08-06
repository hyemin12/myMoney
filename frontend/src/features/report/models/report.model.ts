export interface IReport {
  reason: TReportReason;
  reportedUserId: number;
}

export type TReportReason =
  | '같은 내용 반복 작성(도배)'
  | '선정성/음란성'
  | '욕설/인신공격'
  | '개인정보 노출'
  | '영리목적/홍보성'
  | '아이디 거래'
  | '불법 정보';
