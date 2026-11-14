import { FiGithub } from 'react-icons/fi';
import { Logo } from '@/components/shared/Logo/Logo';
import { contacts } from '@/data/contacts';
import { navItems, sectionIds } from '@/data/navigation';
import { profile } from '@/data/profile';
import { useI18n } from '@/i18n';
import styles from './Footer.module.scss';

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <a href={`#${sectionIds.hero}`} className={styles.brand} aria-label={t.nav.home}>
              <Logo />
            </a>
            <p className={styles.tagline}>{t.footer.tagline}</p>
          </div>

          <nav aria-label="Footer" className={styles.col}>
            <ul>
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className={styles.col}>
            {contacts.map((c) => (
              <li key={c.id}>
                <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {c.value}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.github.url} target="_blank" rel="noopener noreferrer" className={styles.github}>
                <FiGithub aria-hidden="true" /> github.com/{profile.github.username}
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {profile.fullName}. {t.footer.rights}
          </p>
          <p className={styles.built}>{t.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
