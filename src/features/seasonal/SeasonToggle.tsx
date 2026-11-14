import type { IconType } from 'react-icons';
import { PiFlowerBold, PiLeafBold, PiSnowflakeBold, PiSunBold } from 'react-icons/pi';
import { useI18n } from '@/i18n';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import type { Season } from '@/types';
import { cn } from '@/utils/cn';
import { useSeason } from './SeasonContext';
import styles from './SeasonToggle.module.scss';

const ICONS: Record<Season, IconType> = {
  winter: PiSnowflakeBold,
  spring: PiFlowerBold,
  summer: PiSunBold,
  autumn: PiLeafBold,
};

/** Header button that turns the seasonal ambience on/off. */
export function SeasonToggle() {
  const { t } = useI18n();
  const { season, enabled, setEnabled } = useSeason();
  const reduced = useReducedMotion();
  if (reduced) return null;

  const Icon = ICONS[season];
  const label = `${t.seasons.names[season]} — ${enabled ? t.seasons.toggleOff : t.seasons.toggleOn}`;

  return (
    <button
      type="button"
      className={cn(styles.toggle, enabled && styles.on, styles[season])}
      onClick={() => setEnabled(!enabled)}
      aria-pressed={enabled}
      aria-label={label}
      title={label}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}
