import { Physiotherapist, Testimonial, HowItWorksStep, Feature } from './types';

export const EXPERT_PHYSIOS: Physiotherapist[] = [
  {
    id: 'p1',
    name: 'Sarah Jenkins',
    title: 'Chief Sports Physiotherapist',
    qualification: 'Qualified & Licensed Physiotherapist, OCS, CSCS',
    experience: '12+ Years Experience',
    specialties: ['ACL & Knee Rehab', 'Post-Surgical Recovery', 'Athletic Motion Analysis'],
    rating: 4.9,
    reviewsCount: 340,
    avatar: 'https://images.unsplash.com/photo-1594824813566-788426a8d6b1?auto=format&fit=crop&q=80&w=250',
    availability: 'Available Today (Video & Home Visit)',
    location: 'Metropolitan Area'
  },
  {
    id: 'p2',
    name: 'Marcus Vance',
    title: 'Spine & Posture Rehabilitation Lead',
    qualification: 'Qualified & Licensed Physiotherapist, COMT',
    experience: '9+ Years Experience',
    specialties: ['Lower Back Pain', 'Cervical & Neck Spine', 'Ergonomic Realignment'],
    rating: 4.9,
    reviewsCount: 285,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250',
    availability: 'Available Tomorrow',
    location: 'Home Visit & Clinic'
  },
  {
    id: 'p3',
    name: 'Priya Sharma',
    title: 'Shoulder & Upper Extremity Specialist',
    qualification: 'Qualified & Licensed Physiotherapist, FAAOMPT',
    experience: '11+ Years Experience',
    specialties: ['Rotator Cuff Care', 'Frozen Shoulder', 'AI Kinetic Analysis'],
    rating: 5.0,
    reviewsCount: 412,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250',
    availability: 'Available Today (Video)',
    location: 'Virtual Specialist'
  }
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: 1,
    title: 'Download App',
    subtitle: 'Instant Mobile Onboarding',
    description: 'Get the Rehabiphy iOS or Android app in under 30 seconds. No complex paperwork or waiting room queues.',
    iconName: 'Smartphone',
    details: ['Available on iOS & Android', 'Instant secure account setup', 'Sync with Apple Health / Google Fit'],
    mockupData: {
      title: 'Rehabiphy Setup',
      status: 'Ready in 30s',
      value: 'App Store 4.9★',
      badge: 'Step 1'
    }
  },
  {
    step: 2,
    title: 'AI Mobility Assessment',
    subtitle: '3D Joint Pose Computer Vision',
    description: 'Position your phone camera. Our AI clinical vision scans range-of-motion, joint angles, and postural balance in real time.',
    iconName: 'Scan',
    details: ['Sub-degree angle precision', 'Zero wearable hardware needed', 'Instant movement risk analysis'],
    mockupData: {
      title: 'Real-time Camera Scan',
      status: 'Knee Extension: 138°',
      value: 'Optimal Alignment',
      badge: 'Step 2'
    }
  },
  {
    step: 3,
    title: 'Connect Expert Physio',
    subtitle: 'Dedicated Specialist Match',
    description: 'Get matched with a top-rated licensed physiotherapist. Book 1-on-1 HD video sessions or certified home visits.',
    iconName: 'Video',
    details: ['Hand-picked qualified & licensed physiotherapists', 'Flexible video & in-person visits', 'Direct 24/7 physio messaging'],
    mockupData: {
      title: 'Sarah Jenkins, Licensed Physio',
      status: 'Live Video Session',
      value: '1-on-1 Guided Care',
      badge: 'Step 3'
    }
  },
  {
    step: 4,
    title: 'Guided Smart Recovery',
    subtitle: 'Daily AI Habit & Progress Loops',
    description: 'Follow personalized daily micro-routines. AI checks your form during exercises while your physio adjusts your plan dynamically.',
    iconName: 'TrendingUp',
    details: ['Interactive daily habit streaks', 'Dynamic pain score recalibration', '3x faster recovery milestones'],
    mockupData: {
      title: 'Recovery Score',
      status: '94% Mobility Regained',
      value: '+28° ROM Progress',
      badge: 'Step 4'
    }
  }
];

