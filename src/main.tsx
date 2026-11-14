import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/jetbrains-mono';
import '@/styles/global.scss';
import App from '@/app/App';

// Single-page site: the app controls scrolling. Automatic restoration would
// jump the page when Back closes a project (?project=…) or after hash links.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// A hello for developers who open DevTools.
console.log(
  '%cR_M_R%c  Hi! Curious how this site works? The source is on GitHub → https://github.com/RMR-Amon/Portfolio\nLet’s talk: https://t.me/maxmudjon_dev',
  'background:linear-gradient(120deg,#22d3ee,#3b82f6);color:#04141a;font-weight:700;padding:4px 8px;border-radius:6px',
  'color:#9aa4b2',
);

/** Fade out the inline preloader from index.html once the app has painted. */
function hidePreloader() {
  const el = document.getElementById('preloader');
  if (!el) return;
  el.classList.add('is-hidden');
  window.setTimeout(() => el.remove(), 600);
}

const start = performance.now();
const MIN_VISIBLE = 350; // avoid a flash on fast connections
requestAnimationFrame(() => {
  const wait = Math.max(0, MIN_VISIBLE - (performance.now() - start));
  window.setTimeout(hidePreloader, wait);
});
