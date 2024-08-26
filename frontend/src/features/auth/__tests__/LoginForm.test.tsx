import { UseFormRegister } from 'react-hook-form';
import { screen, render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import LoginForm from '@/features/auth/components/LoginForm';
import { theme } from '@/styles/theme';
import { IUserLogin } from '../models/auth.model';

const TEST_MAIL = 'test@mail.com';
const TEST_PASSWORD = 'Test1234!';

const mockRegister: UseFormRegister<IUserLogin> = (name) => ({
  ref: jest.fn(),
  onChange: jest.fn(),
  onBlur: jest.fn(),
  name,
});

describe('LoginForm 컴포넌트 테스트', () => {
  const mockOnSubmit = jest.fn();
  const mockToggleCheckedRememberEmail = jest.fn();

  const setup = (
    errorMessage: string | null = null,
    checkedRememberEmail: boolean = false,
  ) => {
    render(
      <ThemeProvider theme={theme}>
        <LoginForm
          register={mockRegister}
          errorMessage={errorMessage}
          onSubmit={mockOnSubmit}
          checkedRememberEmail={checkedRememberEmail}
          toggleCheckedRememberEmail={mockToggleCheckedRememberEmail}
        />
      </ThemeProvider>,
    );
    const emailInputElement =
      screen.getByPlaceholderText('이메일을 입력해주세요');
    const passwordInputElement =
      screen.getByPlaceholderText('비밀번호를 입력해주세요');
    const submitButtonElement = screen.getByRole('button', { name: '로그인' });
    const checkBoxElement = screen.getByRole('checkbox');

    return {
      emailInputElement,
      passwordInputElement,
      submitButtonElement,
      checkBoxElement,
    };
  };

  test('LoginForm 렌더 확인', () => {
    const {
      emailInputElement,
      passwordInputElement,
      checkBoxElement,
      submitButtonElement,
    } = setup();
    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(submitButtonElement).toBeInTheDocument();
    expect(checkBoxElement).toBeInTheDocument();
  });

  test('이메일 입력이 올바르게 동작하는지 확인', () => {
    const { emailInputElement } = setup();

    expect(emailInputElement).toBeInTheDocument();
    fireEvent.change(emailInputElement, { target: { value: TEST_MAIL } });
    expect(emailInputElement).toHaveValue(TEST_MAIL);
  });

  test('비밀번호 입력이 올바르게 동작하는지 확인', () => {
    const { passwordInputElement } = setup();

    expect(passwordInputElement).toBeInTheDocument();
    expect(passwordInputElement).toHaveAttribute('type', 'password');
    fireEvent.change(passwordInputElement, {
      target: { value: TEST_PASSWORD },
    });
    expect(passwordInputElement).toHaveValue(TEST_PASSWORD);
  });

  test('submit 버튼이 올바르게 동작하는지 확인', () => {
    const { submitButtonElement } = setup();

    fireEvent.submit(submitButtonElement);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test('오류메세지가 제대로 렌더링 되는지 확인', () => {
    setup('아이디 또는 비밀번호가 올바르지 않습니다.');
    expect(
      screen.getByText('아이디 또는 비밀번호가 올바르지 않습니다.'),
    ).toBeInTheDocument();
  });

  test('아이디 저장 체크박스를 클릭하면 올바르게 동작하는지 확인', () => {
    const { checkBoxElement } = setup();

    expect(checkBoxElement).not.toBeChecked();

    fireEvent.click(checkBoxElement);
    expect(checkBoxElement).toBeChecked();
  });
});
