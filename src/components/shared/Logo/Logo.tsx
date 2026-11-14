import { cn } from '@/utils/cn';
import styles from './Logo.module.scss';

/** R_M_R brand mark + wordmark. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn(styles.logo, className)}>
      <svg className={styles.mark} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="#0f1520" />
        <rect x=".75" y=".75" width="62.5" height="62.5" rx="15.25" fill="none" stroke="rgba(34,211,238,.3)" strokeWidth="1.5" />
        <path
          d="M18 44V20h11a7 7 0 0 1 0 14H18m11 0 6 10M38 44V20l7 12 7-12v24"
          fill="none"
          stroke="url(#logo-g)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {!compact && (
        <span className={styles.word}>
          R<span>_</span>M<span>_</span>R
        </span>
      )}
    </span>
  );
}
