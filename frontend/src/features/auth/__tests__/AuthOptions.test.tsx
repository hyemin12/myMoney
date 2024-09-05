import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AuthOptionLink from '../components/AuthOptionLink';
import { theme } from '@/styles/theme';

const LINK_PATH = '/join/step1';

describe('AuthOptionLink 컴포넌트 테스트', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <AuthOptionLink
            description="아직 계정이 없으신가요?"
            linkPath={LINK_PATH}
            linkText="회원가입"
          />
        </ThemeProvider>
      </MemoryRouter>,
    );
    const descriptionElement = screen.getByText('아직 계정이 없으신가요?');
    const linkTextElement = screen.getByRole('link', { name: '회원가입' });

    return {
      descriptionElement,
      linkTextElement,
    };
  };
  test('렌더 확인', () => {
    const { descriptionElement, linkTextElement } = setup();
    expect(descriptionElement).toBeInTheDocument();
    expect(linkTextElement).toBeInTheDocument();
  });

  test('linkPath 확인', () => {
    const { linkTextElement } = setup();

    expect(linkTextElement).toHaveAttribute('href', LINK_PATH);
  });
});
