import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Layout from '@/layout/user/Layout';
import { IUserRegistration, JoinTemplate } from '@/features/join';
import { AlertText, AuthOptionLink, Input } from '@/shared/components';
import { withUnauthenticatedUser } from '@/shared/hocs';
import useUserRegistrationStore from '@/store/user.registration.store';
import { useJoin } from '@/features/join/hooks/useJoin';
import { VALIDATION } from '@/shared/constants/validation';

function JoinStep1Email() {
  const { errorMessage, checkedEmail } = useJoin();
  const { storeEmail } = useUserRegistrationStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Pick<IUserRegistration, 'email'>>({
    mode: 'onChange',
    defaultValues: { email: storeEmail ?? '' },
  });

  const onSubmit = handleSubmit((data) => {
    checkedEmail({ email: data.email.trim() });
  });

  return (
    <Layout title="회원가입" showBackButton>
      <JoinTemplate
        current={1}
        title="이메일을\n입력해주세요."
        onSubmit={onSubmit}
        isValid={isValid}
        errorMessage={errorMessage}
      >
        <fieldset>
          <Input
            $inputType="text"
            {...register('email', VALIDATION.EMAIL)}
            placeholder="이메일을 입력해주세요"
          />
          {errors.email && (
            <AlertText size="small">{errors.email.message}</AlertText>
          )}
        </fieldset>
      </JoinTemplate>

      <Inner>
        <AuthOptionLink
          description="이미 계정을 가지고 계신가요?"
          linkText="로그인"
          linkPath="/login"
        />
      </Inner>
    </Layout>
  );
}

const Inner = styled.div`
  padding: ${({ theme }) => theme.padding.mainContent};
`;

export default withUnauthenticatedUser(JoinStep1Email);
