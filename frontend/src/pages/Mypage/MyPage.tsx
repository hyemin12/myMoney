import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import {
  ArchiveIcon,
  BabyIcon,
  HeartIcon,
  HelpIcon,
  ReportIcon,
} from '@/assets/icons';
import Layout from '@/layout/Layout';
import { withAuthenticatedUser } from '@/shared/hocs';
import { Icon, Loading } from '@/shared/components';
import { LoadingContainer } from '@/features/admin/components/AdminContent';
import { useAuth } from '@/features/auth/hooks/useAuth';

const myPageNavItems = [
  { icon: <BabyIcon />, title: '내 정보 관리', path: '/mypage' },
  {
    icon: <ArchiveIcon />,
    title: '내가 작성한 리뷰 목록',
    path: '/mypage/reviews',
  },
  {
    icon: <HeartIcon />,
    title: '좋아요 누른 리뷰 목록',
    path: '/mypage/liked',
  },
  { icon: <HelpIcon />, title: '고객센터', path: '/mypage/support' },
];

function MyPage() {
  const navigate = useNavigate();
  const { userLogout } = useAuth();
  const { userInfo, isLoadingUsers } = useAuth();

  const handleNavigation = (path: string) => {
    if (path === '/mypage' || path === '/mypage/support') {
      alert('준비중인 서비스 입니다.');
      return;
    }
    navigate(path);
  };

  return (
    <Layout showBackButton={false} title="마이페이지">
      {isLoadingUsers && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}

      {!isLoadingUsers && (
        <Container>
          <UserContainer className="user-container">
            <h4>{userInfo.nickname}</h4>
            <p>{userInfo.email}</p>
          </UserContainer>

          <ReportContainer className="item-container">
            <div>
              <Icon icon={<ReportIcon />} width={26} />
              <p>신고당한 횟수:</p>
            </div>
            <p>
              <span>{userInfo.reportCount}</span>회
            </p>
          </ReportContainer>

          <ItemContainer>
            {myPageNavItems.map((item) => (
              <div
                key={item.title}
                role="link"
                onClick={() => handleNavigation(item.path)}
              >
                <Icon icon={item.icon} width={26} />
                <p>{item.title}</p>
              </div>
            ))}
          </ItemContainer>

          <LogoutButton role="button" onClick={userLogout}>
            로그아웃
          </LogoutButton>
        </Container>
      )}
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .ItemContainer {
    margin-top: 50px;
  }
`;

const UserContainer = styled.div`
  padding: 37px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};
  text-align: center;
  h4 {
    margin-bottom: 4px;
    font-size: 18px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const ItemCommonStyle = css`
  display: flex;
  gap: 10px;
`;

const ReportContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 16px;
  > div {
    ${ItemCommonStyle}
  }
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 16px 120px;
  > div {
    ${ItemCommonStyle};
    cursor: pointer;
    p,
    svg {
      transition: all 0.3s ease-in-out;
    }
    &:hover {
      p {
        color: ${({ theme }) => theme.color.primary};
      }
      svg {
        fill: ${({ theme }) => theme.color.primary};
      }
    }
  }
`;

const LogoutButton = styled.div`
  justify-content: center;
  width: calc(100% - 32px);
  margin: auto;
  padding: 12px 52px;
  text-align: center;
  background-color: #7d7d7d;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
`;

export default withAuthenticatedUser(MyPage);
