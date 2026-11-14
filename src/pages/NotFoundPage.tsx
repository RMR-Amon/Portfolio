import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Logo } from '@/components/shared/Logo/Logo';
import { useI18n } from '@/i18n';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  const { t } = useI18n();

  useEffect(() => {
    const prev = document.title;
    document.title = `404 — ${t.notFound.title} · Maxmudjon Raximjonov`;
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !robots;
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex';
    return () => {
      document.title = prev;
      if (created) robots?.remove();
    };
  }, [t.notFound.title]);

  return (
    <main className={styles.page} id="main">
      <Link to="/" className={styles.logo} aria-label={t.nav.home}>
        <Logo />
      </Link>
      <div className={styles.center}>
        <p className={styles.code} aria-hidden="true">
          4<span>0</span>4
        </p>
        <h1 className={styles.title}>{t.notFound.title}</h1>
        <p className={styles.text}>{t.notFound.text}</p>
        <pre className={styles.terminal} aria-hidden="true">
          <span>$</span> cd {typeof window !== 'undefined' ? window.location.pathname : '/'}
          {'\n'}
          <span className={styles.err}>bash: no such file or directory</span>
        </pre>
        <Link to="/" className={styles.back}>
          <FiArrowLeft aria-hidden="true" /> {t.notFound.back}
        </Link>
      </div>
    </main>
  );
}
