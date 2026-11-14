import { projects } from '@/data/projects';
import type { Project, TechId } from '@/types';

/** Hosting platform derived from a live-demo URL. */
export function hostingOf(url?: string): TechId | null {
  if (!url) return null;
  const host = new URL(url).hostname;
  if (host.endsWith('netlify.app')) return 'netlify';
  if (host.endsWith('vercel.app')) return 'vercel';
  if (host.endsWith('github.io')) return 'github-pages';
  return null;
}

/**
 * Every skill a project demonstrates: its stack, extra practices, hosting
 * (from the demo URL) and tooling implied by the setup.
 */
export function projectSkills(project: Project): TechId[] {
  const set = new Set<TechId>([...project.stack, ...(project.practices ?? [])]);
  const hosting = hostingOf(project.demo);
  if (hosting) set.add(hosting);
  set.add('git');
  set.add('github');
  if (set.has('vite')) set.add('npm');
  return [...set];
}

const usage = new Map<TechId, string[]>();
for (const p of projects) {
  for (const id of projectSkills(p)) usage.set(id, [...(usage.get(id) ?? []), p.slug]);
}

/** Slugs of the projects that use a skill. */
export const projectsUsing = (id: TechId): string[] => usage.get(id) ?? [];

/** Number of showcased projects that use a skill. */
export const usageCount = (id: TechId): number => projectsUsing(id).length;
