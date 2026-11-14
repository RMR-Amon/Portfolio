import type { YearMonth } from '@/types';

/**
 * Personal information.
 * Everything on the site about Maxmudjon comes from here or from the other
 * files in `src/data` — components never hard-code personal facts.
 */
export const profile = {
  fullName: 'Maxmudjon Raximjonov',
  displayName: 'Maxmudjon',
  role: 'Frontend Developer',
  location: 'Tashkent, Uzbekistan',
  birth: { year: 2007, month: 3 } satisfies YearMonth,
  /** First day at PROWEB Academy — the start of the frontend journey. */
  codingSince: { year: 2024, month: 11 } satisfies YearMonth,
  currentPosition: { title: 'IT Teacher', company: 'MARS IT SCHOOL' },
  github: { username: 'RMR-Amon', url: 'https://github.com/RMR-Amon' },
  brand: 'R_M_R',

  /**
   * CV / resume.
   * To publish a new CV: put the PDF into `public/cv/` and set `url` (e.g.
   * '/cv/Maxmudjon-Raximjonov-CV.pdf'). While `url` is null every CV button
   * shows a "Coming soon" state instead of linking to an unverified file.
   */
  cv: {
    url: null as string | null,
    fileName: 'Maxmudjon-Raximjonov-CV.pdf',
  },

  quote: {
    text: 'If your code works on the first try,',
    accent: 'you’ve probably forgotten something.',
    author: 'Programmer’s wisdom',
  },
} as const;
