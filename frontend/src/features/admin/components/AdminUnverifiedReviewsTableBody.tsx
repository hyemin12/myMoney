import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { ImageIcon } from '@/assets/icons';
import { Icon, Modal } from '@/components/common';
import { IUnverifiedReviewItem } from '@/models/review.model';

interface AdminUnverifiedReviewsTableBodyProps {
  unverifiedReviews: IUnverifiedReviewItem[];
  handleApproveReview: () => void;
  openModal: (reviewId: number) => void;
  closeModal: () => void;
  isModalOpen: boolean;
}

function AdminUnverifiedReviewsTableBody({
  unverifiedReviews,
  handleApproveReview,
  openModal,
  closeModal,
  isModalOpen,
}: AdminUnverifiedReviewsTableBodyProps) {
  return (
    <>
      {unverifiedReviews.map((report: IUnverifiedReviewItem, idx: number) => (
        <React.Fragment key={report.id}>
          <tr>
            <td>{report.id}</td>
            <td>{report.title}</td>
            <td>{report.userName}</td>
            <td>{dayjs(report.createdAt).format('YYYY-MM-DD')}</td>
            <td>
              <IconButton onClick={() => openModal(report.id)}>
                <Icon width={22} icon={<ImageIcon />} />
              </IconButton>
            </td>
          </tr>
          <Modal
            buttonText="승인"
            imageSrc={report.receiptImg}
            isOpen={isModalOpen}
            onClose={closeModal}
            onCancel={closeModal}
            onConfirm={handleApproveReview}
          />
        </React.Fragment>
      ))}
    </>
  );
}

const IconButton = styled.div`
  &:hover {
    svg {
      fill: ${({ theme }) => theme.color.primary};
    }
  }
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

export default AdminUnverifiedReviewsTableBody;
