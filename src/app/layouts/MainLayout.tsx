import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress/ScrollProgress';
import { BackToTop } from '@/components/layout/BackToTop/BackToTop';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary/ErrorBoundary';
import { CommandPaletteHost } from '@/features/command-palette/CommandPaletteHost';
import { useI18n } from '@/i18n';

// Decorative and non-critical — loaded after the main bundle.
const SeasonalEffects = lazy(() => import('@/features/seasonal/SeasonalEffects'));

export function MainLayout() {
  const { t } = useI18n();
  return (
    <>
      <a href="#main" className="skip-link">
        {t.meta.skipToContent}
      </a>
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <CommandPaletteHost />
      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <SeasonalEffects />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
