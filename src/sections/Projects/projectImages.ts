/**
 * Screenshots are matched to projects by slug:
 *   src/assets/images/projects/<slug>.webp      — 1200×750
 *   src/assets/images/projects/<slug>-640.webp  — 640×400
 */
const files = import.meta.glob<string>('/src/assets/images/projects/*.webp', {
  eager: true,
  import: 'default',
});

const bySlug = new Map<string, { large?: string; small?: string }>();
for (const [path, url] of Object.entries(files)) {
  const name = path.split('/').pop()!.replace('.webp', '');
  const isSmall = name.endsWith('-640');
  const slug = isSmall ? name.slice(0, -4) : name;
  const entry = bySlug.get(slug) ?? {};
  if (isSmall) entry.small = url;
  else entry.large = url;
  bySlug.set(slug, entry);
}

export interface ProjectImage {
  src: string;
  srcSet: string;
}

export function getProjectImage(slug: string): ProjectImage | null {
  const entry = bySlug.get(slug);
  if (!entry?.large) return null;
  return {
    src: entry.large,
    srcSet: entry.small ? `${entry.small} 640w, ${entry.large} 1200w` : `${entry.large} 1200w`,
  };
}
