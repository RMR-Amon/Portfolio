import { FiArrowUpRight, FiGithub, FiMaximize2 } from 'react-icons/fi';
import { Tag } from '@/components/ui/Tag/Tag';
import { TechIcon } from '@/components/shared/TechIcon/TechIcon';
import { categoryLabel } from '@/data/projects';
import { techs } from '@/data/skills';
import { useI18n } from '@/i18n';
import type { Project } from '@/types';
import { ProjectMedia } from './ProjectMedia';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  project: Project;
  onOpen: (slug: string) => void;
}

const MAX_TAGS = 4;

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { t } = useI18n();
  const extra = project.stack.length - MAX_TAGS;

  return (
    <article
      className={styles.card}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
      }}
    >
      <div className={styles.mediaWrap}>
        <ProjectMedia project={project} sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw" />
        <span className={styles.hoverHint} aria-hidden="true">
          <FiMaximize2 /> {t.projects.details}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span>{categoryLabel[project.category]}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
          {project.featured && (
            <Tag tone="accent" className={styles.featured}>
              {t.projects.featured}
            </Tag>
          )}
        </div>

        <h3 className={styles.title}>
          {/* The title button stretches over the whole card (see ::after) */}
          <button type="button" className={styles.open} onClick={() => onOpen(project.slug)}>
            {project.title}
          </button>
        </h3>

        <p className={styles.short}>{project.short}</p>

        <ul className={styles.tags} aria-label={t.projects.modal.stack}>
          {project.stack.slice(0, MAX_TAGS).map((id) => (
            <li key={id}>
              <Tag icon={<TechIcon id={id} />}>{techs[id].name}</Tag>
            </li>
          ))}
          {extra > 0 && (
            <li>
              <Tag>+{extra}</Tag>
            </li>
          )}
        </ul>

        <div className={styles.links}>
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className={styles.link}>
            <FiGithub aria-hidden="true" />
            {t.projects.code}
            <span className="visually-hidden"> — {project.title}</span>
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.linkAccent}`}>
              {t.projects.live}
              <FiArrowUpRight aria-hidden="true" />
              <span className="visually-hidden"> — {project.title}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
