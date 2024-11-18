import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));
const Search = lazy(() => import('@/pages/Search'));
const CreateReview = lazy(() => import('@/pages/Review/CreateReview'));
const EditReview = lazy(() => import('@/pages/Review/EditReview'));
const ReviewList = lazy(() => import('@/pages/Review/ReviewList'));
const ReviewDetail = lazy(() => import('@/pages/Review/ReviewDetail'));
const MyPage = lazy(() => import('@/pages/Mypage/MyPage'));
const Login = lazy(() => import('@/pages/Login'));
const SuspendedUsersDashboard = lazy(
  () => import('@/pages/Admin/SuspendedUsersDashboard'),
);
const UserManagementDashboard = lazy(
  () => import('@/pages/Admin/UserManagementDashboard'),
);
const UnverifiedReviewsDashboard = lazy(
  () => import('@/pages/Admin/UnverifiedReviewsDashboard'),
);
const JoinStep1Email = lazy(() => import('@/pages/Join/JoinStep1Email'));
const JoinStep2Nickname = lazy(() => import('@/pages/Join/JoinStep2Nickname'));
const JoinStep3Password = lazy(() => import('@/pages/Join/JoinStep3Password'));
const MyReviews = lazy(() => import('@/pages/Mypage/MyReviews'));
const LikedReviews = lazy(() => import('@/pages/Mypage/LikedReviews'));

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>로딩중..</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/review" element={<CreateReview />} />
          <Route path="/review/:id" element={<EditReview />} />
          <Route path="/list" element={<ReviewList />} />
          <Route path="/list/:id" element={<ReviewDetail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />

          {/* 관리자 페이지 */}
          <Route path="/admin">
            <Route path="report-user" element={<SuspendedUsersDashboard />} />
            <Route path="users" element={<UserManagementDashboard />} />
            <Route
              path="unverified-reviews"
              element={<UnverifiedReviewsDashboard />}
            />
          </Route>

          {/* 회원가입 */}
          <Route path="/join">
            <Route index element={<JoinStep1Email />} />
            <Route path="step1" element={<JoinStep1Email />} />
            <Route path="step2" element={<JoinStep2Nickname />} />
            <Route path="step3" element={<JoinStep3Password />} />
          </Route>

          {/* 마이페이지 */}
          <Route path="/mypage">
            <Route index element={<MyPage />} />
            <Route path="reviews" element={<MyReviews />} />
            <Route path="liked" element={<LikedReviews />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
