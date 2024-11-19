import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Layout from '@/layout/user/Layout';
import { JoinTemplate, IUserRegistration } from '@/features/join';

import { AlertText, Input } from '@/shared/components';
import { withUnauthenticatedUser } from '@/shared/hocs';
import { useJoin } from '@/features/join/hooks/useJoin';
import { VALIDATION } from '@/shared/constants/validation';

function JoinStep3Password() {
  const { errorMessage, joinUser } = useJoin();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    getValues,
    formState: { errors, isValid },
  } = useForm<Pick<IUserRegistration, 'password' | 'password_checked'>>({
    mode: 'onChange',
  });

  const password = watch('password');
  const passwordChecked = watch('password_checked');

  useEffect(() => {
    if (password !== passwordChecked && passwordChecked) {
      setError('password_checked', {
        type: 'password_mismatch',
        message: '비밀번호가 일치하지 않습니다.',
      });
    } else {
      clearErrors('password_checked');
    }
  }, [password, passwordChecked]);

  const passwordCheckedValidation = {
    required: '비밀번호를 다시 입력해주세요',
    validate: {
      matchPassword: (value: string) => {
        const { password } = getValues();
        return password === value || '비밀번호가 일치하지 않습니다.';
      },
    },
  };

  const onSubmit = handleSubmit((data) => {
    joinUser(data.password.trim());
  });

  return (
    <Layout title="회원가입" showBackButton>
      <JoinTemplate
        current={3}
        title="비밀번호를\n입력해주세요."
        onSubmit={onSubmit}
        isValid={isValid}
        errorMessage={errorMessage}
      >
        <fieldset>
          <Input
            $inputType="password"
            {...register('password', VALIDATION.PASSWORD_VALIDATION)}
            placeholder="비밀번호를 입력해주세요"
          />
          {errors.password && (
            <AlertText size="small">{errors.password.message}</AlertText>
          )}
        </fieldset>
        <fieldset>
          <Input
            $inputType="password"
            {...register('password_checked', passwordCheckedValidation)}
            placeholder="비밀번호를 다시 입력해주세요"
          />
          {errors.password_checked && (
            <AlertText size="small">
              {errors.password_checked.message}
            </AlertText>
          )}
        </fieldset>
        <PasswordDescription>
          영문 대소문자, 숫자, 특수문자(!@#$%)를 혼합하여 6~12자로 입력해주세요.
          동일한 문자/숫자는 3글자 이상 연속으로 사용할 수 없습니다.
        </PasswordDescription>
      </JoinTemplate>
    </Layout>
  );
}

const PasswordDescription = styled.p`
  color: ${({ theme }) => theme.color.border};
  font-size: ${({ theme }) => theme.text['small'].fontSize};
`;

export default withUnauthenticatedUser(JoinStep3Password);
