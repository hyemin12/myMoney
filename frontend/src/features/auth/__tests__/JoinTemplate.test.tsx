import { screen, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import JoinTemplate from '@/features/auth/components/JoinTemplate';
import { theme } from '@/styles/theme';

describe('JoinTemplate 컴포넌트 테스트', () => {
  const mockOnSubmit = jest.fn();
  const setup = () => {
    return render(
      <ThemeProvider theme={theme}>
        <JoinTemplate
          current={1}
          title="이메일을\\n입력해주세요."
          onSubmit={mockOnSubmit}
          isValid
          errorMessage={null}
        >
          <input placeholder="이메일을 입력해주세요" />
        </JoinTemplate>
      </ThemeProvider>,
    );
  };

  test('제목이 올바르게 렌더링 되는지 확인', () => {
    setup();
    const titleElement = screen.getAllByRole('heading', { level: 1 });

    expect(titleElement[0]).toHaveTextContent('이메일을');
    expect(titleElement[1]).toHaveTextContent('입력해주세요.');
  });

  test('ProgressBar가 올바르게 렌더링 되는지 확인', () => {
    setup();
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });
});
