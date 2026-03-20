import React, { useState } from 'react';
import { Send, Mail, Phone } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../../config/email';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: EMAIL_CONFIG.senderName,
          reply_to: formData.email,
          to_email: EMAIL_CONFIG.senderEmail
        },
        EMAIL_CONFIG.publicKey
      );

      setFormData({ name: '', email: '', message: '' });
      toast.success('Сообщение успешно отправлено!');
    } catch (error) {
      console.error('Ошибка отправки:', error);
      toast.error('Произошла ошибка при отправке сообщения');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg">
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 mb-2">Имя</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 mb-2">Сообщение</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
          />
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-burgundy-600 text-white px-6 py-3 rounded-md hover:bg-burgundy-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Отправка...
            </>
          ) : (
            <>
              Отправить сообщение
              <Send className="h-4 w-4" />
            </>
          )}
        </button>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-burgundy-600" />
            <a href={`mailto:${EMAIL_CONFIG.supportEmail}`} className="text-gray-600 hover:text-burgundy-600">
              {EMAIL_CONFIG.supportEmail}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-burgundy-600" />
            <a href="tel:+447467191875" className="text-gray-600 hover:text-burgundy-600">
              +44 7467 191875
            </a>
          </div>
        </div>
      </form>
    </>
  );
}