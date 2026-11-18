/** Calendar month — `month` is 1-based (1 = January). */
export interface YearMonth {
  year: number;
  month: number;
}

export type TechId =
  // languages
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'sql'
  | 'python'
  // frameworks & UI
  | 'react'
  | 'react-router'
  | 'tailwind'
  | 'sass'
  | 'css-modules'
  | 'framer-motion'
  | 'swiper'
  | 'threejs'
  | 'recharts'
  | 'react-hook-form'
  // state
  | 'redux'
  | 'zustand'
  | 'context-api'
  | 'tanstack-query'
  // data & backend
  | 'rest-api'
  | 'axios'
  | 'supabase'
  | 'zod'
  | 'local-storage'
  // browser APIs
  | 'dom'
  | 'canvas'
  | 'web-audio'
  | 'intersection-observer'
  // tools
  | 'git'
  | 'github'
  | 'github-actions'
  | 'vite'
  | 'npm'
  | 'eslint'
  | 'postcss'
  | 'figma'
  | 'postman'
  // deployment
  | 'netlify'
  | 'vercel'
  | 'github-pages'
  // practices
  | 'responsive'
  | 'bem'
  | 'i18n'
  | 'auth'
  | 'rbac'
  | 'code-splitting'
  | 'testing'
  | 'a11y'
  | 'seo'
  | 'animation';

export type SkillCategory =
  | 'languages'
  | 'frontend'
  | 'state'
  | 'data'
  | 'browser'
  | 'tooling'
  | 'deploy'
  | 'practices';

export interface Tech {
  id: TechId;
  name: string;
  /** Brand colour used for the icon tint. */
  color: string;
  category: SkillCategory;
  /** Short "how I use it" line. */
  note?: string;
  /** Where the skill was used when it isn't part of a showcased project. */
  evidence?: string;
}

export interface SkillGroup {
  id: SkillCategory;
  title: string;
  description: string;
  items: TechId[];
}

export interface CompanyInfo {
  /** What the company does — verified from public sources. */
  summary: string;
  industry: string;
  services: string[];
  background: string[];
  website?: string;
  /** Notes about information that could not be verified. */
  note?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  /** Secondary name, e.g. the brand the company operates. */
  companyAlias?: string;
  position: string;
  logo?: string;
  start: YearMonth;
  /** `null` = current position. */
  end: YearMonth | null;
  location?: string;
  companyInfo: CompanyInfo;
}

export interface EducationItem {
  id: string;
  institution: string;
  program: string;
  logo?: string;
  /** Free-form period label — kept exactly as originally provided. */
  period?: string;
  duration: string;
  summary: string;
  highlights: string[];
  credentials?: string[];
}

export type ProjectCategory = 'web-app' | 'e-commerce' | 'landing' | 'game';

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: number;
  featured?: boolean;
  short: string;
  description: string;
  purpose: string;
  problem: string;
  features: string[];
  /** Main technologies (shown as tags). */
  stack: TechId[];
  /** Additional skills applied (APIs, practices). Hosting is derived from `demo`. */
  practices?: TechId[];
  repo: string;
  demo?: string;
  /** Extra context shown in the details view (e.g. demo credentials). */
  note?: string;
}

export interface ContactChannel {
  id: 'telegram' | 'phone' | 'email';
  label: string;
  value: string;
  href: string;
  action: string;
  external?: boolean;
}

export type Season = 'winter' | 'spring' | 'summer' | 'autumn';
