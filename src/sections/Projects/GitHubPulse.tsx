import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { profile } from '@/data/profile';
import { useGitHubStats } from '@/hooks/useGitHubStats';
import { useI18n } from '@/i18n';
import styles from './GitHubPulse.module.scss';

/** GitHub linguist colours. */
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  CSS: '#663399',
  HTML: '#e34c26',
  SCSS: '#c6538c',
  Python: '#3572A5',
};

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
function timeAgo(iso: string): string {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const steps: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unit, secs] of steps) if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
  return rtf.format(Math.round(diff), 'second');
}

/** Live card: public repositories, latest push and language mix from the GitHub API. */
export function GitHubPulse() {
  const { t } = useI18n();
  const g = t.github;
  const state = useGitHubStats(profile.github.username);

  return (
    <aside className={styles.card} aria-label={g.title} aria-busy={state.status === 'loading'}>
      <header className={styles.head}>
        <span className={styles.live}>
          <span className={state.status === 'error' ? `${styles.dot} ${styles.dotOff}` : styles.dot} aria-hidden="true" />
          {g.title}
        </span>
        <a href={profile.github.url} target="_blank" rel="noopener noreferrer" className={styles.profile}>
          <FiGithub aria-hidden="true" />
          {profile.github.username}
          <span className="visually-hidden"> — {g.open}</span>
        </a>
      </header>

      {state.status === 'loading' && (
        <div className={styles.skeleton} role="status">
          <span className="visually-hidden">{g.loading}</span>
          <span />
          <span />
          <span />
        </div>
      )}

      {state.status === 'error' && (
        <p className={styles.error}>
          {g.error}{' '}
          <a href={profile.github.url} target="_blank" rel="noopener noreferrer">
            {g.open} <FiArrowUpRight aria-hidden="true" />
          </a>
        </p>
      )}

      {state.status === 'ready' && (
        <>
          <dl className={styles.stats}>
            <div>
              <dt>{g.repos}</dt>
              <dd>{state.data.publicRepos}</dd>
            </div>
            {state.data.lastPush && (
              <div className={styles.push}>
                <dt>{g.lastPush}</dt>
                <dd>
                  <a href={state.data.lastPush.url} target="_blank" rel="noopener noreferrer">
                    {state.data.lastPush.name}
                  </a>
                  <time dateTime={state.data.lastPush.pushedAt}>{timeAgo(state.data.lastPush.pushedAt)}</time>
                </dd>
              </div>
            )}
          </dl>

          {state.data.languages.length > 0 && (
            <div className={styles.langs}>
              <p className={styles.langTitle}>{g.languages}</p>
              <div className={styles.bar} aria-hidden="true">
                {state.data.languages.map((l) => (
                  <span
                    key={l.name}
                    style={{ flexGrow: l.count, background: LANG_COLORS[l.name] ?? '#8b949e' }}
                    title={`${l.name} ${Math.round(l.share * 100)}%`}
                  />
                ))}
              </div>
              <ul className={styles.legend}>
                {state.data.languages.slice(0, 5).map((l) => (
                  <li key={l.name}>
                    <span className={styles.swatch} style={{ background: LANG_COLORS[l.name] ?? '#8b949e' }} aria-hidden="true" />
                    {l.name}
                    <span className={styles.share}>{Math.round(l.share * 100)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </aside>
  );
}
