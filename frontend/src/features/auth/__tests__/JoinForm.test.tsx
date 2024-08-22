import { screen, render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import JoinForm from '@/features/auth/components/JoinForm';
import { theme } from '@/styles/theme';

describe('JoinForm 컴포넌트 테스트', () => {
  const mockOnSubmit = jest.fn();
  const setup = (
    isLastStep: boolean = false,
    isValid: boolean = false,
    errorMessage: string | null = null,
  ) => {
    render(
      <ThemeProvider theme={theme}>
        <JoinForm
          onSubmit={mockOnSubmit}
          errorMessage={errorMessage}
          isLastStep={isLastStep}
          isValid={isValid}
        >
          <input type="text" placeholder="이메일을 입력해주세요." />
        </JoinForm>
      </ThemeProvider>,
    );
  };

  test('유효하지 않은 상태일 때 버튼이 비활성화 상태인지 확인', () => {
    setup();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('마지막 단계가 아닐 경우 버튼의 텍스트가 "계속하기"인지 확인', () => {
    setup();
    expect(screen.getByRole('button')).toHaveTextContent('계속하기');
  });

  test('마지막 단계인 경우 버튼의 텍스트가 "회원가입"인지 확인', () => {
    setup(true);
    expect(screen.getByRole('button')).toHaveTextContent('회원가입');
  });

  test('submit 버튼이 올바르게 동작하는지 확인', () => {
    setup(false, true, null);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).not.toBeDisabled();
    fireEvent.submit(buttonElement);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test('오류메세지가 제대로 렌더링 되는지 확인', () => {
    setup(false, false, '올바르지 않은 이메일 형식입니다.');
    expect(
      screen.getByText('올바르지 않은 이메일 형식입니다.'),
    ).toBeInTheDocument();
  });
});
