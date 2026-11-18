import type { IconType } from 'react-icons';
import {
  SiAxios, SiCss3, SiCssmodules, SiEslint, SiFigma, SiFramer, SiGit, SiGithub, SiGithubactions, SiGithubpages,
  SiHtml5, SiJavascript, SiNetlify, SiNpm, SiPostcss, SiPostgresql, SiPostman, SiPython, SiReact,
  SiReacthookform, SiReactquery, SiReactrouter, SiRedux, SiSass, SiSupabase, SiSwiper, SiTailwindcss,
  SiThreedotjs, SiTypescript, SiVercel, SiVite, SiZod,
} from 'react-icons/si';
import {
  TbAccessible, TbApi, TbArrowsSplit, TbBlocks, TbBrowser, TbBrush, TbChartArcs, TbDatabase, TbDevices,
  TbEye, TbLanguage, TbLock, TbSeo, TbSparkles, TbTestPipe, TbUserShield, TbWaveSine,
} from 'react-icons/tb';
import { techs } from '@/data/skills';
import type { TechId } from '@/types';

const icons: Partial<Record<TechId, IconType>> = {
  html: SiHtml5,
  css: SiCss3,
  javascript: SiJavascript,
  typescript: SiTypescript,
  sql: SiPostgresql,
  python: SiPython,
  react: SiReact,
  'react-router': SiReactrouter,
  tailwind: SiTailwindcss,
  sass: SiSass,
  'css-modules': SiCssmodules,
  'framer-motion': SiFramer,
  swiper: SiSwiper,
  threejs: SiThreedotjs,
  recharts: TbChartArcs,
  'react-hook-form': SiReacthookform,
  redux: SiRedux,
  'context-api': SiReact,
  'tanstack-query': SiReactquery,
  'rest-api': TbApi,
  axios: SiAxios,
  supabase: SiSupabase,
  zod: SiZod,
  'local-storage': TbDatabase,
  dom: TbBrowser,
  canvas: TbBrush,
  'web-audio': TbWaveSine,
  'intersection-observer': TbEye,
  git: SiGit,
  github: SiGithub,
  'github-actions': SiGithubactions,
  vite: SiVite,
  npm: SiNpm,
  eslint: SiEslint,
  postcss: SiPostcss,
  figma: SiFigma,
  postman: SiPostman,
  netlify: SiNetlify,
  vercel: SiVercel,
  'github-pages': SiGithubpages,
  responsive: TbDevices,
  bem: TbBlocks,
  i18n: TbLanguage,
  auth: TbLock,
  rbac: TbUserShield,
  'code-splitting': TbArrowsSplit,
  testing: TbTestPipe,
  a11y: TbAccessible,
  seo: TbSeo,
  animation: TbSparkles,
};

interface TechIconProps {
  id: TechId;
  size?: number | string;
  colored?: boolean;
  className?: string;
}

/** Brand icon for a technology; falls back to a monogram (e.g. Zustand has no official mark). */
export function TechIcon({ id, size = '1em', colored = true, className }: TechIconProps) {
  const Icon = icons[id];
  const color = colored ? techs[id].color : 'currentColor';
  if (Icon) return <Icon size={size} color={color} className={className} aria-hidden="true" focusable="false" />;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="20" height="20" rx="6" fill="none" stroke={color} strokeWidth="1.8" />
      <text x="12" y="16.2" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif" fill={color}>
        {techs[id].name.charAt(0)}
      </text>
    </svg>
  );
}
