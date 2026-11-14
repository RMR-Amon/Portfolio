import { useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import { FiArrowUpRight, FiCheck, FiCopy, FiMail, FiPhone } from 'react-icons/fi';
import { SiTelegram } from 'react-icons/si';
import { Section } from '@/components/ui/Section/Section';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { CvButton } from '@/components/shared/CvButton/CvButton';
import { contacts } from '@/data/contacts';
import { sectionIds } from '@/data/navigation';
import { profile } from '@/data/profile';
import { useI18n } from '@/i18n';
import type { ContactChannel } from '@/types';
import { cn } from '@/utils/cn';
import styles from './Contact.module.scss';

const icons: Record<ContactChannel['id'], IconType> = {
  telegram: SiTelegram,
  phone: FiPhone,
  email: FiMail,
};

type CopyState = 'idle' | 'copied' | 'failed';

function CopyButton({ value, label }: { value: string; label: string }) {
  const { t } = useI18n();
  const [state, setState] = useState<CopyState>('idle');
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState('copied');
    } catch {
      setState('failed');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState('idle'), 1800);
  };

  const text = state === 'copied' ? t.contact.copied : state === 'failed' ? t.contact.copyFailed : t.contact.copy;
  return (
    <button
      type="button"
      className={cn(styles.copy, state === 'copied' && styles.copied)}
      onClick={copy}
      aria-label={`${t.contact.copy} ${label}`}
    >
      {state === 'copied' ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
      <span aria-live="polite">{text}</span>
    </button>
  );
}

export function Contact() {
  const { t } = useI18n();

  return (
    <Section
      id={sectionIds.contact}
      index="06"
      eyebrow={t.contact.eyebrow}
      title={t.contact.title}
      lead={t.contact.lead}
      className={styles.section}
    >
      <ul className={styles.cards}>
        {contacts.map((c, i) => {
          const Icon = icons[c.id];
          return (
            <Reveal as="li" key={c.id} delay={i * 90} className={cn(styles.card, styles[c.id])}>
              <span className={styles.icon} aria-hidden="true">
                <Icon />
              </span>
              <span className={styles.label}>{c.label}</span>
              <a
                className={styles.value}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {c.value}
                <span className="visually-hidden"> — {c.action}</span>
              </a>
              <div className={styles.row}>
                <span className={styles.action} aria-hidden="true">
                  {c.action}
                  <FiArrowUpRight />
                </span>
                <CopyButton value={c.id === 'phone' ? c.href.replace('tel:', '') : c.value} label={c.label} />
              </div>
            </Reveal>
          );
        })}
      </ul>

      <Reveal className={styles.cta}>
        <div>
          <p className={styles.ctaTitle}>{profile.fullName}</p>
          <p className={styles.ctaText}>
            {profile.role} · {profile.location}
          </p>
        </div>
        <CvButton />
      </Reveal>
    </Section>
  );
}
