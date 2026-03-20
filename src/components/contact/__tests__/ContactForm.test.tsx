import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ContactForm } from '../ContactForm';
import emailjs from '@emailjs/browser';

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/сообщение/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /отправить/i })).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    // Mock successful email send
    vi.mocked(emailjs.send).mockResolvedValueOnce({} as any);

    render(<ContactForm />);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/имя/i), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/сообщение/i), {
      target: { value: 'Test message' }
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }));

    // Verify EmailJS was called
    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
    });

    // Verify form was reset
    await waitFor(() => {
      expect(screen.getByLabelText(/имя/i)).toHaveValue('');
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/сообщение/i)).toHaveValue('');
    });
  });

  it('handles submission error', async () => {
    // Mock failed email send
    vi.mocked(emailjs.send).mockRejectedValueOnce(new Error('Failed to send'));

    render(<ContactForm />);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/имя/i), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/сообщение/i), {
      target: { value: 'Test message' }
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }));

    // Verify error handling
    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
    });
  });
});