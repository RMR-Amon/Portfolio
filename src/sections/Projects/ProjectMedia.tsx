import { useState } from 'react';
import { TechIcon } from '@/components/shared/TechIcon/TechIcon';
import type { Project } from '@/types';
import { getProjectImage } from './projectImages';
import styles from './ProjectMedia.module.scss';

interface ProjectMediaProps {
  project: Project;
  sizes: string;
  eager?: boolean;
  className?: string;
}

/** Real screenshot with lazy loading + skeleton; elegant fallback card when none exists. */
export function ProjectMedia({ project, sizes, eager = false, className }: ProjectMediaProps) {
  const image = getProjectImage(project.slug);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!image || failed) {
    return (
      <div className={`${styles.media} ${styles.fallback} ${className ?? ''}`}>
        <span className={styles.fallbackTitle}>{project.title}</span>
        <span className={styles.fallbackIcons} aria-hidden="true">
          {project.stack.slice(0, 5).map((id) => (
            <TechIcon key={id} id={id} size={20} />
          ))}
        </span>
      </div>
    );
  }

  return (
    <div className={`${styles.media} ${loaded ? styles.loaded : ''} ${className ?? ''}`}>
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={1200}
        height={750}
        alt={`Screenshot of ${project.title}`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
