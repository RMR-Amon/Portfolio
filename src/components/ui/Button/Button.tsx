import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Button.module.scss';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
}

type AsLink = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonProps = AsLink | AsButton;

/** Button that renders an `<a>` when given `href`, otherwise a `<button>`. */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, iconRight, className, children, ...rest } = props;
  const classes = cn(styles.button, styles[variant], styles[size], className);
  const content = (
    <>
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <span className={styles.label}>{children}</span>
      {iconRight && <span className={cn(styles.icon, styles.iconRight)} aria-hidden="true">{iconRight}</span>}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchor } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <a href={href} className={classes} {...anchor}>
        {content}
      </a>
    );
  }
  const { type = 'button', ...button } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...button}>
      {content}
    </button>
  );
}
