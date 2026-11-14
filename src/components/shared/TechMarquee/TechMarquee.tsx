import { techs } from '@/data/skills';
import { useI18n } from '@/i18n';
import type { Tech } from '@/types';
import { TechIcon } from '../TechIcon/TechIcon';
import styles from './TechMarquee.module.scss';

const items = (Object.values(techs) as Tech[]).filter((t) => t.category !== 'practices');

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t.id} className={styles.item}>
          <TechIcon id={t.id} size={20} />
          <span>{t.name}</span>
        </li>
      ))}
    </ul>
  );
}

/** Infinite, pausable strip of every technology (static for reduced motion). */
export function TechMarquee() {
  const { t } = useI18n();
  return (
    <section className={styles.band} aria-label={t.marquee.label}>
      <div className={styles.track}>
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
