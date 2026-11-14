import { useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { sectionIds } from '@/data/navigation';
import { projectCategories } from '@/data/projects';
import { techs } from '@/data/skills';
import type { ProjectCategory, TechId } from '@/types';

const isCategory = (v: string | null): v is ProjectCategory =>
  !!v && v !== 'all' && projectCategories.some((c) => c.id === v);
const isTech = (v: string | null): v is TechId => !!v && v in techs;

/**
 * Project filters live in the URL (?category=…&tech=…) so they are shareable
 * and can be set from anywhere (skills, command palette). Updates replace the
 * history entry and never move the page.
 */
export function useProjectFilters() {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const rawCategory = params.get('category');
  const rawTech = params.get('tech');
  const category: ProjectCategory | 'all' = isCategory(rawCategory) ? rawCategory : 'all';
  const tech: TechId | null = isTech(rawTech) ? rawTech : null;

  const update = useCallback(
    (patch: { category?: ProjectCategory | 'all'; tech?: TechId | null }) => {
      const next = new URLSearchParams(params);
      if (patch.category !== undefined) {
        if (patch.category === 'all') next.delete('category');
        else next.set('category', patch.category);
      }
      if (patch.tech !== undefined) {
        if (patch.tech === null) next.delete('tech');
        else next.set('tech', patch.tech);
      }
      const search = next.toString();
      navigate({ search: search ? `?${search}` : '', hash: location.hash }, { replace: true, preventScrollReset: true });
    },
    [params, navigate, location.hash],
  );

  return {
    category,
    tech,
    setCategory: (c: ProjectCategory | 'all') => update({ category: c }),
    setTech: (id: TechId | null) => update({ tech: id }),
    reset: () => update({ category: 'all', tech: null }),
  };
}

/** Jump to the Projects section filtered by a skill (used by Skills and the command palette). */
export function useShowProjects() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  return useCallback(
    (tech: TechId | null) => {
      const next = new URLSearchParams(params);
      next.delete('project');
      next.delete('category');
      if (tech) next.set('tech', tech);
      else next.delete('tech');
      const search = next.toString();
      navigate({ search: search ? `?${search}` : '', hash: `#${sectionIds.projects}` }, { replace: true, preventScrollReset: true });
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      requestAnimationFrame(() =>
        document.getElementById(sectionIds.projects)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }),
      );
    },
    [params, navigate],
  );
}
