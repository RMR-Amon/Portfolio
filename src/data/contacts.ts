import type { ContactChannel } from '@/types';

/** The only contact channels used on the site. */
export const contacts: ContactChannel[] = [
  {
    id: 'telegram',
    label: 'Telegram',
    value: '@maxmudjon_dev',
    href: 'https://t.me/maxmudjon_dev',
    action: 'Open chat',
    external: true,
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '+998 99 833 57 33',
    href: 'tel:+998998335733',
    action: 'Call now',
  },
  {
    id: 'email',
    label: 'Email',
    value: 'mahmudjon4757@gmail.com',
    href: 'mailto:mahmudjon4757@gmail.com',
    action: 'Write an email',
  },
];
