import { useEffect, useState } from 'react';

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  lastPush: { name: string; url: string; pushedAt: string } | null;
  /** Share of repositories per primary language, most common first. */
  languages: Array<{ name: string; count: number; share: number }>;
}

type State =
  | { status: 'loading' }
  | { status: 'ready'; data: GitHubStats; stale?: boolean }
  | { status: 'error' };

/** Fresh for 30 min — keeps visitors well inside the unauthenticated limit (60 req/h per IP). */
const TTL = 30 * 60 * 1000;

interface Cached {
  at: number;
  data: GitHubStats;
}
interface ApiUser {
  public_repos: number;
  followers: number;
}
interface ApiRepo {
  name: string;
  html_url: string;
  pushed_at: string;
  language: string | null;
  fork: boolean;
}

function readCache(key: string): Cached | null {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null') as Cached | null;
  } catch {
    return null;
  }
}

/**
 * Live public stats from the GitHub REST API.
 * Fresh cache → used directly; stale cache → shown while refreshing and kept if
 * GitHub is unavailable; no cache + failure → error state.
 */
export function useGitHubStats(username: string): State {
  const key = `rmr:github:${username}`;
  const [state, setState] = useState<State>(() => {
    const cached = readCache(key);
    if (cached) return { status: 'ready', data: cached.data, stale: Date.now() - cached.at >= TTL };
    return { status: 'loading' };
  });
  const needsFetch = state.status === 'loading' || (state.status === 'ready' && state.stale);

  useEffect(() => {
    if (!needsFetch) return;
    const controller = new AbortController();
    const get = async <T,>(url: string): Promise<T> => {
      const res = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } });
      if (!res.ok) throw new Error(`GitHub ${res.status}`);
      return res.json() as Promise<T>;
    };

    Promise.all([
      get<ApiUser>(`https://api.github.com/users/${username}`),
      get<ApiRepo[]>(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`),
    ])
      .then(([user, repos]) => {
        const own = repos.filter((r) => !r.fork);
        const counts = new Map<string, number>();
        own.forEach((r) => r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1));
        const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
        const languages = [...counts.entries()]
          .sort((a, b) => b[1] - a[1])
          .map(([name, count]) => ({ name, count, share: count / total }));
        const latest = own[0];
        const data: GitHubStats = {
          publicRepos: user.public_repos,
          followers: user.followers,
          lastPush: latest ? { name: latest.name, url: latest.html_url, pushedAt: latest.pushed_at } : null,
          languages,
        };
        try {
          localStorage.setItem(key, JSON.stringify({ at: Date.now(), data } satisfies Cached));
        } catch {
          /* storage unavailable */
        }
        setState({ status: 'ready', data });
      })
      .catch((err: unknown) => {
        if ((err as Error).name === 'AbortError') return;
        // Keep showing older data if we have it.
        setState((prev) => (prev.status === 'ready' ? { ...prev, stale: false } : { status: 'error' }));
      });

    return () => controller.abort();
  }, [key, username, needsFetch]);

  return state;
}
