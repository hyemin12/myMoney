import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Badge from '@/shared/components/Badge';
import { theme } from '@/styles/theme';

describe('Badge 컴포넌트 테스트', () => {
  test('렌더 확인', () => {
    render(
      <ThemeProvider theme={theme}>
        <Badge type="border" text="테스트용 배지" $position="top" />
      </ThemeProvider>,
    );

    const badgeElement = screen.getByText('테스트용 배지');
    expect(badgeElement).toBeInTheDocument();
  });

  test('verifiedIcon prop 확인', () => {
    render(
      <ThemeProvider theme={theme}>
        <Badge
          type="border"
          text="테스트용 배지"
          $position="top"
          verifiedIcon
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('테스트용 배지')).toHaveTextContent(
      '테스트용 배지',
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
