import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Firebase
vi.mock('../lib/firebase', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
  },
  db: {
    collection: vi.fn(),
    doc: vi.fn(),
  },
}));

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(),
  },
}));