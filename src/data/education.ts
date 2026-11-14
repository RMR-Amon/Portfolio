import type { EducationItem } from '@/types';
import wsaLogo from '@/assets/images/logos/wall-street-academy.webp';
import cambridgeLogo from '@/assets/images/logos/cambridge.webp';
import prowebLogo from '@/assets/images/logos/proweb.webp';

/**
 * Education in chronological order. Periods and durations are preserved
 * exactly as they appeared on the previous version of the portfolio.
 */
export const education: EducationItem[] = [
  {
    id: 'wall-street-academy',
    institution: 'Wall Street Academy',
    program: 'English language',
    logo: wsaLogo,
    period: '2022 — 2023',
    duration: '1 year',
    summary:
      'A professional English learning centre in Uzbekistan focused on practical language skills for real life and careers, with dynamic, immersive courses that build fluency and confidence.',
    highlights: [
      'Speaking-focused lessons that boost communication skills',
      'Structured programmes from beginner to advanced level',
      'Certified, supportive instructors',
      'Goal-oriented learning for study abroad, work and international exams (IELTS, TOEFL)',
      'Interactive, real-world English for global opportunities',
    ],
  },
  {
    id: 'cambridge-learning-center',
    institution: 'Cambridge Learning Center',
    program: 'English language & academic preparation',
    logo: cambridgeLogo,
    period: '2023 — 2024',
    duration: '9 months',
    summary:
      'An educational organisation providing English language and academic preparation programmes, built around modern teaching methods and personalised learning.',
    highlights: [
      'English fluency — grammar, speaking, writing and comprehension',
      'Exam preparation — IELTS, TOEFL and other global standards',
      'Student-centred classes with certified instructors',
      'Skills for education and careers abroad',
    ],
  },
  {
    id: 'proweb',
    institution: 'PROWEB Academy',
    program: 'Frontend development',
    logo: prowebLogo,
    period: 'Started 28 November 2024',
    duration: '8 months',
    summary:
      'A modern IT education centre specialising in practical training for web development. I joined with no prior IT background and graduated after an intensive 8-month frontend programme.',
    highlights: [
      'Frontend development — HTML, CSS, JavaScript, React, TypeScript',
      'Project-based learning — building real applications from day one',
      'Career-ready education — hands-on tasks, mentorship and portfolio building',
      'Fast-track growth designed for beginners with no prior experience in tech',
    ],
    credentials: ['Certificate of completion', 'Diploma'],
  },
  {
    id: 'individual-javascript',
    institution: 'Individual JavaScript Training',
    program: 'One-to-one JavaScript course with a personal teacher',
    duration: '6 months',
    summary:
      'After PROWEB I continued with individual JavaScript training with a personal teacher to go deeper into the language that powers everything I build.',
    highlights: [
      'Individual lessons with a personal teacher',
      'Focused, in-depth study of JavaScript',
    ],
  },
];
