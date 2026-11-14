import { Component, type ErrorInfo, type ReactNode } from 'react';
import { en } from '@/i18n/locales/en';
import styles from './ErrorBoundary.module.scss';

interface State {
  hasError: boolean;
}

/** Catches render errors so a single broken section never blanks the whole page. */
export class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Render error:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback !== undefined) return this.props.fallback;
    return (
      <div className={styles.box} role="alert">
        <h2>{en.errors.title}</h2>
        <p>{en.errors.text}</p>
        <button type="button" onClick={() => window.location.reload()}>
          {en.errors.reload}
        </button>
      </div>
    );
  }
}
