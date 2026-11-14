# Maxmudjon Raximjonov — Portfolio

Personal portfolio of **Maxmudjon Raximjonov**, Frontend Developer and IT Teacher at MARS IT SCHOOL.
Live: <https://cv-rmr.netlify.app/>

**Stack:** React 19 · TypeScript (strict) · Vite · React Router · SCSS Modules · react-icons · self-hosted variable fonts (Inter, Space Grotesk, JetBrains Mono).

## Scripts

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
npm run lint
```

> On Windows, run the build from a path whose drive letter is upper-case (`C:\…`). With a lower-case `c:\…` working directory, Vite 6 fails on the inline `<style>` in `index.html` (a known Vite issue).

## Project structure

```
src/
├── app/            App (providers + routes) and layouts
├── pages/          HomePage, NotFoundPage
├── sections/       Hero, About, Skills, Projects, Experience, Education, Contact
├── components/
│   ├── ui/         Button, Section, Tag, Modal, Reveal
│   ├── shared/     Logo, TechIcon, Timeline, CvButton, ErrorBoundary
│   └── layout/     Header, Footer, ScrollProgress, BackToTop
├── features/
│   ├── seasonal/        Season detection, canvas particle engine, sun & beach scene
│   └── command-palette/ Ctrl/⌘+K palette (lazy)
├── data/           All content: profile, photos, about, experience, education, skills, projects, contacts
├── i18n/           UI strings (typed dictionaries) + provider
├── hooks/          useInView, useActiveSection, useMediaQuery, useLockBodyScroll, usePersistentState,
│                   useProjectFilters, useGitHubStats
├── utils/          Date/duration helpers, className helper
├── styles/         Design tokens, reset, base; abstracts (mixins/breakpoints) are auto-injected into every module
├── types/          Shared TypeScript types
└── assets/images/  profile/, projects/ (screenshots), logos/
```

Components never hard-code personal facts — everything comes from `src/data`.

## Common tasks

### Add a project
1. Add an entry to `src/data/projects.ts` (slug, texts, stack, repo, optional demo).
2. Add screenshots named after the slug: `src/assets/images/projects/<slug>.webp` (1200×750) and `<slug>-640.webp` (640×400).
   They are picked up automatically; without them the card shows a styled fallback.

### Publish a new CV
Put the PDF into `public/cv/` and set `cv.url` in `src/data/profile.ts`, e.g. `'/cv/Maxmudjon-Raximjonov-CV.pdf'`.
While `cv.url` is `null`, every CV button shows an honest "CV coming soon" state.

### Add a skill
Add the id to `TechId` (`src/types`), register it in `techs` (`src/data/skills.ts`) with its `category`, and map an icon in `components/shared/TechIcon`. Groups are built from the categories automatically.
Project usage counts come from each project's `stack` + `practices` (+ hosting derived from the demo URL) — see `src/utils/skills.ts`. Clicking a skill opens the projects filtered by it (`?tech=<id>`).

### Hero photos
`src/data/photos.ts` lists the gallery photos (4:5, `<name>-880.webp` + `<name>-440.webp` in `src/assets/images/profile/slides`). Backgrounds were blurred locally with a portrait-matting model so only the person stays sharp. Add a photo by dropping the two files there and adding one entry.

### Project filters & deep links
`?category=web-app`, `?tech=react`, `?project=<slug>` — all shareable. Filters live in the URL (`src/hooks/useProjectFilters.ts`).

### Command palette
Press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> (or the search button in the header) to jump to sections, projects, projects-by-skill, contacts and actions. Loaded lazily on first use (`src/features/command-palette`).

### Live GitHub stats
`src/hooks/useGitHubStats.ts` reads public data from the GitHub REST API in the visitor's browser (cached for 30 minutes per session, with loading and error states).

### Add a language
Create `src/i18n/locales/<code>.ts` exporting a `Dictionary`, register it in `src/i18n/dictionaries.ts`, and add a switcher that calls `I18nProvider` with the chosen locale.

### Experience durations
Durations are calculated from `start` / `end` in `src/data/experience.ts` (calendar months, both ends inclusive).
`end: null` marks the current position — its duration updates automatically every month.

## Seasonal effects

The season is taken from the visitor's local date:

| Season | Months | Effect |
| --- | --- | --- |
| Winter | Dec–Feb | Snow with a light wind |
| Spring | Mar–May | Falling cherry-blossom petals and a breeze |
| Summer | Jun–Aug | Sun glow and an animated sea & beach at the bottom of the screen |
| Autumn | Sep–Nov | Falling leaves with a steady wind and gusts |

- Preview any season with `?season=winter|spring|summer|autumn`.
- Visitors can turn effects off with the season button in the header (remembered in `localStorage`).
- Effects are disabled for `prefers-reduced-motion`, pause in hidden tabs, cap the device-pixel-ratio and scale particle count with screen size.

## Deployment (Netlify)

Build command `npm run build`, publish directory `dist`. `public/_redirects` routes every path to `index.html`, so deep links and the 404 page work. SEO files live in `public/` (`robots.txt`, `sitemap.xml`, `og-image.png`, `favicon.svg`, `site.webmanifest`).
