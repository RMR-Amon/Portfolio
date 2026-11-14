import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FiChevronDown, FiRotateCcw, FiX } from 'react-icons/fi';
import { Section } from '@/components/ui/Section/Section';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { Button } from '@/components/ui/Button/Button';
import { TechIcon } from '@/components/shared/TechIcon/TechIcon';
import { sectionIds } from '@/data/navigation';
import { projectCategories, projects } from '@/data/projects';
import { techs } from '@/data/skills';
import { useProjectFilters } from '@/hooks/useProjectFilters';
import { useI18n } from '@/i18n';
import type { TechId } from '@/types';
import { cn } from '@/utils/cn';
import { projectSkills } from '@/utils/skills';
import { ProjectCard } from './ProjectCard';
import { GitHubPulse } from './GitHubPulse';
import styles from './Projects.module.scss';

const ProjectModal = lazy(() => import('./ProjectModal'));

const INITIAL_COUNT = 6;

/** Main technologies used in at least two projects, most common first. */
const techFilters: TechId[] = (() => {
  const counts = new Map<TechId, number>();
  projects.forEach((p) => p.stack.forEach((id) => counts.set(id, (counts.get(id) ?? 0) + 1)));
  return [...counts.entries()]
    .filter(([id, n]) => n >= 2 && id !== 'vite')
    .sort((a, b) => b[1] - a[1])
    .slice(0, 9)
    .map(([id]) => id);
})();

// Featured first, then projects with a live demo, then newest.
const ordered = [...projects].sort(
  (a, b) =>
    Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
    Number(Boolean(b.demo)) - Number(Boolean(a.demo)) ||
    b.year - a.year,
);
const skillsBySlug = new Map(projects.map((p) => [p.slug, projectSkills(p)]));

export function Projects() {
  const { t } = useI18n();
  const { category, tech, setCategory, setTech, reset } = useProjectFilters();
  const [expanded, setExpanded] = useState(false);

  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const openSlug = params.get('project');
  const openProject = projects.find((p) => p.slug === openSlug) ?? null;

  const filtered = useMemo(
    () =>
      ordered.filter(
        (p) =>
          (category === 'all' || p.category === category) && (!tech || skillsBySlug.get(p.slug)!.includes(tech)),
      ),
    [category, tech],
  );
  // A skill picked elsewhere (e.g. "Supabase") may not be one of the quick chips — show it too.
  const chips = tech && !techFilters.includes(tech) ? [tech, ...techFilters] : techFilters;
  const isFiltered = category !== 'all' || tech !== null;
  const visible = isFiltered || expanded ? filtered : filtered.slice(0, INITIAL_COUNT);

  // The open project lives in the URL (?project=slug) so details are shareable
  // and the browser Back button closes them. The hash is preserved so the
  // page never jumps when the modal opens or closes.
  const open = useCallback(
    (slug: string) => {
      const next = new URLSearchParams(params);
      next.set('project', slug);
      navigate({ search: `?${next}`, hash: location.hash }, { preventScrollReset: true });
    },
    [params, navigate, location.hash],
  );

  // Closing replaces the entry instead of going back: history traversal to a
  // fragment URL (e.g. /#experience) would make the browser re-scroll to it.
  const close = useCallback(() => {
    const next = new URLSearchParams(params);
    next.delete('project');
    const search = next.toString();
    navigate({ search: search ? `?${search}` : '', hash: location.hash }, { replace: true, preventScrollReset: true });
  }, [location.hash, navigate, params]);

  return (
    <Section
      id={sectionIds.projects}
      index="03"
      eyebrow={t.projects.eyebrow}
      title={t.projects.title}
      lead={t.projects.lead}
      aside={<GitHubPulse />}
    >
      <Reveal className={styles.filters}>
        <div className={styles.tabs} role="group" aria-label={t.projects.filterCategory}>
          {projectCategories.map((c) => {
            const count = c.id === 'all' ? projects.length : projects.filter((p) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                type="button"
                className={cn(styles.tab, category === c.id && styles.tabActive)}
                aria-pressed={category === c.id}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
                <span className={styles.tabCount}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.techRow} role="group" aria-label={t.projects.filterTech}>
          <button
            type="button"
            className={cn(styles.chip, tech === null && styles.chipActive)}
            aria-pressed={tech === null}
            onClick={() => setTech(null)}
          >
            {t.projects.anyTech}
          </button>
          {chips.map((id) => (
            <button
              key={id}
              type="button"
              className={cn(styles.chip, tech === id && styles.chipActive)}
              aria-pressed={tech === id}
              onClick={() => setTech(tech === id ? null : id)}
            >
              <TechIcon id={id} />
              {techs[id].name}
              {tech === id && <FiX className={styles.chipClear} aria-hidden="true" />}
            </button>
          ))}
        </div>
      </Reveal>

      <p className={styles.results} aria-live="polite">
        {tech ? t.projects.resultsFor(filtered.length, techs[tech].name) : t.projects.results(filtered.length)}
      </p>

      {filtered.length > 0 ? (
        <ul className={styles.grid}>
          {visible.map((p, i) => (
            <li key={p.slug} className={styles.cell} style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}>
              <ProjectCard project={p} onOpen={open} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <p>{t.projects.empty}</p>
          <Button variant="secondary" size="sm" icon={<FiRotateCcw />} onClick={reset}>
            {t.projects.reset}
          </Button>
        </div>
      )}

      {!isFiltered && filtered.length > INITIAL_COUNT && (
        <div className={styles.more}>
          <Button
            variant="secondary"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            iconRight={<FiChevronDown className={cn(styles.chev, expanded && styles.chevUp)} />}
          >
            {expanded ? t.projects.showLess : t.projects.showAll(filtered.length)}
          </Button>
        </div>
      )}

      <Suspense fallback={null}>{openSlug && <ProjectModal project={openProject} onClose={close} />}</Suspense>
    </Section>
  );
}
