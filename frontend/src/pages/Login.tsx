import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

import { NaedonnaesanTextLogo } from '@/assets/icons';
import { withUnauthenticatedUser } from '@/shared/hocs';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { IUserLogin, LoginForm } from '@/features/auth';
import { AuthOptionLink, Icon } from '@/shared/components';

function Login() {
  const [cookies] = useCookies(['email']);
  const {
    errorMessage,
    loginUser,
    toggleCheckedRememberEmail,
    checkedRememberEmail,
  } = useAuth();
  // const [checkedRememberEmail, setCheckedRememberEmail] = useState(false);
  const { register, handleSubmit, setValue } = useForm<IUserLogin>();

  // const toggleCheckedRememberEmail = () => {
  //   setCheckedRememberEmail(!checkedRememberEmail);
  // };

  const onSubmit = handleSubmit((data: IUserLogin) => {
    loginUser(data, checkedRememberEmail);
  });

  useEffect(() => {
    setValue('email', cookies.email ? cookies.email : '');
    toggleCheckedRememberEmail();
  }, []);

  return (
    <Container>
      <Title to="/">
        <Icon
          width={160}
          height={38}
          icon={<NaedonnaesanTextLogo />}
          fill="#59B05F"
        />
      </Title>
      <LoginForm
        checkedRememberEmail={checkedRememberEmail}
        toggleCheckedRememberEmail={toggleCheckedRememberEmail}
        register={register}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
      />
      <AuthOptionLink
        description="아직 계정이 없으신가요?"
        linkPath="/join/step1"
        linkText="회원가입"
      />
    </Container>
  );
}

const Container = styled.div`
  width: 390px;
  margin-inline: auto;
  padding: ${({ theme }) => theme.padding.mainContent};
`;

const Title = styled(Link)`
  display: flex;
  justify-content: center;
  padding-top: 140px;
  margin-bottom: 100px;
  margin-inline: auto;
  color: ${({ theme }) => theme.color.primary};
  font-size: 42px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default withUnauthenticatedUser(Login);
