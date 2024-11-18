import { useForm } from 'react-hook-form';

import Layout from '@/layout/user/Layout';
import { JoinTemplate, IUserRegistration, useAuth } from '@/features/auth';
import { AlertText, Input } from '@/shared/components';
import { withUnauthenticatedUser } from '@/shared/hocs';
import { VALIDATE } from '@/shared/constants/validate';
import useUserRegistrationStore from '@/store/user.registration.store';

const JoinStep2Nickname = () => {
  const { errorMessage, userCheckedNickname } = useAuth();
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

  const nicknameValidation = {
    required: '닉네임을 입력하세요',
    validate: (nickname: string) => {
      const containsBannedWord = VALIDATE.BANNED_WORDS.some((word) =>
        nickname.includes(word),
      );
      return containsBannedWord
        ? '부적절한 단어가 포함되어있습니다'
        : undefined;
    },
  };

  const onSubmit = handleSubmit((data) => {
    userCheckedNickname(data.nickname.trim());
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
            {...register('nickname', nicknameValidation)}
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
};

export default withUnauthenticatedUser(JoinStep2Nickname);
