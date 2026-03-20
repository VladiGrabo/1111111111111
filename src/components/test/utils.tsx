import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ExchangeProvider } from '../contexts/ExchangeContext';

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <ExchangeProvider>
          {ui}
        </ExchangeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}