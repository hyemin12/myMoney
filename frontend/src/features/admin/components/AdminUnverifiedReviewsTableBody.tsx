import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { ImageIcon } from '@/assets/icons';
import { Icon } from '@/shared/components';
import { IUnverifiedReviewItem } from '@/features/review';
import { calcIndex } from '../utils/calcTableIndex';

interface Props {
  unverifiedReviews: IUnverifiedReviewItem[];
  handleApproveReview: (reviewId: number, receiptImg: string) => void;
  currentPage: number;
}

function AdminUnverifiedReviewsTableBody({
  unverifiedReviews,
  handleApproveReview,
  currentPage,
}: Props) {
  return (
    <>
      {unverifiedReviews.map((report: IUnverifiedReviewItem, idx) => (
        <React.Fragment key={report.id}>
          <tr>
            <td>{calcIndex(currentPage, idx)}</td>
            <td>{report.title}</td>
            <td>{report.userName}</td>
            <td>{dayjs(report.createdAt).format('YYYY-MM-DD')}</td>
            <td>
              <IconButton
                onClick={() =>
                  handleApproveReview(report.id, report.receiptImg)
                }
              >
                <Icon width={22} icon={<ImageIcon />} />
              </IconButton>
            </td>
          </tr>
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
