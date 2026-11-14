import { useEffect } from 'react';

let locks = 0;

/** Prevents page scrolling while `locked` (supports nested locks). */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    locks += 1;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.classList.add('is-locked');
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      locks -= 1;
      if (locks === 0) {
        document.body.classList.remove('is-locked');
        document.body.style.paddingRight = '';
      }
    };
  }, [locked]);
}
