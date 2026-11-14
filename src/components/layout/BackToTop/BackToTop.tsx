import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { useI18n } from '@/i18n';
import { cn } from '@/utils/cn';
import styles from './BackToTop.module.scss';

export function BackToTop() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    document.getElementById('top')?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      className={cn(styles.button, visible && styles.visible)}
      onClick={toTop}
      aria-label={t.footer.backToTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <FiArrowUp aria-hidden="true" />
    </button>
  );
}
