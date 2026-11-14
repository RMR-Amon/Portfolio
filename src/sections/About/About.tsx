import { FiCode, FiLayers, FiSmartphone, FiTrendingUp } from 'react-icons/fi';
import { Section } from '@/components/ui/Section/Section';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { CountUp } from '@/components/ui/CountUp/CountUp';
import { about } from '@/data/about';
import { experience } from '@/data/experience';
import { sectionIds } from '@/data/navigation';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { useI18n } from '@/i18n';
import { ageFrom, countCalendarMonths, formatMonths, formatYearMonth } from '@/utils/date';
import styles from './About.module.scss';

const principleIcons = [FiLayers, FiSmartphone, FiCode, FiTrendingUp];

export function About() {
  const { t } = useI18n();
  const age = ageFrom(profile.birth);
  const teaching = experience.find((e) => e.end === null);
  const teachingMonths = teaching ? countCalendarMonths(teaching.start, null) : 0;

  const stats: Array<{ value: string; label: string; num?: number; small?: boolean }> = [
    { value: String(age), num: age, label: t.about.stats.age },
    { value: formatYearMonth(profile.codingSince), label: t.about.stats.coding, small: true },
    { value: String(projects.length), num: projects.length, label: t.about.stats.projects },
    { value: formatMonths(teachingMonths), label: t.about.stats.teaching, small: true },
  ];

  return (
    <Section id={sectionIds.about} index="01" eyebrow={t.about.eyebrow} title={t.about.title}>
      <div className={styles.layout}>
        <div className={styles.story}>
          {about.paragraphs.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 80} className={styles.paragraph}>
              {p.replace('{age}', String(age))}
            </Reveal>
          ))}

          <Reveal as="figure" delay={240} className={styles.quote}>
            <blockquote>
              <p>
                “{profile.quote.text} <span>{profile.quote.accent}</span>”
              </p>
            </blockquote>
            <figcaption>— {profile.quote.author}</figcaption>
          </Reveal>
        </div>

        <div className={styles.side}>
          <Reveal as="dl" className={styles.stats}>
            {stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <dt>{s.label}</dt>
                <dd className={s.small ? styles.statSmall : undefined}>
                  {s.num !== undefined ? <CountUp value={s.num} /> : s.value}
                </dd>
              </div>
            ))}
          </Reveal>

          <Reveal delay={120} className={styles.principles}>
            <h3 className={styles.principlesTitle}>{t.about.principlesTitle}</h3>
            <ul>
              {about.principles.map((p, i) => {
                const Icon = principleIcons[i % principleIcons.length];
                return (
                  <li key={p.title}>
                    <span className={styles.pIcon} aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <strong>{p.title}</strong>
                      <p>{p.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
