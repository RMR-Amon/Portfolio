import { FiArrowUpRight, FiCheck, FiGithub, FiInfo } from 'react-icons/fi';
import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import { Tag } from '@/components/ui/Tag/Tag';
import { TechIcon } from '@/components/shared/TechIcon/TechIcon';
import { categoryLabel } from '@/data/projects';
import { techs } from '@/data/skills';
import { useI18n } from '@/i18n';
import type { Project } from '@/types';
import { projectSkills } from '@/utils/skills';
import { ProjectMedia } from './ProjectMedia';
import styles from './ProjectModal.module.scss';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/** Detailed project view (lazy-loaded). */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useI18n();
  const m = t.projects.modal;
  // Practices, APIs and hosting beyond the main stack (git/github/npm are implied everywhere).
  const extras = project
    ? projectSkills(project).filter((id) => !project.stack.includes(id) && !['git', 'github', 'npm'].includes(id))
    : [];

  return (
    <Modal open={Boolean(project)} onClose={onClose} labelledBy="project-modal-title" closeLabel={m.close}>
      {project && (
        <article className={styles.content}>
          <ProjectMedia project={project} sizes="(min-width: 768px) 920px, 100vw" eager className={styles.media} />

          <div className={styles.body}>
            <header className={styles.header}>
              <div className={styles.meta}>
                <Tag tone="accent">{categoryLabel[project.category]}</Tag>
                <Tag>{project.year}</Tag>
                {project.featured && <Tag tone="success">{t.projects.featured}</Tag>}
              </div>
              <h2 id="project-modal-title" className={styles.title}>
                {project.title}
              </h2>
              <p className={styles.short}>{project.short}</p>

              <div className={styles.actions}>
                {project.demo ? (
                  <Button href={project.demo} target="_blank" rel="noopener noreferrer" iconRight={<FiArrowUpRight />}>
                    {m.openDemo}
                  </Button>
                ) : (
                  <Tag>{m.noDemo}</Tag>
                )}
                <Button href={project.repo} target="_blank" rel="noopener noreferrer" variant="secondary" icon={<FiGithub />}>
                  {m.viewCode}
                </Button>
              </div>
              {project.note && (
                <p className={styles.note}>
                  <FiInfo aria-hidden="true" /> {project.note}
                </p>
              )}
            </header>

            <div className={styles.grid}>
              <section className={styles.block} aria-labelledby="pm-overview">
                <h3 id="pm-overview">{m.overview}</h3>
                <p>{project.description}</p>
              </section>

              <div className={styles.pair}>
                <section className={styles.block} aria-labelledby="pm-purpose">
                  <h3 id="pm-purpose">{m.purpose}</h3>
                  <p>{project.purpose}</p>
                </section>
                <section className={styles.block} aria-labelledby="pm-problem">
                  <h3 id="pm-problem">{m.problem}</h3>
                  <p>{project.problem}</p>
                </section>
              </div>

              <section className={styles.block} aria-labelledby="pm-features">
                <h3 id="pm-features">{m.features}</h3>
                <ul className={styles.features}>
                  {project.features.map((f) => (
                    <li key={f}>
                      <FiCheck aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.block} aria-labelledby="pm-stack">
                <h3 id="pm-stack">{m.stack}</h3>
                <ul className={styles.stack}>
                  {project.stack.map((id) => (
                    <li key={id}>
                      <Tag icon={<TechIcon id={id} />}>{techs[id].name}</Tag>
                    </li>
                  ))}
                </ul>
              </section>

              {extras.length > 0 && (
                <section className={styles.block} aria-labelledby="pm-skills">
                  <h3 id="pm-skills">{m.skillsApplied}</h3>
                  <ul className={styles.stack}>
                    {extras.map((id) => (
                      <li key={id}>
                        <Tag tone="accent">{techs[id].name}</Tag>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </article>
      )}
    </Modal>
  );
}
