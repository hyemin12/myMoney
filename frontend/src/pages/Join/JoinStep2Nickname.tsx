import { useForm } from 'react-hook-form';

import Layout from '@/layout/user/Layout';
import { JoinTemplate, IUserRegistration } from '@/features/join';
import { AlertText, Input } from '@/shared/components';
import { withUnauthenticatedUser } from '@/shared/hocs';
import useUserRegistrationStore from '@/store/user.registration.store';
import { useJoin } from '@/features/join/hooks/useJoin';
import { VALIDATION } from '@/shared/constants/validation';

function JoinStep2Nickname() {
  const { errorMessage, checkedNickname } = useJoin();
  const { storeNickname } = useUserRegistrationStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Pick<IUserRegistration, 'nickname'>>({
    mode: 'onChange',
    defaultValues: {
      nickname: storeNickname ?? '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    checkedNickname({ nickname: data.nickname.trim() });
  });

  return (
    <Layout title="회원가입" showBackButton>
      <JoinTemplate
        current={2}
        title="닉네임을\n입력해주세요."
        onSubmit={onSubmit}
        isValid={isValid}
        errorMessage={errorMessage}
      >
        <fieldset>
          <Input
            $inputType="text"
            {...register('nickname', VALIDATION.NICKNAME)}
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
          {errors.nickname && (
            <AlertText size="small">{errors.nickname.message}</AlertText>
          )}
        </fieldset>
      </JoinTemplate>
    </Layout>
  );
}

export default withUnauthenticatedUser(JoinStep2Nickname);
