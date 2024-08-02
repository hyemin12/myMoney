import {
  AlertModal,
  DeleteModal,
  LoginModal,
  ApproveReviewModal,
  ReportUserModal,
} from './ModalContents';
import { ModalBody, ModalContents, ModalStyle } from './Modal.style';
import useModalStore from '@/store/modal.store';

const Modal = () => {
  const { $isOpen, mode, contentProps, closeModal } = useModalStore();
  let content;

  switch (mode) {
    case 'ALERT':
      content = (
        <AlertModal closeModal={closeModal} message={contentProps.message} />
      );
      break;
    case 'DELETE':
      content = (
        <DeleteModal
          closeModal={closeModal}
          onDelete={contentProps.onDelete}
          type={contentProps.type}
        />
      );
      break;
    case 'APPROVE_REVIEW':
      content = (
        <ApproveReviewModal
          closeModal={closeModal}
          approveReview={contentProps.approveReview}
          receiptImg={contentProps.receiptImg}
        />
      );
      break;
    case 'REPORT':
      content = (
        <ReportUserModal
          closeModal={closeModal}
          reportedUserId={contentProps.reportedUserId}
        />
      );
      break;
    default:
      content = <LoginModal closeModal={closeModal} />;
  }

  return (
    <ModalStyle $isOpen={$isOpen}>
      <ModalBody mode={mode}>
        <ModalContents>{content}</ModalContents>
      </ModalBody>
    </ModalStyle>
  );
};

export default Modal;
