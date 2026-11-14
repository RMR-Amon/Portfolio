import { useId } from 'react';
import { FiClock, FiDownload } from 'react-icons/fi';
import { Button } from '@/components/ui/Button/Button';
import { profile } from '@/data/profile';
import { useI18n } from '@/i18n';
import styles from './CvButton.module.scss';

/**
 * "Download CV" — links to `profile.cv.url` when a CV is published,
 * otherwise renders an honest, non-clickable "coming soon" state.
 */
export function CvButton({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const { t } = useI18n();
  const hintId = useId();
  const { url, fileName } = profile.cv;

  if (url) {
    return (
      <Button href={url} download={fileName} variant="secondary" size={size} icon={<FiDownload />}>
        {t.cv.download}
      </Button>
    );
  }

  return (
    <span className={styles.wrap}>
      <Button variant="ghost" size={size} icon={<FiClock />} aria-disabled="true" aria-describedby={hintId}>
        {t.cv.soon}
      </Button>
      <span id={hintId} role="tooltip" className={styles.hint}>
        {t.cv.soonHint}
      </span>
    </span>
  );
}
