import { FiArrowUpRight, FiBriefcase, FiCalendar, FiChevronDown, FiClock, FiMapPin } from 'react-icons/fi';
import { Section } from '@/components/ui/Section/Section';
import { Tag } from '@/components/ui/Tag/Tag';
import { Timeline, TimelineItem } from '@/components/shared/Timeline/Timeline';
import { experience } from '@/data/experience';
import { sectionIds } from '@/data/navigation';
import { useI18n } from '@/i18n';
import type { ExperienceItem } from '@/types';
import { countCalendarMonths, formatMonths, formatYearMonth, toYearMonth } from '@/utils/date';
import styles from './Experience.module.scss';

/** Distinct calendar months across all roles (overlapping months count once). */
function totalMonths(items: ExperienceItem[]): number {
  const months = new Set<number>();
  const now = toYearMonth();
  items.forEach(({ start, end }) => {
    const to = end ?? now;
    for (let k = start.year * 12 + start.month; k <= to.year * 12 + to.month; k++) months.add(k);
  });
  return months.size;
}

export function Experience() {
  const { t } = useI18n();
  const e = t.experience;
  const items = [...experience].reverse(); // current role first

  return (
    <Section
      id={sectionIds.experience}
      index="04"
      eyebrow={e.eyebrow}
      title={e.title}
      lead={e.lead}
      aside={
        <div className={styles.total}>
          <span>{e.total}</span>
          <strong>{formatMonths(totalMonths(experience))}</strong>
        </div>
      }
    >
      <Timeline label={e.title}>
        {items.map((job) => {
          const current = job.end === null;
          const months = countCalendarMonths(job.start, job.end);
          const info = job.companyInfo;
          return (
            <TimelineItem
              key={job.id}
              current={current}
              marker={job.logo ? <img src={job.logo} alt="" width={48} height={48} loading="lazy" /> : <FiBriefcase />}
            >
              <article className={styles.card} aria-labelledby={`job-${job.id}`}>
                <header className={styles.head}>
                  <div className={styles.titles}>
                    <h3 id={`job-${job.id}`} className={styles.company}>
                      {job.company}
                      {job.companyAlias && <span className={styles.alias}>({job.companyAlias})</span>}
                    </h3>
                    <p className={styles.position}>
                      <span className="visually-hidden">{e.position}: </span>
                      {job.position}
                    </p>
                  </div>
                  {current && (
                    <Tag tone="success" className={styles.badge}>
                      <span className={styles.liveDot} aria-hidden="true" />
                      {e.current}
                    </Tag>
                  )}
                </header>

                <ul className={styles.facts}>
                  <li>
                    <FiCalendar aria-hidden="true" />
                    <span>
                      {formatYearMonth(job.start, 'long')} — {current ? e.present : formatYearMonth(job.end!, 'long')}
                    </span>
                  </li>
                  <li>
                    <FiClock aria-hidden="true" />
                    <span>{formatMonths(months)}</span>
                  </li>
                  {job.location && (
                    <li>
                      <FiMapPin aria-hidden="true" />
                      <span>{job.location}</span>
                    </li>
                  )}
                  <li className={styles.industry}>{info.industry}</li>
                </ul>

                <div className={styles.companyBlock}>
                  <p className={styles.label}>{e.aboutCompany}</p>
                  <p className={styles.summary}>{info.summary}</p>

                  <ul className={styles.services} aria-label={e.servicesLabel}>
                    {info.services.map((s) => (
                      <li key={s}>
                        <Tag>{s}</Tag>
                      </li>
                    ))}
                  </ul>

                  <details className={styles.details}>
                    <summary>
                      {e.backgroundLabel}
                      <FiChevronDown aria-hidden="true" />
                    </summary>
                    <ul className={styles.background}>
                      {info.background.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    {info.note && <p className={styles.note}>{info.note}</p>}
                  </details>

                  {info.website && (
                    <a className={styles.website} href={info.website} target="_blank" rel="noopener noreferrer">
                      {info.website.replace(/^https?:\/\//, '')}
                      <FiArrowUpRight aria-hidden="true" />
                      <span className="visually-hidden"> — {e.website}</span>
                    </a>
                  )}
                </div>
              </article>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Section>
  );
}
