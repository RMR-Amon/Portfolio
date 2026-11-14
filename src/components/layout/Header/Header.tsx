import { useEffect, useRef, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Logo } from '@/components/shared/Logo/Logo';
import { contacts } from '@/data/contacts';
import { navItems, sectionIds } from '@/data/navigation';
import { SeasonToggle } from '@/features/seasonal/SeasonToggle';
import { PaletteTrigger } from '@/features/command-palette/PaletteTrigger';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useI18n } from '@/i18n';
import { cn } from '@/utils/cn';
import styles from './Header.module.scss';

const sectionList = navItems.map((n) => n.id);

export function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionList);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape / when growing to desktop; move focus into it when opened.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mql.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mql.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKey);
      mql.removeEventListener('change', onChange);
    };
  }, [open]);

  return (
    <>
      <header className={cn(styles.header, (scrolled || open) && styles.scrolled)}>
        <div className={cn('container', styles.inner)}>
          <a href={`#${sectionIds.hero}`} className={styles.brand} aria-label={`${t.nav.home} — Maxmudjon Raximjonov`}>
            <Logo />
          </a>

          <nav className={styles.nav} aria-label={t.nav.primary}>
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(styles.link, active === item.id && styles.active)}
                    aria-current={active === item.id ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <PaletteTrigger />
            <SeasonToggle />
            <a href={`#${sectionIds.contact}`} className={styles.cta}>
              {t.hero.contact}
            </a>
            <button
              ref={toggleRef}
              type="button"
              className={styles.burger}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise become the
          containing block of this fixed panel and clip it to the header height. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={cn(styles.panel, open && styles.panelOpen)}
        hidden={!open}
      >
        <nav aria-label={t.nav.primary} className="container">
          <ul className={styles.mobileList}>
            {navItems.map((item, i) => (
              <li key={item.id} style={{ transitionDelay: `${60 + i * 40}ms` }}>
                <a
                  href={`#${item.id}`}
                  className={cn(styles.mobileLink, active === item.id && styles.active)}
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.mobileIndex}>0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className={styles.mobileContacts}>
            {contacts.map((c) => (
              <li key={c.id}>
                <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <span>{c.label}</span>
                  {c.value}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
