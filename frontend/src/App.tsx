import { ErrorBoundary } from 'react-error-boundary';
import {
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { theme } from './styles/theme';
import { GlobalStyle } from './styles/global';
import { Router } from './Router';
import { queryClient } from './shared/utils/queryClient';
import Error from './pages/Error';

function App() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ErrorBoundary FallbackComponent={Error} onReset={reset}>
            <Router />
          </ErrorBoundary>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
