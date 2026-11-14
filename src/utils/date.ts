import type { YearMonth } from '@/types';

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const toYearMonth = (date: Date = new Date()): YearMonth => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
});

/**
 * Number of calendar months an employment spans, counting both the first and
 * the last month (e.g. October 2024 — February 2025 = 5 months).
 * `end = null` means "present" and resolves to the current month.
 */
export function countCalendarMonths(start: YearMonth, end: YearMonth | null, now: Date = new Date()): number {
  const to = end ?? toYearMonth(now);
  const months = (to.year - start.year) * 12 + (to.month - start.month) + 1;
  return Math.max(months, 1);
}

/** "5 months", "1 year", "1 year 3 months". */
export function formatMonths(total: number): string {
  const years = Math.floor(total / 12);
  const months = total % 12;
  const y = years ? `${years} ${years === 1 ? 'year' : 'years'}` : '';
  const m = months ? `${months} ${months === 1 ? 'month' : 'months'}` : '';
  return [y, m].filter(Boolean).join(' ');
}

export const formatYearMonth = (ym: YearMonth, style: 'short' | 'long' = 'short'): string =>
  `${(style === 'short' ? MONTHS_SHORT : MONTHS_LONG)[ym.month - 1]} ${ym.year}`;

/** Full years between a birth month and now. */
export function ageFrom(birth: YearMonth, now: Date = new Date()): number {
  const current = toYearMonth(now);
  let age = current.year - birth.year;
  if (current.month < birth.month) age -= 1;
  return age;
}
