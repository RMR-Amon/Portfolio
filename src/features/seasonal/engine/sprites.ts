/**
 * Pre-rendered particle sprites. Each sprite is drawn once to an offscreen
 * canvas and then blitted with drawImage every frame — much cheaper than
 * redrawing paths for every particle.
 */
export interface Sprite {
  canvas: HTMLCanvasElement;
  /** Logical (CSS px) size of the sprite's bounding square. */
  size: number;
}

function makeCanvas(size: number, scale: number, draw: (ctx: CanvasRenderingContext2D, s: number) => void): Sprite {
  const canvas = document.createElement('canvas');
  const px = Math.ceil(size * scale);
  canvas.width = px;
  canvas.height = px;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(scale, scale);
  draw(ctx, size);
  return { canvas, size };
}

/* ---------------- Winter ---------------- */

export function snowDot(scale: number, radius: number): Sprite {
  const size = radius * 4;
  return makeCanvas(size, scale, (ctx, s) => {
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,255,255,0.95)');
    g.addColorStop(0.35, 'rgba(235,245,255,0.75)');
    g.addColorStop(1, 'rgba(220,240,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

export function snowCrystal(scale: number, size: number): Sprite {
  return makeCanvas(size, scale, (ctx, s) => {
    const c = s / 2;
    const r = s * 0.42;
    ctx.translate(c, c);
    ctx.strokeStyle = 'rgba(235,248,255,0.9)';
    ctx.lineWidth = Math.max(1, s / 22);
    ctx.lineCap = 'round';
    for (let i = 0; i < 6; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 3);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -r);
      // small branches
      ctx.moveTo(0, -r * 0.55);
      ctx.lineTo(-r * 0.22, -r * 0.75);
      ctx.moveTo(0, -r * 0.55);
      ctx.lineTo(r * 0.22, -r * 0.75);
      ctx.stroke();
      ctx.restore();
    }
  });
}

/* ---------------- Spring ---------------- */

const PETAL_COLORS: Array<[string, string]> = [
  ['#ffe4ec', '#f9a8c9'],
  ['#fff1f5', '#f5b4cf'],
  ['#ffd6e5', '#ee8fb7'],
  ['#fffafc', '#f7c6d9'],
];

export function petal(scale: number, size: number, variant: number): Sprite {
  const [light, dark] = PETAL_COLORS[variant % PETAL_COLORS.length];
  return makeCanvas(size, scale, (ctx, s) => {
    const w = s * 0.62;
    const h = s * 0.9;
    ctx.translate(s / 2, s / 2);
    const g = ctx.createLinearGradient(0, h / 2, 0, -h / 2);
    g.addColorStop(0, dark);
    g.addColorStop(1, light);
    ctx.fillStyle = g;
    ctx.beginPath();
    // Cherry-blossom petal with a notch at the tip
    ctx.moveTo(0, h / 2);
    ctx.bezierCurveTo(-w * 0.75, h * 0.15, -w * 0.6, -h * 0.45, -w * 0.14, -h / 2);
    ctx.lineTo(0, -h * 0.38);
    ctx.lineTo(w * 0.14, -h / 2);
    ctx.bezierCurveTo(w * 0.6, -h * 0.45, w * 0.75, h * 0.15, 0, h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.42);
    ctx.lineTo(0, -h * 0.2);
    ctx.stroke();
  });
}

/* ---------------- Autumn ---------------- */

const LEAF_COLORS = ['#e8590c', '#f08c00', '#d9480f', '#c92a2a', '#f59f00', '#a0522d', '#e67700'];

export function leaf(scale: number, size: number, variant: number): Sprite {
  const color = LEAF_COLORS[variant % LEAF_COLORS.length];
  const maple = variant % 3 === 0;
  return makeCanvas(size, scale, (ctx, s) => {
    ctx.translate(s / 2, s / 2);
    const r = s * 0.42;
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    g.addColorStop(0, shade(color, 18));
    g.addColorStop(1, shade(color, -18));
    ctx.fillStyle = g;
    ctx.beginPath();
    if (maple) {
      // Polar "maple" outline: five pointed lobes
      const steps = 90;
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        const lobes = 0.62 + 0.38 * Math.pow(Math.abs(Math.sin((5 * t) / 2)), 0.6);
        const notch = t > Math.PI * 0.4 && t < Math.PI * 0.6 ? 0.55 : 1; // stem gap at the bottom
        const rr = r * lobes * notch;
        const x = Math.cos(t) * rr;
        const y = Math.sin(t) * rr;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    } else {
      // Pointed oval leaf
      ctx.moveTo(0, -r);
      ctx.bezierCurveTo(r * 0.85, -r * 0.45, r * 0.7, r * 0.55, 0, r);
      ctx.bezierCurveTo(-r * 0.7, r * 0.55, -r * 0.85, -r * 0.45, 0, -r);
    }
    ctx.closePath();
    ctx.fill();
    // Vein + stem
    ctx.strokeStyle = 'rgba(60,25,5,0.45)';
    ctx.lineWidth = Math.max(0.7, s / 30);
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.8);
    ctx.lineTo(0, r * 1.05);
    ctx.stroke();
  });
}

/* ---------------- Summer ---------------- */

export function mote(scale: number, radius: number): Sprite {
  const size = radius * 4;
  return makeCanvas(size, scale, (ctx, s) => {
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,236,170,0.9)');
    g.addColorStop(0.4, 'rgba(255,214,120,0.35)');
    g.addColorStop(1, 'rgba(255,200,90,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

function shade(hex: string, percent: number): string {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.min(255, Math.max(0, Math.round(c + (percent / 100) * 255)));
  const r = f(n >> 16);
  const g = f((n >> 8) & 0xff);
  const b = f(n & 0xff);
  return `rgb(${r},${g},${b})`;
}
