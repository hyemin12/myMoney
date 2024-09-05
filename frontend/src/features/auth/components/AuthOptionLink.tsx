import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  description: string;
  linkText: string;
  linkPath: string;
}

function AuthOptionLink({ description, linkText, linkPath }: Props) {
  return (
    <AuthOptionLinkContainer>
      <p>{description}</p>
      <Link to={linkPath}>{linkText}</Link>
    </AuthOptionLinkContainer>
  );
}

const AuthOptionLinkContainer = styled.div`
  display: flex;
  gap: 4px;
  color: ${({ theme }) => theme.color.darkGray};
  font-size: ${({ theme }) => theme.text['small'].fontSize};
  p {
    opacity: 0.8;
  }
  a {
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  }
`;

export default AuthOptionLink;
