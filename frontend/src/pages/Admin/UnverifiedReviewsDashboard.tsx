import { useState } from 'react';

import {
  AdminContent,
  AdminLayout,
  AdminTable,
  AdminUnverifiedReviewsTableBody,
  IAdminTableHead,
} from '@/features/admin';
import { withAdminAuthenticatedUser } from '@/shared/hocs';
import { useAdmin } from '@/features/admin/';

const tableHead: IAdminTableHead[] = [
  { name: 'No', $widthRatio: 7 },
  { name: '제목', $widthRatio: 45 },
  { name: '작성자(닉네임)', $widthRatio: 16 },
  { name: '작성일', $widthRatio: 16 },
  { name: '인증 사진', $widthRatio: 16 },
];

function UnverifiedReviewsDashboard() {
  const { unverifiedReviews, isLoadingUnverifiedReviews, approveReview } =
    useAdmin();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    reviewId: number | null;
  }>({ isOpen: false, reviewId: null });

  const handleApproveReview = async () => {
    if (modalState.reviewId !== null) {
      await approveReview(modalState.reviewId!);
      setModalState({ isOpen: false, reviewId: null });
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, reviewId: null });
  };

  const openModal = (reviewId: number) => {
    setModalState({ isOpen: true, reviewId });
  };

  return (
    <AdminLayout>
      <AdminContent
        title="미승인 후기 관리"
        isLoading={isLoadingUnverifiedReviews}
      >
        {unverifiedReviews.length === 0 ? (
          <tr>
            <td colSpan={tableHead.length}>미승인 후기가 없습니다.</td>
          </tr>
        ) : (
          <AdminTable tableHead={tableHead}>
            <AdminUnverifiedReviewsTableBody
              unverifiedReviews={unverifiedReviews}
              handleApproveReview={handleApproveReview}
              openModal={openModal}
              closeModal={closeModal}
              isModalOpen={modalState.isOpen}
            />
          </AdminTable>
        )}
      </AdminContent>
    </AdminLayout>
  );
}

export default withAdminAuthenticatedUser(UnverifiedReviewsDashboard);
