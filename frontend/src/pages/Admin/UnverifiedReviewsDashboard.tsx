import { useState } from 'react';

import {
  AdminContent,
  AdminLayout,
  AdminTable,
  AdminUnverifiedReviewsTableBody,
} from '@/components/Admin';
import { TableHeadItem } from '@/components/Admin/AdminTable';
import { withAdminAuthenticatedUser } from '@/components/hocs';
import { useAdmin } from '@/hooks/useAdmin';

const tableHead: TableHeadItem[] = [
  { name: 'No', $widthRatio: 7 },
  { name: '제목', $widthRatio: 45 },
  { name: '작성자(닉네임)', $widthRatio: 16 },
  { name: '작성일', $widthRatio: 16 },
  { name: '인증 사진', $widthRatio: 16 },
];

function UnverifiedReviewsDashboard() {
  const { unverifiedReviews, isLoadingUnverifiedReviews } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { approveReview } = useAdmin();

  const handleApproveReview = async (reviewId: number) => {
    await approveReview(reviewId);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <AdminContent
        title="미승인 후기 관리"
        isLoading={isLoadingUnverifiedReviews}
      >
        {unverifiedReviews.length === 0 && (
          <tr>
            <td colSpan={tableHead.length}>미승인 후기가 없습니다.</td>
          </tr>
        )}

        {unverifiedReviews.length > 0 && (
          <AdminTable tableHead={tableHead}>
            <AdminUnverifiedReviewsTableBody
              unverifiedReviews={unverifiedReviews}
              handleApproveReview={handleApproveReview}
              openModal={openModal}
              closeModal={closeModal}
              isModalOpen={isModalOpen}
            />
          </AdminTable>
        )}
      </AdminContent>
    </AdminLayout>
  );
}

export default withAdminAuthenticatedUser(UnverifiedReviewsDashboard);
