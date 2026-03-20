import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import { TestimonialsSection } from '../components/testimonials/TestimonialsSection';
import { ResultsSection } from '../components/results/ResultsSection';
import { WebinarSection } from '../components/webinar/WebinarSection';
import { EducationSection } from '../components/education/EducationSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <WebinarSection />
      <ResultsSection />
      <EducationSection />
      <TestimonialsSection />
    </>
  );
}