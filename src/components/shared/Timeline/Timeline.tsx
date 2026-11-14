import type { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/utils/cn';
import styles from './Timeline.module.scss';

export function Timeline({ children, label }: { children: ReactNode; label: string }) {
  const { ref, inView } = useInView<HTMLOListElement>({ threshold: 0.05 });
  return (
    <ol ref={ref} className={cn(styles.timeline, inView && styles.drawn)} aria-label={label}>
      {children}
    </ol>
  );
}

interface TimelineItemProps {
  marker: ReactNode;
  current?: boolean;
  children: ReactNode;
}

export function TimelineItem({ marker, current, children }: TimelineItemProps) {
  const { ref, inView } = useInView<HTMLLIElement>();
  return (
    <li ref={ref} className={cn(styles.item, 'reveal', inView && 'is-visible', current && styles.current)}>
      <div className={styles.marker} aria-hidden="true">
        {marker}
      </div>
      <div className={styles.content}>{children}</div>
    </li>
  );
}
