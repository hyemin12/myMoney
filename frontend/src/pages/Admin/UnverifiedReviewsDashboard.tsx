import { useEffect } from 'react';

import {
  AdminContent,
  AdminLayout,
  AdminTable,
  AdminUnverifiedReviewsTableBody,
  IAdminTableHead,
} from '@/features/admin';
import { withAdminAuthenticatedUser } from '@/shared/hocs';
import { useAdmin } from '@/features/admin/';
import useModalStore from '@/store/modal.store';

const tableHead: IAdminTableHead[] = [
  { name: 'No', $widthRatio: 7 },
  { name: '제목', $widthRatio: 45 },
  { name: '작성자(닉네임)', $widthRatio: 16 },
  { name: '작성일', $widthRatio: 16 },
  { name: '인증 사진', $widthRatio: 16 },
];

function UnverifiedReviewsDashboard() {
  const {
    refetchUnverifiedReviews,
    unverifiedReviews,
    isLoadingUnverifiedReviews,
    unverifiedReviewsPagination,
    approveReview,
    currentPage,
  } = useAdmin();

  const { openModal } = useModalStore();
  const handleApproveReview = async (reviewId: number, receiptImg: string) => {
    openModal('APPROVE_REVIEW', {
      approveReview: () => approveReview(reviewId),
      receiptImg,
    });
  };

  return (
    <AdminLayout>
      <AdminContent
        title="미승인 후기 관리"
        isLoading={isLoadingUnverifiedReviews}
        totalPage={unverifiedReviewsPagination?.totalCount}
      >
        {unverifiedReviews.length === 0 ? (
          <div>
            <p>미승인 후기가 없습니다.</p>
          </div>
        ) : (
          <AdminTable tableHead={tableHead}>
            <AdminUnverifiedReviewsTableBody
              currentPage={currentPage}
              unverifiedReviews={unverifiedReviews}
              handleApproveReview={handleApproveReview}
            />
          </AdminTable>
        )}
      </AdminContent>
    </AdminLayout>
  );
}

export default withAdminAuthenticatedUser(UnverifiedReviewsDashboard);
