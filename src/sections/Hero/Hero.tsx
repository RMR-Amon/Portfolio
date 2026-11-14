import { useEffect, useRef } from 'react';
import { FiArrowRight, FiSend } from 'react-icons/fi';
import { Button } from '@/components/ui/Button/Button';
import { CvButton } from '@/components/shared/CvButton/CvButton';
import { TechIcon } from '@/components/shared/TechIcon/TechIcon';
import { sectionIds } from '@/data/navigation';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { techs } from '@/data/skills';
import { useI18n } from '@/i18n';
import type { TechId } from '@/types';
import { portraitPhotos } from '@/data/photos';
import { HeroGallery } from './HeroGallery';
import styles from './Hero.module.scss';

const showcase: TechId[] = ['react', 'typescript', 'javascript', 'sass', 'tailwind', 'zustand'];
const [city, country] = profile.location.split(', ');

export function Hero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Pointer-driven spotlight + photo tilt (fine pointers only, skipped for reduced motion).
  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    let raf = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      section.style.setProperty('--mx', `${px - r.left}px`);
      section.style.setProperty('--my', `${py - r.top}px`);
      const c = card.getBoundingClientRect();
      const dx = (px - (c.left + c.width / 2)) / c.width;
      const dy = (py - (c.top + c.height / 2)) / c.height;
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      card.style.setProperty('--ry', `${clamp(dx) * 7}deg`);
      card.style.setProperty('--rx', `${clamp(-dy) * 7}deg`);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    };
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} id={sectionIds.hero} className={styles.hero} tabIndex={-1} aria-labelledby="hero-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.spotlight} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <p className={styles.badge} style={{ animationDelay: '80ms' }}>
            <span className={styles.badgeDot} aria-hidden="true" />
            <span>
              {profile.role} · {city}
              {country && <span className={styles.country}>, {country}</span>}
            </span>
          </p>

          <h1 id="hero-title" className={styles.title} style={{ animationDelay: '160ms' }}>
            <span className={styles.greeting}>{t.hero.greeting}</span>{' '}
            <span className={styles.name}>{profile.displayName}</span>
            <span className="visually-hidden">
              {' '}
              Raximjonov — {profile.role}
            </span>
          </h1>

          <p className={styles.headline} style={{ animationDelay: '240ms' }}>
            {t.hero.headline}
          </p>

          <p className={styles.lead} style={{ animationDelay: '320ms' }}>
            {t.hero.lead}
          </p>

          <div className={styles.actions} style={{ animationDelay: '400ms' }}>
            <Button href={`#${sectionIds.projects}`} size="lg" iconRight={<FiArrowRight />}>
              {t.hero.viewProjects}
            </Button>
            <Button href={`#${sectionIds.contact}`} size="lg" variant="secondary" icon={<FiSend />}>
              {t.hero.contact}
            </Button>
            <CvButton size="lg" />
          </div>

          <div className={styles.stack} style={{ animationDelay: '480ms' }}>
            <span className={styles.stackLabel}>{t.hero.stackLabel}</span>
            <ul className={styles.stackList}>
              {showcase.map((id) => (
                <li key={id} className={styles.stackItem} title={techs[id].name}>
                  <TechIcon id={id} size={18} />
                  <span>{techs[id].name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.visual}>
          <div ref={cardRef} className={styles.card}>
            <HeroGallery photos={portraitPhotos} />

            <div className={`${styles.chip} ${styles.chipCode}`} aria-hidden="true">
              <span className={styles.tagBracket}>{'<'}</span>
              <span className={styles.tagName}>Frontend</span>
              <span className={styles.tagAttr}>{' stack'}</span>
              {'='}
              <span className={styles.tagValue}>{'"react+ts"'}</span>
              <span className={styles.tagBracket}>{' />'}</span>
            </div>

            <div className={`${styles.chip} ${styles.chipStatus}`}>
              <span className={styles.liveDot} aria-hidden="true" />
              <span>
                <small>{t.hero.currently}</small>
                {profile.currentPosition.title} · {profile.currentPosition.company}
              </span>
            </div>

            <a className={`${styles.chip} ${styles.chipProjects}`} href={`#${sectionIds.projects}`}>
              <strong>{projects.length}</strong>
              <span>{t.hero.projectsShowcased}</span>
            </a>
          </div>
        </div>
      </div>

      <a href={`#${sectionIds.about}`} className={styles.scrollCue} aria-label="Scroll to About">
        <span className={styles.mouse} aria-hidden="true" />
      </a>
    </section>
  );
}
