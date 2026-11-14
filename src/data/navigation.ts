export const sectionIds = {
  hero: 'top',
  about: 'about',
  skills: 'skills',
  projects: 'projects',
  experience: 'experience',
  education: 'education',
  contact: 'contact',
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

export const navItems: Array<{ id: SectionId; label: string }> = [
  { id: sectionIds.about, label: 'About' },
  { id: sectionIds.skills, label: 'Skills' },
  { id: sectionIds.projects, label: 'Projects' },
  { id: sectionIds.experience, label: 'Experience' },
  { id: sectionIds.education, label: 'Education' },
  { id: sectionIds.contact, label: 'Contact' },
];
