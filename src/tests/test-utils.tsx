import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { User } from '../types/auth';

interface WrapperProps {
  children: React.ReactNode;
  user?: User | null;
}

function Wrapper({ children, user = null }: WrapperProps) {
  return (
    <BrowserRouter>
      <AuthProvider initialUser={user}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

function render(ui: React.ReactElement, { user, ...options } = {}) {
  return rtlRender(ui, { wrapper: (props) => <Wrapper {...props} user={user} />, ...options });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };