import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Input, { TinputType } from '@/shared/components/Input';
import { theme } from '@/styles/theme';

describe('Input 컴포넌트 테스트', () => {
  const setup = ($inputType: TinputType = 'text', placeholder: string = '') => {
    const utils = render(
      <ThemeProvider theme={theme}>
        <Input $inputType={$inputType} placeholder={placeholder} />
      </ThemeProvider>,
    );

    const inputElement = screen.getByPlaceholderText(placeholder);
    return {
      ...utils,
      inputElement,
    };
  };

  test('렌더링 확인', () => {
    const { inputElement } = setup();
    expect(inputElement).toBeInTheDocument();
  });

  test('문자 타입 입력 값 확인', () => {
    const { inputElement } = setup();
    fireEvent.change(inputElement, { target: { value: '문자타입 테스트' } });
    expect(inputElement).toHaveValue('문자타입 테스트');
  });

  test('비밀번호 타입 확인', () => {
    const { inputElement } = setup('password', '비밀번호를 입력하세요.');
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  test('비밀번호 표시 기능 확인', () => {
    const { inputElement } = setup('password', '비밀번호를 입력하세요.');
    const toggleButton = screen.getByRole('button');

    // 비밀번호 숨김
    expect(inputElement).toHaveAttribute('type', 'password');

    // 비밀번호 표시
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute('type', 'text');

    // 비밀번호 숨김
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute('type', 'password');
  });
});
