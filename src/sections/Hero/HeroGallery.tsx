import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { FiChevronLeft, FiChevronRight, FiPause, FiPlay } from 'react-icons/fi';
import type { PortraitPhoto } from '@/data/photos';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { useI18n } from '@/i18n';
import { cn } from '@/utils/cn';
import styles from './HeroGallery.module.scss';

interface HeroGalleryProps {
  photos: PortraitPhoto[];
  /** Time each photo stays in front while auto-playing (ms). */
  interval?: number;
}

/**
 * Stacked photo deck: the active photo sits in front, the next ones peek out
 * behind it. Auto-advances (synced to the progress bar), pauses on hover/focus
 * and off-screen, supports swipe and arrow keys, and never auto-plays for
 * visitors who prefer reduced motion (WCAG 2.2.2: there is always a pause button).
 */
export function HeroGallery({ photos, interval = 5200 }: HeroGalleryProps) {
  const { t } = useI18n();
  const g = t.hero.gallery;
  const reduced = useReducedMotion();
  const count = photos.length;
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const { ref: viewRef, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.35, rootMargin: '0px' });
  const drag = useRef<{ x: number; y: number; id: number } | null>(null);

  const autoplay = count > 1 && !reduced && !userPaused;
  const running = autoplay && !hover && !focusWithin && inView;

  const go = useCallback(
    (next: number, byUser = true) => {
      setIndex(((next % count) + count) % count);
      if (byUser) setInteracted(true);
    },
    [count],
  );

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(index - 1);
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };
  const onPointerUp = (e: PointerEvent) => {
    const start = drag.current;
    drag.current = null;
    if (!start || start.id !== e.pointerId) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) go(index + (dx < 0 ? 1 : -1));
  };

  if (!count) return null;

  return (
    <div
      ref={viewRef}
      className={styles.gallery}
      role="region"
      aria-roledescription="carousel"
      aria-label={g.label}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
      }}
    >
      <div
        className={styles.deck}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (drag.current = null)}
      >
        {photos.map((photo, i) => {
          const offset = (i - index + count) % count;
          return (
            <div
              key={photo.id}
              className={styles.slide}
              data-offset={Math.min(offset, 3)}
              role="group"
              aria-roledescription="slide"
              aria-label={g.slide(i + 1, count)}
              aria-hidden={offset !== 0}
              onClick={offset !== 0 ? () => go(i) : undefined}
            >
              <img
                src={photo.src}
                srcSet={photo.srcSet}
                sizes="(min-width: 1024px) 440px, (min-width: 768px) 380px, 84vw"
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                style={photo.position ? { objectPosition: photo.position } : undefined}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                decoding="async"
                draggable={false}
              />
              <span className={styles.shade} aria-hidden="true" />
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <div className={styles.controls}>
          <button type="button" className={styles.arrow} onClick={() => go(index - 1)} aria-label={g.prev}>
            <FiChevronLeft aria-hidden="true" />
          </button>

          <div className={styles.dots}>
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                type="button"
                className={cn(styles.dot, i === index && styles.dotActive)}
                onClick={() => go(i)}
                aria-label={g.goTo(i + 1)}
                aria-current={i === index ? 'true' : undefined}
              >
                {i === index && autoplay && (
                  <span
                    key={index}
                    className={styles.progress}
                    style={{ animationDuration: `${interval}ms`, animationPlayState: running ? 'running' : 'paused' }}
                    onAnimationEnd={() => go(index + 1, false)}
                  />
                )}
              </button>
            ))}
          </div>

          <button type="button" className={styles.arrow} onClick={() => go(index + 1)} aria-label={g.next}>
            <FiChevronRight aria-hidden="true" />
          </button>

          {!reduced && (
            <button
              type="button"
              className={styles.arrow}
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? g.play : g.pause}
              aria-pressed={userPaused}
            >
              {userPaused ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}
            </button>
          )}
        </div>
      )}

      <p className="visually-hidden" aria-live={interacted ? 'polite' : 'off'} aria-atomic="true">
        {g.slide(index + 1, count)}
      </p>
    </div>
  );
}
