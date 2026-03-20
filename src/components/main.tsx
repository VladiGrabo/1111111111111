import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n/config';
import './index.css';

// Create root outside of callback for better performance
const root = createRoot(document.getElementById('root')!);

// Use requestAnimationFrame for smoother initial render
requestAnimationFrame(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});