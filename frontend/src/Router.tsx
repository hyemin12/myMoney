import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PATH } from './shared/constants/paths';

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
          <Route path={PATH.INDEX} element={<Home />} />
          <Route path={PATH.SEARCH} element={<Search />} />

          <Route path={PATH.MY_PAGE} element={<MyPage />} />
          <Route path={PATH.LOGIN} element={<Login />} />

          <Route path={PATH.REVIEW_LIST}>
            <Route index element={<ReviewList />} />
            <Route path=":id" element={<ReviewDetail />} />
          </Route>

          <Route path={PATH.CREATE_REVIEW}>
            <Route index element={<CreateReview />} />
            <Route path=":id" element={<EditReview />} />
          </Route>

          {/* 관리자 페이지 */}
          <Route path={PATH.ADMIN}>
            <Route
              path={PATH.REPORT_USER}
              element={<SuspendedUsersDashboard />}
            />
            <Route
              path={PATH.USER_MANAGEMENT}
              element={<UserManagementDashboard />}
            />
            <Route
              path={PATH.UNVERIFIED_REVIEWS}
              element={<UnverifiedReviewsDashboard />}
            />
          </Route>

          {/* 회원가입 */}
          <Route path={PATH.JOIN}>
            <Route index element={<JoinStep1Email />} />
            <Route path={PATH.JOIN_STEP1} element={<JoinStep1Email />} />
            <Route path={PATH.JOIN_STEP2} element={<JoinStep2Nickname />} />
            <Route path={PATH.JOIN_STEP3} element={<JoinStep3Password />} />
          </Route>

          {/* 마이페이지 */}
          <Route path={PATH.MY_PAGE}>
            <Route index element={<MyPage />} />
            <Route path={PATH.MY_REVIEWS} element={<MyReviews />} />
            <Route path={PATH.LIKED_REVIEWS} element={<LikedReviews />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
