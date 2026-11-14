import type { CSSProperties, PointerEvent } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Section } from '@/components/ui/Section/Section';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { TechIcon } from '@/components/shared/TechIcon/TechIcon';
import { sectionIds } from '@/data/navigation';
import { projects } from '@/data/projects';
import { skillGroups, techs } from '@/data/skills';
import { useShowProjects } from '@/hooks/useProjectFilters';
import { useI18n } from '@/i18n';
import type { TechId } from '@/types';
import { usageCount } from '@/utils/skills';
import styles from './Skills.module.scss';

const totalSkills = Object.keys(techs).length;

/** Sets the pointer position on the hovered card for the border glow. */
const trackPointer = (e: PointerEvent<HTMLElement>) => {
  const card = (e.target as HTMLElement).closest<HTMLElement>('[data-glow]');
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--x', `${e.clientX - r.left}px`);
  card.style.setProperty('--y', `${e.clientY - r.top}px`);
};

function SkillRow({ id, onShow }: { id: TechId; onShow: (id: TechId) => void }) {
  const { t } = useI18n();
  const tech = techs[id];
  const n = usageCount(id);
  const detail = tech.note ?? tech.evidence;
  const content = (
    <>
      <span className={styles.icon} aria-hidden="true">
        <TechIcon id={id} size={18} />
      </span>
      <span className={styles.itemBody}>
        <span className={styles.name}>{tech.name}</span>
        {detail && <span className={styles.note}>{detail}</span>}
      </span>
      {n > 0 && (
        <span className={styles.count}>
          {t.skills.usedIn(n)}
          <FiArrowRight className={styles.go} aria-hidden="true" />
        </span>
      )}
    </>
  );

  return (
    <li style={{ '--brand': tech.color } as CSSProperties}>
      {n > 0 ? (
        <button
          type="button"
          className={styles.item}
          onClick={() => onShow(id)}
          aria-label={`${tech.name} — ${t.skills.showProjects(n)}`}
        >
          {content}
        </button>
      ) : (
        <div className={`${styles.item} ${styles.static}`}>{content}</div>
      )}
    </li>
  );
}

export function Skills() {
  const { t } = useI18n();
  const showProjects = useShowProjects();

  return (
    <Section id={sectionIds.skills} index="02" eyebrow={t.skills.eyebrow} title={t.skills.title} lead={t.skills.lead}>
      <Reveal className={styles.summary}>
        <dl>
          <div>
            <dt>{t.skills.summary.skills}</dt>
            <dd>{totalSkills}</dd>
          </div>
          <div>
            <dt>{t.skills.summary.areas}</dt>
            <dd>{skillGroups.length}</dd>
          </div>
          <div>
            <dt>{t.skills.summary.projects}</dt>
            <dd>{projects.length}</dd>
          </div>
        </dl>
        <p>{t.skills.hint}</p>
      </Reveal>

      <div className={styles.masonry} onPointerMove={trackPointer}>
        {skillGroups.map((group, gi) => (
          <Reveal key={group.id} delay={(gi % 3) * 80} className={styles.cell}>
            <article data-glow className={styles.card} aria-labelledby={`skills-${group.id}`}>
              <header className={styles.cardHead}>
                <span className={styles.cardIndex}>
                  0{gi + 1}
                  <span>{t.skills.groupCount(group.items.length)}</span>
                </span>
                <h3 id={`skills-${group.id}`}>{group.title}</h3>
                <p>{group.description}</p>
              </header>
              <ul className={styles.list}>
                {group.items.map((id) => (
                  <SkillRow key={id} id={id} onShow={showProjects} />
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
