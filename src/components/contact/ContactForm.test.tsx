import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import { ContactForm } from './ContactForm';
import emailjs from '@emailjs/browser';

describe('ContactForm', () => {
  it('renders form fields correctly', () => {
    renderWithProviders(<ContactForm />);
    
    expect(screen.getByLabelText(/имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/сообщение/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /отправить/i })).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    const mockSend = vi.spyOn(emailjs, 'send').mockResolvedValue({});
    
    renderWithProviders(<ContactForm />);
    
    // Fill form
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

    await waitFor(() => {
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    // Verify form was reset
    expect(screen.getByLabelText(/имя/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/сообщение/i)).toHaveValue('');
  });

  it('shows error message on submission failure', async () => {
    const mockSend = vi.spyOn(emailjs, 'send').mockRejectedValue(new Error('Failed to send'));
    
    renderWithProviders(<ContactForm />);
    
    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/имя/i), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/сообщение/i), {
      target: { value: 'Test message' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /отправить/i }));

    await waitFor(() => {
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/произошла ошибка/i)).toBeInTheDocument();
    });
  });
});