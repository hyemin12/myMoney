import { Link, useLocation, useNavigate } from 'react-router-dom';

import Button from '../Button';

import { TReportReason } from '@/features/report/model/report.model';
import { useState } from 'react';
import { useReport } from '@/features/report';
import { RadioButton, ReceiptImageStyle } from './Modal.style';

interface ILoginModalProps {
  closeModal: () => void;
}

export const LoginModal = ({ closeModal }: ILoginModalProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <>
      <h4>
        로그인이 필요한 서비스입니다.
        <br />
        로그인 하시겠습니까?
      </h4>

      <div className="button-group">
        <Button
          size="medium"
          scheme="border"
          onClick={() => {
            if (pathname === '/review') {
              navigate(-1);
            }
            closeModal();
          }}
        >
          취소
        </Button>
        <Link to="/login">
          <Button size="medium" scheme="primary" onClick={closeModal}>
            네
          </Button>
        </Link>
      </div>
    </>
  );
};

interface IDeleteModalProps {
  closeModal: () => void;
  onDelete: () => void;
  type: 'review' | 'comment';
}

export const DeleteModal = ({
  closeModal,
  onDelete,
  type,
}: IDeleteModalProps) => {
  return (
    <>
      <h4>{type === 'review' ? '후기를' : '댓글을'}삭제하시겠습니까?</h4>
      <div className="button-group">
        <Button size="medium" scheme="border" onClick={closeModal}>
          취소
        </Button>
        <Button size="medium" scheme="primary" onClick={onDelete}>
          확인
        </Button>
      </div>
    </>
  );
};

interface IAlertModalProps {
  closeModal: () => void;
  message: string;
}

export const AlertModal = ({ closeModal, message }: IAlertModalProps) => {
  return (
    <>
      <p>{message}</p>
      <div className="button-group">
        <Button size="medium" scheme="primary" onClick={closeModal}>
          확인
        </Button>
      </div>
    </>
  );
};

interface IReportUserModalProps {
  closeModal: () => void;
  reportedUserId: number;
}

const reportReasons: TReportReason[] = [
  '같은 내용 반복 작성(도배)',
  '선정성/음란성',
  '욕설/인신공격',
  '개인정보 노출',
  '영리목적/홍보성',
  '아이디 거래',
  '불법 정보',
];

export const ReportUserModal = ({
  reportedUserId,
  closeModal,
}: IReportUserModalProps) => {
  const { postReport } = useReport();

  const [selectedReason, setSelectedReason] = useState<TReportReason | null>(
    null,
  );

  const onSubmit = () => {
    if (!selectedReason || !reportedUserId) return;
    postReport({ reason: selectedReason, reportedUserId });
    closeModal();
  };

  return (
    <>
      <h4>신고사유</h4>
      <form>
        {reportReasons.map((reason) => (
          <RadioButton key={reason}>
            <input
              type="radio"
              id={reason}
              name="reportReason"
              value={reason}
              checked={selectedReason === reason}
              onChange={(e) =>
                setSelectedReason(e.target.value as TReportReason)
              }
            />
            <label htmlFor={reason}>{reason}</label>
          </RadioButton>
        ))}
      </form>
      <div className="button-group">
        <Button size="medium" scheme="border" onClick={closeModal}>
          취소
        </Button>
        <Button size="medium" scheme="primary" onClick={onSubmit}>
          신고
        </Button>
      </div>
    </>
  );
};

interface IApproveReviewModalProps {
  closeModal: () => void;
  approveReview: () => void;
  receiptImg: string;
}

export const ApproveReviewModal = ({
  closeModal,
  approveReview,
  receiptImg,
}: IApproveReviewModalProps) => {
  return (
    <>
      <ReceiptImageStyle>
        <img src={receiptImg} alt="영수증 이미지" />
      </ReceiptImageStyle>
      <div className="button-group">
        <Button size="medium" scheme="border" onClick={closeModal}>
          취소
        </Button>
        <Button size="medium" scheme="primary" onClick={approveReview}>
          승인
        </Button>
      </div>
    </>
  );
};
