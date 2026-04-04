import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header.tsx';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    background: {
      default: 'var(--bg)',
      paper: 'var(--bg)',
    },
    text: {
      primary: 'var(--text)',
    },
    primary: {
      main: '#aa3bff',
    },
  },
  typography: {
    fontFamily: 'var(--sans)',
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <App />
    </ThemeProvider>
  </QueryClientProvider>
)