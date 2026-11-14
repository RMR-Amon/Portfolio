import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TechMarquee } from '@/components/shared/TechMarquee/TechMarquee';
import { Hero } from '@/sections/Hero/Hero';
import { About } from '@/sections/About/About';
import { Skills } from '@/sections/Skills/Skills';
import { Projects } from '@/sections/Projects/Projects';
import { Experience } from '@/sections/Experience/Experience';
import { Education } from '@/sections/Education/Education';
import { Contact } from '@/sections/Contact/Contact';

export default function HomePage() {
  const { hash } = useLocation();

  // Deep links such as /#projects (also used by redirects from old routes).
  // Runs only when the hash itself changes — not on other navigations such as
  // opening/closing a project, which must not move the page.
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <>
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
    </>
  );
}
