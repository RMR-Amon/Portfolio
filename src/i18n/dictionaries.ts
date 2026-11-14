import { en, type Dictionary } from './locales/en';

/**
 * Registered languages.
 * To add one: create `locales/<code>.ts` exporting a `Dictionary`, add it
 * here and render a language switcher when `locales.length > 1`.
 */
export const dictionaries = { en } satisfies Record<string, Dictionary>;
export type Locale = keyof typeof dictionaries;
export const locales = Object.keys(dictionaries) as Locale[];
export type { Dictionary };
