import {
  AdminContent,
  AdminLayout,
  AdminTable,
  AdminUnverifiedReviewsTableBody,
} from '@/features/admin';
import { withAdminAuthenticatedUser } from '@/shared/hocs';
import useModalStore from '@/store/modal.store';
import { useCurrentPage } from '@/shared/hooks/useCurrentPage';
import { useGetUnverifiedReviews } from '@/features/admin/hooks/useGetUnverifiedReviews';
import { ADMIN_UNVERIFIED_REVIEWS_TABLE_HEAD } from '@/shared/constants/adminTableHead';
import { usePatchApproveReview } from '@/features/admin/hooks/usePatchApproveReview';

function UnverifiedReviewsDashboard() {
  const { openModal } = useModalStore();

  const currentPage = useCurrentPage();
  const { data, isLoading } = useGetUnverifiedReviews(currentPage);

  const unverifiedReviews = data?.reviews ?? [];
  const pagination = data?.pagination;

  const { mutate: approveReview } = usePatchApproveReview();

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
        isLoading={isLoading}
        totalPage={pagination?.totalCount}
      >
        {unverifiedReviews.length === 0 ? (
          <div>
            <p>미승인 후기가 없습니다.</p>
          </div>
        ) : (
          <AdminTable tableHead={ADMIN_UNVERIFIED_REVIEWS_TABLE_HEAD}>
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
