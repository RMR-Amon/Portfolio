import { FiSearch } from 'react-icons/fi';
import { useI18n } from '@/i18n';
import { isMac, palette } from './paletteStore';
import styles from './PaletteTrigger.module.scss';

export function PaletteTrigger() {
  const { t } = useI18n();
  const mac = isMac();
  const mod = mac ? '⌘' : 'Ctrl';

  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={palette.open}
      aria-label={`${t.palette.label} (${mod}+K)`}
      aria-keyshortcuts={mac ? 'Meta+K' : 'Control+K'}
    >
      <FiSearch aria-hidden="true" />
      <span className={styles.label}>{t.palette.trigger}</span>
      <kbd className={styles.kbd} aria-hidden="true">
        {mod} K
      </kbd>
    </button>
  );
}
