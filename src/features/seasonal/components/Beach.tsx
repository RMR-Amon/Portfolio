import styles from './Beach.module.scss';

/**
 * One seamless wave tile (1200 units wide, a whole number of sine periods) —
 * rendered twice side by side and slid horizontally for an endless loop.
 */
const crestLine = (amp: number, y: number, periods = 2, phase = 0) => {
  const points: string[] = [];
  for (let x = 0; x <= 1200; x += 20) {
    const v = y + amp * Math.sin((x / 1200) * periods * Math.PI * 2 + phase);
    points.push(`${x} ${v.toFixed(1)}`);
  }
  return `M${points.join(' L')}`;
};

interface WaveProps {
  className: string;
  amp: number;
  y: number;
  periods?: number;
  phase?: number;
  foam?: boolean;
}

function WaveLayer({ className, amp, y, periods = 2, phase = 0, foam = false }: WaveProps) {
  const crest = crestLine(amp, y, periods, phase);
  const fill = `${crest} V 120 H 0 Z`;
  const tile = (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path className={styles.fill} d={fill} />
      {/* Foam is a separate open path so only the crest is stroked */}
      {foam && <path className={styles.crest} d={crest} />}
    </svg>
  );
  return (
    <div className={`${styles.wave} ${className}`}>
      {tile}
      {tile}
    </div>
  );
}

/** Animated sea and beach along the bottom of the screen (summer). */
export function Beach() {
  return (
    <div className={styles.beach} aria-hidden="true">
      <div className={styles.sea}>
        <WaveLayer className={styles.back} amp={10} y={34} periods={2} phase={1} />
        <WaveLayer className={styles.mid} amp={12} y={46} periods={3} phase={2} />
        <div className={styles.glints}>
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} style={{ left: `${(i * 7.3 + 3) % 100}%`, top: `${30 + ((i * 17) % 40)}%`, animationDelay: `${(i * 0.37) % 3}s` }} />
          ))}
        </div>
        <WaveLayer className={styles.front} amp={8} y={62} periods={4} foam />
      </div>
      <div className={styles.sand}>
        <div className={styles.foam} />
      </div>
      <svg className={styles.palm} viewBox="0 0 120 120">
        <path d="M58 120c2-26 6-50 16-74" fill="none" strokeWidth="5" strokeLinecap="round" />
        <path d="M74 46c-14-12-34-14-48-6 16-2 30 2 44 10M74 46c10-16 28-22 44-18-14 2-28 10-40 22M74 46c-2-16-12-28-26-34 10 8 18 20 22 36M74 46c16-4 32 2 42 14-12-6-26-8-40-10M74 46c-16 0-30 8-36 22 8-10 22-16 34-18" />
      </svg>
    </div>
  );
}
