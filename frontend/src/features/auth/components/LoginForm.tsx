import { UseFormRegister } from 'react-hook-form';

import RememberEmailCheckbox from './RememberEmailCheckbox';
import { AlertText, Button, Input } from '@/shared/components';
import {
  FindPassword,
  FormStyle,
  IDCheckbox,
  InputGroup,
  OptionStyle,
} from './LoginForm.style';
import { IUserLogin } from '../models/auth.model';

interface Props {
  onSubmit: () => void;
  register: UseFormRegister<IUserLogin>;
  errorMessage: string | null;
  checkedRememberEmail?: boolean;
  toggleCheckedRememberEmail?: () => void;
}

function LoginForm({
  checkedRememberEmail = false,
  toggleCheckedRememberEmail,
  onSubmit,
  register,
  errorMessage,
}: Props) {
  return (
    <FormStyle onSubmit={onSubmit}>
      <InputGroup>
        <fieldset>
          <Input
            $inputType="text"
            {...register('email', { required: true })}
            type="email"
            placeholder="이메일을 입력해주세요"
          />
        </fieldset>
        <fieldset>
          <Input
            $inputType="password"
            {...register('password', { required: true })}
            placeholder="비밀번호를 입력해주세요"
          />
        </fieldset>
      </InputGroup>

      {toggleCheckedRememberEmail && (
        <OptionStyle>
          <IDCheckbox>
            <RememberEmailCheckbox
              checkedRememberEmail={checkedRememberEmail}
              toggleCheckedRememberEmail={toggleCheckedRememberEmail}
            />
            <p onClick={toggleCheckedRememberEmail}> 아이디저장</p>
          </IDCheckbox>
          <FindPassword
            onClick={() =>
              alert(
                '준비 중인 서비스입니다. 비밀번호를 잊으셨다면 관리자에게 문의해주세요.',
              )
            }
          >
            <p>비밀번호 찾기</p>
          </FindPassword>
        </OptionStyle>
      )}

      <Button $fullWidth type="submit" scheme="primary" size="large">
        로그인
      </Button>
      {errorMessage && <AlertText size="small">{errorMessage}</AlertText>}
    </FormStyle>
  );
}
export default LoginForm;
