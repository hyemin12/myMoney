import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Button from '@/shared/components/Button';
import { theme } from '@/styles/theme';

describe('Button 컴포넌트 테스트', () => {
  test('렌더 확인', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button size="large" scheme="primary">
          테스트용 버튼
        </Button>
      </ThemeProvider>,
    );

    const buttonElement = screen.queryByText('테스트용 버튼');
    expect(buttonElement).toBeTruthy();
  });

  test('사이즈 prop 적용', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button size="large" scheme="primary">
          테스트용 버튼
        </Button>
      </ThemeProvider>,
    );
    const buttonElement = screen.queryByText('테스트용 버튼');
    expect(buttonElement).toHaveStyle('padding: 12px 50px');
    expect(buttonElement).toHaveStyle('font-size: 18px');
  });

  test('disabled 상태 적용', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button size="large" scheme="primary" disabled>
          테스트용 버튼
        </Button>
      </ThemeProvider>,
    );
    const buttonElement = screen.queryByText('테스트용 버튼');
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveStyle('cursor: not-allowed');
  });

  test('fullWidth 상태 적용', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button size="large" scheme="primary" $fullWidth>
          테스트용 버튼
        </Button>
      </ThemeProvider>,
    );
    const buttonElement = screen.queryByText('테스트용 버튼');
    expect(buttonElement).toHaveStyle('width: 100%');
  });
});
