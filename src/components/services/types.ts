export interface ServiceDetails {
  help: string[];
  benefits: string[];
  process?: string[];
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: ServiceDetails;
}