import { lazy, Suspense, useEffect } from 'react';
import { palette, usePaletteOpen } from './paletteStore';

const CommandPalette = lazy(() => import('./CommandPalette'));

/** Global Ctrl/⌘+K shortcut; the palette UI itself is loaded on first use. */
export function CommandPaletteHost() {
  const open = usePaletteOpen();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        palette.toggle();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return <Suspense fallback={null}>{open && <CommandPalette />}</Suspense>;
}
