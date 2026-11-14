import styles from './Sun.module.scss';

/** Warm sun glow with slowly turning rays in the top corner (summer). */
export function Sun() {
  return (
    <div className={styles.sun} aria-hidden="true">
      <div className={styles.rays} />
      <div className={styles.core} />
    </div>
  );
}
