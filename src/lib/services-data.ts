import type { ServicePackage } from './types';

export const services: ServicePackage[] = [
  {
    title: 'Digital Presence',
    price: '₦60,000 - ₦85,000',
    target: 'For new businesses, sole proprietors, and personal brands.',
    features: [
      '3-5 pages (Home, About, Services, Contact, optional Testimonials/Gallery)',
      'Mobile-responsive design',
      'Basic SEO setup',
      'Contact form integration',
      'WhatsApp button',
      'Google Maps integration',
    ],
    timeline: '14-25 days',
    support: '30 days free support',
  },
  {
    title: 'Business Growth',
    price: '₦140,000 - ₦220,000',
    target: 'For established businesses, service providers, and small retailers.',
    features: [
      '5-10 pages with custom design',
      'Blog section setup',
      'Portfolio/gallery integration',
      'Advanced booking/appointment forms',
      'Newsletter signup functionality',
      'Google Analytics setup',
    ],
    timeline: '30-45 days',
    support: '90 days free support + 3 content updates',
  },
  {
    title: 'Digital Business Hub',
    price: '₦300,000 - ₦500,000',
    target: 'For e-commerce, large service businesses, and professional firms.',
    features: [
      'Unlimited pages and custom features',
      'Full e-commerce functionality',
      'User accounts and authentication',
      'Advanced booking/scheduling system',
      'Payment gateway integration',
      'CRM & email automation setup',
      'Advanced SEO & performance optimization',
    ],
    timeline: '3-6 months',
    support: '6 months priority support + monthly strategy calls',
  },
];

export const faqs = [
    {
        question: "Why is there a price range for each package?",
        answer: "The price range allows for flexibility based on the specific complexity and features required for your project. After our initial consultation, I'll provide a precise quote within that range tailored to your unique needs."
    },
    {
        question: "What if I need features from different packages?",
        answer: "No problem! These packages are starting points. We can customize a solution that mixes and matches features to perfectly fit your project's goals and budget."
    },
    {
        question: "What does 'free support' include?",
        answer: "Free support covers bug fixes, troubleshooting, and guidance on using your new website. It does not include new feature development or major content overhauls, which can be discussed separately."
    },
    {
        question: "Do you require a deposit?",
        answer: "Yes, a 50% deposit is required to begin work on your project. The remaining 50% is due upon project completion and before the final website is launched."
    }
]
