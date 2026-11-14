import type { Season } from '@/types';
import { leaf, mote, petal, snowCrystal, snowDot, type Sprite } from './sprites';

interface Particle {
  x: number;
  y: number;
  vy: number; // fall speed, px/s (negative = rises)
  depth: number; // 0.35..1 — parallax: far particles are smaller, slower, fainter
  sprite: Sprite;
  scale: number;
  alpha: number;
  rot: number;
  vrot: number;
  flip: number; // phase of the 3D "flip" (petals, leaves)
  vflip: number;
  sway: number; // phase of the side-to-side sway
  vsway: number;
  swayAmp: number;
}

interface Streak {
  x: number;
  y: number;
  len: number;
  life: number;
  ttl: number;
}

interface SeasonConfig {
  /** One particle per this many square px of viewport. */
  density: number;
  max: number;
  /** Base wind in px/s and gust amplitude. */
  wind: number;
  gust: number;
  fall: [number, number];
  sprites: (dpr: number) => Sprite[];
  spin: number;
  flip: boolean;
  swayAmp: [number, number];
  /** Faint wind streak lines to visualise gusts. */
  streaks: number;
  rise?: boolean;
}

const CONFIG: Record<Season, SeasonConfig> = {
  winter: {
    density: 11000,
    max: 150,
    wind: 14, // light wind
    gust: 18,
    fall: [22, 58],
    sprites: (dpr) => [
      snowDot(dpr, 1.4), snowDot(dpr, 2), snowDot(dpr, 2.6), snowDot(dpr, 3.2),
      snowCrystal(dpr, 12), snowCrystal(dpr, 16),
    ],
    spin: 0.6,
    flip: false,
    swayAmp: [8, 22],
    streaks: 2,
  },
  spring: {
    density: 21000,
    max: 64,
    wind: 26, // gentle breeze
    gust: 26,
    fall: [26, 52],
    sprites: (dpr) => [0, 1, 2, 3].flatMap((v) => [petal(dpr, 16, v), petal(dpr, 21, v)]),
    spin: 1.4,
    flip: true,
    swayAmp: [18, 40],
    streaks: 0,
  },
  summer: {
    density: 46000,
    max: 26,
    wind: 6,
    gust: 6,
    fall: [-14, -6],
    sprites: (dpr) => [mote(dpr, 2), mote(dpr, 3), mote(dpr, 4)],
    spin: 0,
    flip: false,
    swayAmp: [10, 26],
    streaks: 0,
    rise: true,
  },
  autumn: {
    density: 34000,
    max: 38,
    wind: 58, // normal wind
    gust: 52,
    fall: [42, 86],
    sprites: (dpr) => [0, 1, 2, 3, 4, 5, 6].flatMap((v) => [leaf(dpr, 18, v), leaf(dpr, 24, v)]),
    spin: 2.2,
    flip: true,
    swayAmp: [14, 34],
    streaks: 4,
  },
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export interface SeasonEngine {
  destroy: () => void;
}

/** Starts the particle animation for `season` on `canvas`. */
export function createSeasonEngine(canvas: HTMLCanvasElement, season: Season): SeasonEngine {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return { destroy: () => {} };

  const cfg = CONFIG[season];
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const sprites = cfg.sprites(dpr);
  let width = 0;
  let height = 0;
  let particles: Particle[] = [];
  const streaks: Streak[] = [];
  let raf = 0;
  let last = performance.now();
  let time = Math.random() * 100;
  let running = false;

  const spawn = (p: Partial<Particle> = {}, initial = false): Particle => {
    const depth = rand(0.35, 1);
    const sprite = sprites[Math.floor(Math.random() * sprites.length)];
    const fall = rand(cfg.fall[0], cfg.fall[1]);
    // With strong wind, spawn further "upwind" so the screen fills evenly.
    const drift = cfg.wind > 20 ? width * 0.35 : 0;
    return {
      x: rand(-drift, width),
      y: initial ? rand(0, height) : cfg.rise ? height + 20 : -30,
      vy: fall,
      depth,
      sprite,
      scale: 0.55 + depth * 0.6,
      alpha: (cfg.rise ? 0.35 : 0.45) + depth * 0.5,
      rot: rand(0, Math.PI * 2),
      vrot: rand(-cfg.spin, cfg.spin),
      flip: rand(0, Math.PI * 2),
      vflip: rand(1.2, 3.2),
      sway: rand(0, Math.PI * 2),
      vsway: rand(0.6, 1.6),
      swayAmp: rand(cfg.swayAmp[0], cfg.swayAmp[1]),
      ...p,
    };
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const target = Math.min(cfg.max, Math.round((width * height) / cfg.density));
    if (particles.length < target) {
      for (let i = particles.length; i < target; i++) particles.push(spawn({}, true));
    } else {
      particles = particles.slice(0, target);
    }
  };

  /** Smooth gusts: a sum of slow sine waves. */
  const windAt = (t: number) =>
    cfg.wind + cfg.gust * (0.55 * Math.sin(t * 0.17) + 0.3 * Math.sin(t * 0.41 + 1.3) + 0.15 * Math.sin(t * 1.07 + 2.1));

  const frame = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += dt;
    const wind = windAt(time);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Wind streaks
    if (cfg.streaks) {
      if (streaks.length < cfg.streaks && Math.random() < dt * 0.8 * (wind / (cfg.wind + cfg.gust))) {
        streaks.push({ x: rand(-200, width * 0.6), y: rand(0, height), len: rand(80, 220), life: 0, ttl: rand(1.2, 2.2) });
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        s.life += dt;
        s.x += wind * 4.5 * dt;
        const k = s.life / s.ttl;
        if (k >= 1) {
          streaks.splice(i, 1);
          continue;
        }
        const a = Math.sin(k * Math.PI) * 0.09;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.len, s.y);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.5, `rgba(255,255,255,${a})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.quadraticCurveTo(s.x + s.len / 2, s.y - 6, s.x + s.len, s.y + 2);
        ctx.stroke();
      }
    }

    for (const p of particles) {
      p.sway += p.vsway * dt;
      p.rot += p.vrot * dt * (0.6 + Math.abs(wind) / 80);
      p.flip += p.vflip * dt;
      p.y += p.vy * (0.5 + p.depth * 0.6) * dt;
      p.x += (wind * p.depth + Math.cos(p.sway) * p.swayAmp) * dt;

      const half = p.sprite.size * p.scale;
      const out = cfg.rise ? p.y < -half : p.y > height + half;
      if (out) Object.assign(p, spawn());
      if (p.x > width + half) p.x = -half;
      else if (p.x < -half * 2 - width * 0.4) p.x = width + half;

      const sx = cfg.flip ? Math.cos(p.flip) : 1;
      const cos = Math.cos(p.rot);
      const sin = Math.sin(p.rot);
      const s = p.scale * dpr;
      ctx.globalAlpha = cfg.rise ? p.alpha * (0.6 + 0.4 * Math.sin(p.sway * 2)) : p.alpha;
      // rotate · flip(scaleX) · scale, positioned at the particle
      ctx.setTransform(cos * sx * s, sin * sx * s, -sin * s, cos * s, p.x * dpr, p.y * dpr);
      const size = p.sprite.size;
      ctx.drawImage(p.sprite.canvas, -size / 2, -size / 2, size, size);
    }
    ctx.globalAlpha = 1;

    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const onVisibility = () => (document.hidden ? stop() : start());

  resize();
  start();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', onVisibility);

  return {
    destroy() {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
  };
}
