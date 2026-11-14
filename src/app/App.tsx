import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary/ErrorBoundary';
import { SeasonProvider } from '@/features/seasonal/SeasonContext';
import { I18nProvider } from '@/i18n';
import HomePage from '@/pages/HomePage';
import { MainLayout } from './layouts/MainLayout';

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export default function App() {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <SeasonProvider>
          <BrowserRouter>
            <div className="page-bg" aria-hidden="true" />
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
              </Route>
              {/* Routes from the previous version of the site */}
              <Route path="/projects" element={<Navigate to="/#projects" replace />} />
              <Route path="/skills" element={<Navigate to="/#skills" replace />} />
              <Route
                path="*"
                element={
                  <Suspense fallback={null}>
                    <NotFoundPage />
                  </Suspense>
                }
              />
            </Routes>
          </BrowserRouter>
        </SeasonProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}
