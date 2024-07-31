import styled from 'styled-components';

export const Container = styled.article`
  padding: 14px 14px 20px;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  .name {
    font-size: ${({ theme }) => theme.text['large'].fontSize};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  }
  .date {
    font-size: ${({ theme }) => theme.text['medium'].fontSize};
    color: ${({ theme }) => theme.color.border};
  }
  ul {
    li {
      a {
        text-decoration: none;
      }
    }
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 219.375px;
  background-color: ${({ theme }) => theme.color.background};
  border: 1px solid ${({ theme }) => theme.color.background};
  margin-bottom: 14px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    p {
      color: ${({ theme }) => theme.color.darkGrey};
      font-size: ${({ theme }) => theme.text['small'].fontSize};
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .badge {
    position: absolute;
    bottom: 0px;
    left: 0;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 4px;
  a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    .title {
      width: 100%;
      font-size: ${({ theme }) => theme.heading['small'].fontSize};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      text-overflow: inherit;
      white-space: inherit;
      overflow: inherit;
    }
  }
`;

export const Content = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 4px;
  text-overflow: ellipsis;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.darkGray};
`;

export const LikesContainer = styled.div`
  p {
    color: ${({ theme }) => theme.color.border};
    font-size: ${({ theme }) => theme.text['medium'].fontSize};
  }
`;
