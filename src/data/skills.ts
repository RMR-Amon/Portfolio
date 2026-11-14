import type { SkillCategory, SkillGroup, Tech, TechId } from '@/types';

/**
 * Every skill shown on the site. Collected from all public repositories on
 * github.com/RMR-Amon (package.json dependencies + source code), plus the
 * stack listed on the GitHub profile.
 * Usage counts are computed from `src/data/projects.ts` (see utils/skills.ts).
 */
export const techs: Record<TechId, Tech> = {
  // ---------- Languages ----------
  html: { id: 'html', name: 'HTML5', color: '#E34F26', category: 'languages', note: 'Semantic, accessible and SEO-friendly page structure.' },
  css: { id: 'css', name: 'CSS3', color: '#2965F1', category: 'languages', note: 'Flexbox, Grid, custom properties, keyframes and media queries.' },
  javascript: { id: 'javascript', name: 'JavaScript', color: '#F7DF1E', category: 'languages', note: 'ES6+, async/await, DOM and API work — clean, reusable code.' },
  typescript: { id: 'typescript', name: 'TypeScript', color: '#3178C6', category: 'languages', note: 'Strict typing that catches errors early and keeps code maintainable.' },
  sql: { id: 'sql', name: 'SQL · PostgreSQL', color: '#4169E1', category: 'languages', note: 'Schemas, RLS policies and PL/pgSQL functions in Supabase.' },
  python: { id: 'python', name: 'Python', color: '#3776AB', category: 'languages', evidence: 'Telegram bot with python-telegram-bot (async handlers)' },

  // ---------- Frameworks & UI ----------
  react: { id: 'react', name: 'React', color: '#61DAFB', category: 'frontend', note: 'Reusable components, hooks and context for dynamic single-page apps.' },
  'react-router': { id: 'react-router', name: 'React Router', color: '#CA4245', category: 'frontend' },
  tailwind: { id: 'tailwind', name: 'Tailwind CSS', color: '#38BDF8', category: 'frontend', note: 'Utility-first styling (v3 and v4) for fast, consistent interfaces.' },
  sass: { id: 'sass', name: 'Sass / SCSS', color: '#CC6699', category: 'frontend', note: 'Variables, nesting, mixins and @use modules for scalable stylesheets.' },
  'css-modules': { id: 'css-modules', name: 'CSS / SCSS Modules', color: '#9AA4B2', category: 'frontend' },
  'framer-motion': { id: 'framer-motion', name: 'Framer Motion', color: '#E64CF5', category: 'frontend' },
  swiper: { id: 'swiper', name: 'Swiper.js', color: '#6332F6', category: 'frontend' },
  threejs: { id: 'threejs', name: 'Three.js', color: '#E5E7EB', category: 'frontend', note: '3D scenes, game physics and AI opponents in the browser.' },
  recharts: { id: 'recharts', name: 'Recharts', color: '#22B5BF', category: 'frontend' },

  // ---------- State ----------
  redux: { id: 'redux', name: 'Redux', color: '#764ABC', category: 'state' },
  zustand: { id: 'zustand', name: 'Zustand', color: '#D9A35B', category: 'state', note: 'Stores with persist middleware.' },
  'context-api': { id: 'context-api', name: 'React Context', color: '#61DAFB', category: 'state' },
  'tanstack-query': { id: 'tanstack-query', name: 'TanStack Query', color: '#FF4154', category: 'state' },

  // ---------- Data & backend ----------
  'rest-api': { id: 'rest-api', name: 'REST APIs', color: '#22D3EE', category: 'data', note: 'fetch / Axios, full CRUD (GET, POST, PUT, DELETE).' },
  axios: { id: 'axios', name: 'Axios', color: '#5A29E4', category: 'data' },
  supabase: { id: 'supabase', name: 'Supabase', color: '#3ECF8E', category: 'data', note: 'Auth, PostgreSQL, Row Level Security, Storage and Edge Functions.' },
  'local-storage': { id: 'local-storage', name: 'Web Storage', color: '#F59E0B', category: 'data' },

  // ---------- Browser APIs ----------
  dom: { id: 'dom', name: 'DOM API', color: '#F7DF1E', category: 'browser' },
  canvas: { id: 'canvas', name: 'Canvas 2D', color: '#F59E0B', category: 'browser', note: 'Particle engines and sprite rendering.' },
  'web-audio': { id: 'web-audio', name: 'Web Audio API', color: '#A78BFA', category: 'browser' },
  'intersection-observer': { id: 'intersection-observer', name: 'Intersection Observer', color: '#34D399', category: 'browser' },

  // ---------- Tools ----------
  git: { id: 'git', name: 'Git', color: '#F05032', category: 'tooling', note: 'Branches, merges and a clean project history.' },
  github: { id: 'github', name: 'GitHub', color: '#E5E7EB', category: 'tooling', note: 'Hosting, version history and Pages deployments.' },
  vite: { id: 'vite', name: 'Vite', color: '#A78BFA', category: 'tooling' },
  npm: { id: 'npm', name: 'npm', color: '#CB3837', category: 'tooling' },
  eslint: { id: 'eslint', name: 'ESLint', color: '#8080F2', category: 'tooling' },
  postcss: { id: 'postcss', name: 'PostCSS', color: '#DD3A0A', category: 'tooling' },
  figma: { id: 'figma', name: 'Figma', color: '#F24E1E', category: 'tooling', note: 'Turning designs into pixel-perfect, responsive layouts.' },
  postman: { id: 'postman', name: 'Postman', color: '#FF6C37', category: 'tooling', note: 'Exploring and testing APIs.' },

  // ---------- Deployment ----------
  netlify: { id: 'netlify', name: 'Netlify', color: '#32E6E2', category: 'deploy' },
  vercel: { id: 'vercel', name: 'Vercel', color: '#E5E7EB', category: 'deploy' },
  'github-pages': { id: 'github-pages', name: 'GitHub Pages', color: '#E5E7EB', category: 'deploy' },

  // ---------- Practices ----------
  responsive: { id: 'responsive', name: 'Responsive design', color: '#22D3EE', category: 'practices' },
  bem: { id: 'bem', name: 'BEM methodology', color: '#60A5FA', category: 'practices' },
  i18n: { id: 'i18n', name: 'i18n (EN · RU · UZ)', color: '#34D399', category: 'practices' },
  auth: { id: 'auth', name: 'Authentication flows', color: '#F472B6', category: 'practices' },
  rbac: { id: 'rbac', name: 'Role-based access', color: '#FB923C', category: 'practices' },
  'code-splitting': { id: 'code-splitting', name: 'Code splitting', color: '#A78BFA', category: 'practices' },
  a11y: { id: 'a11y', name: 'Accessibility', color: '#4ADE80', category: 'practices' },
  seo: { id: 'seo', name: 'SEO', color: '#FACC15', category: 'practices' },
  animation: { id: 'animation', name: 'UI animation', color: '#E879F9', category: 'practices' },
};

const groupMeta: Array<{ id: SkillCategory; title: string; description: string }> = [
  { id: 'languages', title: 'Languages', description: 'What I write every day — and what I reach for beyond the browser.' },
  { id: 'frontend', title: 'Frameworks & UI', description: 'React ecosystem, styling systems, motion, sliders, charts and 3D.' },
  { id: 'state', title: 'State management', description: 'Local, global and server state.' },
  { id: 'data', title: 'Data & backend', description: 'APIs, Backend-as-a-Service and persistence.' },
  { id: 'browser', title: 'Browser APIs', description: 'Platform features used directly, without libraries.' },
  { id: 'tooling', title: 'Tools & workflow', description: 'Version control, builds, linting, design hand-off and API testing.' },
  { id: 'deploy', title: 'Deployment', description: 'Where my projects are hosted.' },
  { id: 'practices', title: 'Practices', description: 'Approaches applied across real projects.' },
];

/** Skill groups in display order; items keep their declaration order above. */
export const skillGroups: SkillGroup[] = groupMeta.map((g) => ({
  ...g,
  items: (Object.values(techs) as Tech[]).filter((t) => t.category === g.id).map((t) => t.id),
}));
