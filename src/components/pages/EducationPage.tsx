import React from 'react';
import { EducationSection } from '../components/education/EducationSection';
import { WebinarSection } from '../components/webinar/WebinarSection';

export default function EducationPage() {
  return (
    <div className="pt-24">
      <WebinarSection />
      <EducationSection />
    </div>
  );
}