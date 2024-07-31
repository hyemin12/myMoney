import { useState } from 'react';

import {
  MODAL_TYPES,
  MODAL_TITLE,
  MODAL_BTNTEXT,
} from '@/constants/modalString';
import { handleGoLogin } from '@/utils/routingUtils';

interface UseModalProps {
  onConfirm: (option: string) => void;
}

function useModal({ onConfirm }: UseModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = (option: string) => {
    if (modalType === MODAL_TYPES.LOGIN) {
      handleGoLogin();
    } else {
      onConfirm(option);
    }
    closeModal();
  };

  const modalProps = {
    isOpen: isModalOpen,
    onClose: closeModal,
    title:
      modalType === MODAL_TYPES.LOGIN
        ? MODAL_TITLE.LOGIN
        : modalType === MODAL_TYPES.DELETE
          ? MODAL_TITLE.REVIEW_DELETE
          : MODAL_TITLE.REPORT,
    buttonText:
      modalType === MODAL_TYPES.LOGIN
        ? MODAL_BTNTEXT.LOGIN
        : modalType === MODAL_TYPES.DELETE
          ? MODAL_BTNTEXT.DELETE
          : MODAL_BTNTEXT.REPORT,
    report: modalType === MODAL_TYPES.REPORT,
    onConfirm: handleConfirm,
  };

  return { openModal, closeModal, modalProps };
}

export default useModal;
