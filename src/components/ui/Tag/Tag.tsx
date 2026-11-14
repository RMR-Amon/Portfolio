import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Tag.module.scss';

interface TagProps {
  children: ReactNode;
  icon?: ReactNode;
  tone?: 'default' | 'accent' | 'success';
  className?: string;
}

export function Tag({ children, icon, tone = 'default', className }: TagProps) {
  return (
    <span className={cn(styles.tag, styles[tone], className)}>
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}