export const KEY_FEATURES_DATA: Feature[] = [
  {
    id: 'consultation',
    title: '1-on-1 Online Video Consultations',
    description: 'High-definition virtual appointments with senior clinical physiotherapists. Includes live screen-assisted motion diagnosis and immediate exercise prescription.',
    badge: 'Virtual Care',
    icon: 'Video',
    bullets: [
      'HD 60fps clinical video consultations',
      'Real-time joint angle annotation during call',
      'Digital prescription & e-medical history sync'
    ],
    metrics: [
      { label: 'Patient Rating', value: '4.95/5' },
      { label: 'Wait Time', value: '< 15 Mins' }
    ]
  },
  {
    id: 'home_visits',
    title: 'Doorstep Certified Home Visits',
    description: 'Get expert hands-on physiotherapy delivered directly to your home. Certified therapists bring specialized equipment and manual therapy tools.',
    badge: 'In-Person Care',
    icon: 'Home',
    bullets: [
      'Fully background-checked & licensed physiotherapists',
      'Sanitized, specialized rehab kit brought to you',
      'Flexible booking including weekends & evenings'
    ],
    metrics: [
      { label: 'Cities Covered', value: '40+' },
      { label: 'On-Time Rate', value: '98.8%' }
    ]
  },
  {
    id: 'personalized_plans',
    title: 'Dynamic Personalized Rehab Plans',
    description: 'Algorithms tailored to your biomechanics, surgery history, pain tolerance, and daily schedule. Every plan evolves weekly as you heal.',
    badge: 'Adaptive Intelligence',
    icon: 'Sliders',
    bullets: [
      'Adaptive exercise progression based on daily feedback',
      '4K slow-motion technique video tutorials',
      'Bite-sized 10-15 minute daily rehab routines'
    ],
    metrics: [
      { label: 'Plan Accuracy', value: '96%' },
      { label: 'Completion Rate', value: '88%' }
    ]
  },
  {
    id: 'progress_tracking',
    title: 'Biometric Progress & Range Analytics',
    description: 'Track your joint degrees, pain curves, strength benchmarks, and daily habit streaks with clean, clinical visual charts.',
    badge: 'Quantitative Healing',
    icon: 'Activity',
    bullets: [
      'Sub-degree Range of Motion (ROM) charts',
      'Visual pain trajectory index over 30/60 days',
      'Exportable PDF recovery reports for orthopedic surgeons'
    ],
    metrics: [
      { label: 'Average Speedup', value: '2.8x' },
      { label: 'Data Points', value: '10M+' }
    ]
  },
  {
    id: 'ai_assistant',
    title: 'Rehabiphy AI Health Assistant',
    description: 'An AI clinical companion available 24/7 to answer post-exercise soreness questions, guide warmups, and adjust intensity dynamically.',
    badge: '24/7 AI Guidance',
    icon: 'Bot',
    bullets: [
      'Instant clinical answer retrieval for symptoms',
      'Automated safety triage & emergency referral flags',
      'Voice-assisted exercise repetition counting'
    ],
    metrics: [
      { label: 'Response Time', value: '< 2 Sec' },
      { label: '24/7 Access', value: '100%' }
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    author: 'Michael Chang',
    role: 'Marathon Runner & Tech Lead',
    age: 32,
    condition: 'Post-Op ACL Reconstruction',
    recoveryTime: 'Recovered in 14 Weeks (vs 22 Wk Avg)',
    quote: 'Rehabiphy changed my entire outlook on ACL recovery. The real-time camera posture feedback ensured I was doing my terminal knee extensions correctly, and Dr. Sarah adjusted my routine weekly.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    physioName: 'Sarah Jenkins, Licensed Physiotherapist',
    metrics: {
      label: 'Knee Extension ROM',
      before: '92° Flexion',
      after: '142° Full Extension'
    }
  },
  {
    id: 't2',
    author: 'Elena Rostova',
    role: 'Architect & Mother of 2',
    age: 44,
    condition: 'Chronic Lumbar Sciatica',
    recoveryTime: 'Pain Free in 6 Weeks',
    quote: 'I had debilitating lower back pain for 2 years that kept me off my feet. Home visits combined with the daily 10-minute AI habit tracker gave me my active life back without painkillers.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    physioName: 'Marcus Vance, Licensed Physiotherapist',
    metrics: {
      label: 'Daily Pain Index',
      before: '8/10 Severe',
      after: '0/10 Pain Free'
    }
  },
  {
    id: 't3',
    author: 'David Sterling',
    role: 'CrossFit Athlete',
    age: 29,
    condition: 'Rotator Cuff Impingement',
    recoveryTime: 'Full Mobility in 5 Weeks',
    quote: 'The AI camera feature measuring my shoulder abduction angle blew me away. I could see exact degree improvements every single morning. Best physiotherapy app hands down!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    physioName: 'Priya Sharma, Licensed Physiotherapist',
    metrics: {
      label: 'Shoulder Overhead Angle',
      before: '110° Abduction',
      after: '178° Full Overhead'
    }
  }
];

export const REHAB_CONDITIONS = [
  { id: 'knee', name: 'Knee & ACL Recovery', icon: 'Bone' },
  { id: 'back', name: 'Lower Back & Sciatica', icon: 'Activity' },
  { id: 'shoulder', name: 'Shoulder & Rotator Cuff', icon: 'Shield' },
  { id: 'neck', name: 'Neck & Cervical Spine', icon: 'Zap' },
  { id: 'ankle', name: 'Ankle & Achilles Tendon', icon: 'Footprints' },
  { id: 'posture', name: 'Desk Posture & Ergonomics', icon: 'UserCheck' }
];
