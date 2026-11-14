import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Reveal } from '../Reveal/Reveal';
import styles from './Section.module.scss';

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Page section with a consistent numbered header. */
export function Section({ id, index, eyebrow, title, lead, aside, className, children }: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn(styles.section, className)}>
      <div className="container">
        <Reveal className={styles.header}>
          <div className={styles.headText}>
            <p className={styles.eyebrow}>
              <span className={styles.index}>{index}</span>
              <span className={styles.line} aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 id={headingId} className={styles.title}>
              {title}
            </h2>
            {lead && <p className={styles.lead}>{lead}</p>}
          </div>
          {aside && <div className={styles.aside}>{aside}</div>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
