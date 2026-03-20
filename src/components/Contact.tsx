import React from 'react';
import { ContactForm } from './contact/ContactForm';
import { SocialLinks } from './contact/SocialLinks';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Связаться со мной</h2>
          <p className="text-xl text-gray-600">Готов обсудить ваше финансовое будущее</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactForm />
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}