import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  FiArrowUp, FiCheck, FiCopy, FiCornerDownLeft, FiDownload, FiFolder, FiGithub, FiHash, FiMail, FiPhone, FiSearch,
} from 'react-icons/fi';
import { SiTelegram } from 'react-icons/si';
import { PiSparkleBold } from 'react-icons/pi';
import { TechIcon } from '@/components/shared/TechIcon/TechIcon';
import { contacts } from '@/data/contacts';
import { navItems, sectionIds } from '@/data/navigation';
import { profile } from '@/data/profile';
import { categoryLabel, projects } from '@/data/projects';
import { techs } from '@/data/skills';
import { useSeason } from '@/features/seasonal/SeasonContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useShowProjects } from '@/hooks/useProjectFilters';
import { useI18n } from '@/i18n';
import type { Tech } from '@/types';
import { cn } from '@/utils/cn';
import { usageCount } from '@/utils/skills';
import { palette } from './paletteStore';
import styles from './CommandPalette.module.scss';

type Group = 'navigate' | 'projects' | 'skills' | 'contact' | 'actions';

interface Command {
  id: string;
  group: Group;
  label: string;
  hint?: string;
  icon: ReactNode;
  keywords?: string;
  /** Keep the palette open while running (e.g. to show feedback). */
  keepOpen?: boolean;
  run: () => void;
}

const GROUP_ORDER: Group[] = ['navigate', 'projects', 'skills', 'contact', 'actions'];

const normalize = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

/** Simple ranking: label prefix > word prefix > substring > keyword match. */
function score(cmd: Command, q: string): number {
  if (!q) return 1;
  const label = normalize(cmd.label);
  if (label.startsWith(q)) return 4;
  if (label.split(/[\s—·/-]+/).some((w) => w.startsWith(q))) return 3;
  if (label.includes(q)) return 2;
  if (cmd.keywords && normalize(cmd.keywords).includes(q)) return 1;
  return 0;
}

const scrollToId = (id: string) => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
};

