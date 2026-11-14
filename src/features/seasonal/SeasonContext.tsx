import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePersistentState } from '@/hooks/usePersistentState';
import type { Season } from '@/types';
import { resolveSeason, seasonFromDate } from './season';

interface SeasonValue {
  season: Season;
  enabled: boolean;
  setEnabled: (v: boolean) => void;
}

const SeasonContext = createContext<SeasonValue>({ season: 'autumn', enabled: false, setEnabled: () => {} });

export function SeasonProvider({ children }: { children: ReactNode }) {
  const [season, setSeason] = useState<Season>(resolveSeason);
  const [enabled, setEnabled] = usePersistentState('rmr:seasonal-effects', true);

  // Keep the season correct for visitors who leave the tab open across a season change.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!new URLSearchParams(window.location.search).has('season')) setSeason(seasonFromDate());
    }, 60 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.season = season;
  }, [season]);

  const value = useMemo(() => ({ season, enabled, setEnabled }), [season, enabled, setEnabled]);
  return <SeasonContext.Provider value={value}>{children}</SeasonContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSeason = () => useContext(SeasonContext);
