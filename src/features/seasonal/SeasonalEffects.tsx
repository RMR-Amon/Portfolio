import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { useSeason } from './SeasonContext';
import { createSeasonEngine } from './engine/engine';
import { Beach } from './components/Beach';
import { Sun } from './components/Sun';
import styles from './SeasonalEffects.module.scss';

/**
 * Season-aware ambience (loaded lazily):
 * winter — snow & light wind · spring — falling petals & breeze ·
 * summer — sunshine with a beach and sea at the bottom · autumn — falling leaves & wind.
 * Disabled entirely for users who prefer reduced motion.
 */
export default function SeasonalEffects() {
  const { season, enabled } = useSeason();
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const active = enabled && !reduced;

  useEffect(() => {
    document.documentElement.dataset.effects = active ? 'on' : 'off';
    if (!active || !canvasRef.current) return;
    const engine = createSeasonEngine(canvasRef.current, season);
    return () => engine.destroy();
  }, [active, season]);

  if (!active) return null;

  return (
    <>
      {season === 'summer' && <Sun />}
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      {season === 'summer' && <Beach />}
    </>
  );
}
