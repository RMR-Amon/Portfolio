import { FiAward, FiBookOpen, FiCalendar, FiCheck, FiClock } from 'react-icons/fi';
import { Section } from '@/components/ui/Section/Section';
import { Tag } from '@/components/ui/Tag/Tag';
import { Timeline, TimelineItem } from '@/components/shared/Timeline/Timeline';
import { education } from '@/data/education';
import { sectionIds } from '@/data/navigation';
import { useI18n } from '@/i18n';
import styles from './Education.module.scss';

export function Education() {
  const { t } = useI18n();
  const ed = t.education;

  return (
    <Section id={sectionIds.education} index="05" eyebrow={ed.eyebrow} title={ed.title} lead={ed.lead}>
      <Timeline label={ed.title}>
        {education.map((item, i) => (
          <TimelineItem
            key={item.id}
            marker={
              item.logo ? (
                <img src={item.logo} alt="" width={48} height={48} loading="lazy" />
              ) : (
                <span className={styles.iconMarker}>
                  <FiBookOpen />
                </span>
              )
            }
          >
            <article className={styles.card} aria-labelledby={`edu-${item.id}`}>
              <span className={styles.step} aria-hidden="true">
                0{i + 1}
              </span>
              <h3 id={`edu-${item.id}`} className={styles.title}>
                {item.institution}
              </h3>
              <p className={styles.program}>{item.program}</p>

              <ul className={styles.facts}>
                {item.period && (
                  <li>
                    <FiCalendar aria-hidden="true" />
                    {item.period}
                  </li>
                )}
                <li>
                  <FiClock aria-hidden="true" />
                  <span>
                    <span className="visually-hidden">{ed.duration}: </span>
                    {item.duration}
                  </span>
                </li>
              </ul>

              <p className={styles.summary}>{item.summary}</p>

              <ul className={styles.highlights}>
                {item.highlights.map((h) => (
                  <li key={h}>
                    <FiCheck aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {item.credentials && (
                <ul className={styles.credentials}>
                  {item.credentials.map((c) => (
                    <li key={c}>
                      <Tag tone="accent" icon={<FiAward />}>
                        {c}
                      </Tag>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
