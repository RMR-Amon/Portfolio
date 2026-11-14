import type { Season } from '@/types';

export const SEASONS: Season[] = ['winter', 'spring', 'summer', 'autumn'];

/**
 * Season from the visitor's real local date (meteorological seasons,
 * northern hemisphere): Dec–Feb winter, Mar–May spring, Jun–Aug summer,
 * Sep–Nov autumn.
 */
export function seasonFromDate(date: Date = new Date()): Season {
  const m = date.getMonth(); // 0 = January
  if (m === 11 || m <= 1) return 'winter';
  if (m <= 4) return 'spring';
  if (m <= 7) return 'summer';
  return 'autumn';
}

/** `?season=winter` in the URL overrides the date (handy for previewing). */
export function resolveSeason(): Season {
  try {
    const q = new URLSearchParams(window.location.search).get('season');
    if (q && (SEASONS as string[]).includes(q)) return q as Season;
  } catch {
    /* ignore */
  }
  return seasonFromDate();
}