export default function CommandPalette() {
  const { t } = useI18n();
  const p = t.palette;
  const { enabled, setEnabled } = useSeason();
  const showProjects = useShowProjects();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const listId = useId();
  useLockBodyScroll(true);

  // Remember what had focus, focus the input, and restore focus on close.
  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    return () => restoreRef.current?.focus?.({ preventScroll: true });
  }, []);

  const commands = useMemo<Command[]>(() => {
    const list: Command[] = [
      {
        id: 'nav-top',
        group: 'navigate',
        label: t.nav.home,
        icon: <FiHash />,
        keywords: 'hero start top',
        run: () => scrollToId(sectionIds.hero),
      },
      ...navItems.map<Command>((n) => ({
        id: `nav-${n.id}`,
        group: 'navigate',
        label: n.label,
        icon: <FiHash />,
        run: () => scrollToId(n.id),
      })),
      ...projects.map<Command>((pr) => ({
        id: `project-${pr.slug}`,
        group: 'projects',
        label: pr.title,
        hint: `${categoryLabel[pr.category]} · ${pr.year}`,
        icon: <FiFolder />,
        keywords: `${pr.short} ${pr.stack.map((s) => techs[s].name).join(' ')}`,
        run: () => {
          const next = new URLSearchParams(params);
          next.set('project', pr.slug);
          navigate({ search: `?${next}`, hash: location.hash }, { preventScrollReset: true });
        },
      })),
      ...(Object.values(techs) as Tech[])
        .filter((tech) => usageCount(tech.id) > 0)
        .map<Command>((tech) => ({
          id: `skill-${tech.id}`,
          group: 'skills',
          label: p.projectsUsing(tech.name),
          hint: t.skills.usedIn(usageCount(tech.id)),
          icon: <TechIcon id={tech.id} />,
          keywords: tech.name,
          run: () => showProjects(tech.id),
        })),
      ...contacts.map<Command>((c) => ({
        id: `contact-${c.id}`,
        group: 'contact',
        label: `${c.label} — ${c.value}`,
        hint: c.action,
        icon: c.id === 'telegram' ? <SiTelegram /> : c.id === 'phone' ? <FiPhone /> : <FiMail />,
        run: () => {
          if (c.external) window.open(c.href, '_blank', 'noopener,noreferrer');
          else window.location.href = c.href;
        },
      })),
      {
        id: 'copy-email',
        group: 'actions',
        label: copied ? p.actions.copied : p.actions.copyEmail,
        icon: copied ? <FiCheck /> : <FiCopy />,
        keywords: 'clipboard mail',
        keepOpen: true,
        run: () => {
          const email = contacts.find((c) => c.id === 'email')?.value ?? '';
          navigator.clipboard
            ?.writeText(email)
            .then(() => {
              setCopied(true);
              window.setTimeout(palette.close, 700);
            })
            .catch(() => palette.close());
        },
      },
      {
        id: 'github',
        group: 'actions',
        label: p.actions.github,
        icon: <FiGithub />,
        run: () => void window.open(profile.github.url, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'effects',
        group: 'actions',
        label: enabled ? p.actions.effectsOff : p.actions.effectsOn,
        icon: <PiSparkleBold />,
        keywords: 'season snow leaves petals summer winter autumn spring',
        run: () => setEnabled(!enabled),
      },
      ...(profile.cv.url
        ? [
            {
              id: 'cv',
              group: 'actions' as const,
              label: p.actions.cv,
              icon: <FiDownload />,
              keywords: 'resume',
              run: () => void window.open(profile.cv.url!, '_blank', 'noopener'),
            },
          ]
        : []),
      {
        id: 'top',
        group: 'actions',
        label: p.actions.top,
        icon: <FiArrowUp />,
        run: () => scrollToId(sectionIds.hero),
      },
    ];
    return list;
  }, [t, p, params, navigate, location.hash, showProjects, enabled, setEnabled, copied]);

  const q = normalize(query.trim());
  const results = useMemo(() => {
    if (!q) {
      // Short, useful default list.
      return commands.filter(
        (c) =>
          c.group === 'navigate' ||
          c.group === 'contact' ||
          c.group === 'actions' ||
          (c.group === 'projects' && projects.find((pr) => `project-${pr.slug}` === c.id)?.featured),
      );
    }
    const scored = commands.map((c) => ({ c, s: score(c, q) })).filter((x) => x.s > 0);
    // Groups are ordered by their best match (so "three" shows "Projects using Three.js"
    // before projects that merely mention it), then by the default group order.
    const best = new Map<Group, number>();
    scored.forEach(({ c, s }) => best.set(c.group, Math.max(best.get(c.group) ?? 0, s)));
    return scored
      .sort(
        (a, b) =>
          best.get(b.c.group)! - best.get(a.c.group)! ||
          GROUP_ORDER.indexOf(a.c.group) - GROUP_ORDER.indexOf(b.c.group) ||
          b.s - a.s,
      )
      .map((x) => x.c)
      .slice(0, 40);
  }, [commands, q]);

  // Keep the active option valid and visible.
  const current = Math.min(active, Math.max(results.length - 1, 0));
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${current}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [current]);

  // Close first, then run: the palette locks page scroll and owns focus while open,
  // so scrolling / opening a project must happen after it is gone.
  const execute = (cmd: Command | undefined) => {
    if (!cmd) return;
    if (cmd.keepOpen) return cmd.run();
    palette.close();
    window.setTimeout(cmd.run, 30);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((current + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((current - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      execute(results[current]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      palette.close();
    } else if (e.key === 'Tab') {
      e.preventDefault(); // focus stays in the input (combobox pattern)
    }
  };

  let lastGroup: Group | null = null;
  const optionId = (i: number) => `${listId}-opt-${i}`;

  return createPortal(
    <div className={styles.root}>
      <div className={styles.backdrop} onClick={palette.close} aria-hidden="true" />
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label={p.label} onKeyDown={onKeyDown}>
        <div className={styles.inputRow}>
          <FiSearch className={styles.searchIcon} aria-hidden="true" />
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder={p.placeholder}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={results.length ? optionId(current) : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" className={styles.esc} onClick={palette.close} aria-label={p.close}>
            Esc
          </button>
        </div>

        <ul ref={listRef} id={listId} className={styles.list} role="listbox" aria-label={p.label}>
          {results.length === 0 && <li className={styles.empty}>{p.empty}</li>}
          {results.map((cmd, i) => {
            const header = cmd.group !== lastGroup ? cmd.group : null;
            lastGroup = cmd.group;
            return (
              <li key={cmd.id} role="presentation">
                {header && (
                  <div className={styles.groupLabel} role="presentation">
                    {p.groups[header]}
                  </div>
                )}
                <div
                  id={optionId(i)}
                  data-index={i}
                  role="option"
                  aria-selected={i === current}
                  className={cn(styles.option, i === current && styles.optionActive)}
                  onMouseMove={() => i !== current && setActive(i)}
                  onClick={() => execute(cmd)}
                >
                  <span className={styles.optIcon} aria-hidden="true">
                    {cmd.icon}
                  </span>
                  <span className={styles.optLabel}>{cmd.label}</span>
                  {cmd.hint && <span className={styles.optHint}>{cmd.hint}</span>}
                  <FiCornerDownLeft className={styles.enter} aria-hidden="true" />
                </div>
              </li>
            );
          })}
        </ul>

        <footer className={styles.footer} aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> {p.keys.move}
          </span>
          <span>
            <kbd>↵</kbd> {p.keys.select}
          </span>
          <span>
            <kbd>Esc</kbd> {p.keys.close}
          </span>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
