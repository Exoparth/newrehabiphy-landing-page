export interface Physiotherapist {
  id: string;
  name: string;
  title: string;
  qualification: string;
  experience: string;
  specialties: string[];
  rating: number;
  reviewsCount: number;
  avatar: string;
  availability: string;
  location: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  age: number;
  condition: string;
  recoveryTime: string;
  quote: string;
  avatar: string;
  rating: number;
  physioName: string;
  metrics: {
    label: string;
    before: string;
    after: string;
  };
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: string;
  bullets: string[];
  metrics?: { label: string; value: string }[];
}

export interface HowItWorksStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  details: string[];
  mockupData: {
    title: string;
    status: string;
    value: string;
    badge: string;
  };
}

export interface ConsultationBooking {
  name: string;
  email: string;
  phone: string;
  consultationType: 'online' | 'home_visit';
  condition: string;
  physioId?: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

export interface AiAssessmentResult {
  summary: string;
  severityScore: string;
  recommendedActions: string[];
  suggestedExercises: {
    name: string;
    reps: string;
    focus: string;
  }[];
  precaution: string;
}
