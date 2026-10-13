import {Easing, interpolateColors, spring} from 'remotion';

export const C = {paper: '#F5F3ED', ink: '#191C22', blue: '#2855F9', pale: '#DCE5FF', gray: '#626975'};
export const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const curve = Easing.bezier(0.62, 0, 0.24, 1);
export const p = (t: number, a: number, b: number) => curve(clamp((t - a) / (b - a)));
export const visible = (t: number, a: number, b: number, duration = 0.35) => p(t, a, a + duration) * (1 - p(t, b - duration, b));
export const settle = (t: number, a: number) => spring({frame: Math.max(0, (t - a) * 60), fps: 60, config: {damping: 18, stiffness: 210, mass: 0.7}});
export const typed = (text: string, t: number, a: number, duration: number) => text.slice(0, Math.floor(clamp((t - a) / duration) * text.length));

export type Box = {x: number; y: number; w: number; h: number; r: number; tail: number; fill: string};
type Key = Box & {t: number};
export const LIBRARY = {columns: [300, 660, 1020, 1380], y: 460, w: 240, h: 310, captionGap: 52} as const;
const mac: Box = {x: 580, y: 680, w: 760, h: 155, r: 55, tail: 0, fill: C.paper};
const terminal: Box = {x: 300, y: 350, w: 1320, h: 540, r: 24, tail: 0, fill: C.ink};
const cover: Box = {x: LIBRARY.columns[1], y: LIBRARY.y, w: LIBRARY.w, h: LIBRARY.h, r: 12, tail: 0, fill: C.ink};
const tv: Box = {x: 800, y: 420, w: 770, h: 420, r: 18, tail: 0, fill: C.ink};
const task: Box = {x: 280, y: 390, w: 1360, h: 460, r: 28, tail: 0, fill: C.pale};
const message: Box = {x: 330, y: 535, w: 1260, h: 235, r: 32, tail: 28, fill: C.pale};
const history: Box = {x: 830, y: 435, w: 810, h: 128, r: 18, tail: 16, fill: C.pale};
const reply: Box = {x: 830, y: 770, w: 515, h: 112, r: 20, tail: 16, fill: C.pale};
const document: Box = {x: 1400, y: 742, w: 220, h: 168, r: 12, tail: 0, fill: C.paper};
const network: Box = {x: 160, y: 400, w: 1180, h: 440, r: 32, tail: 0, fill: C.pale};
const keys: Key[] = [
  {t: 0, ...mac}, {t: 4.1, ...mac}, {t: 5.2, ...terminal}, {t: 10.05, ...terminal},
  {t: 11.2, ...cover}, {t: 13.7, ...cover}, {t: 14.7, ...tv}, {t: 17.15, ...tv},
  {t: 18.3, ...task}, {t: 23.1, ...task}, {t: 24.15, ...message}, {t: 28.4, ...message},
  {t: 29.35, ...history}, {t: 30.65, ...history}, {t: 31.25, ...reply}, {t: 31.95, ...reply},
  {t: 32.6, ...document}, {t: 33.3, ...document}, {t: 34.5, ...network}, {t: 37.85, ...network},
  {t: 39.2, ...mac}, {t: 45, ...mac},
];
export const moduleAt = (t: number): Box => {
  const index = keys.findIndex((key, i) => i < keys.length - 1 && t >= key.t && t < keys[i + 1].t);
  if (index === -1) return t < 0 ? keys[0] : keys[keys.length - 1];
  const a = keys[index], b = keys[index + 1], q = p(t, a.t, b.t);
  return {x: mix(a.x, b.x, q), y: mix(a.y, b.y, q), w: mix(a.w, b.w, q), h: mix(a.h, b.h, q), r: mix(a.r, b.r, q), tail: mix(a.tail, b.tail, q), fill: interpolateColors(q, [0, 1], [a.fill, b.fill])};
};

// Fixed contour topology: the same bottom segment becomes the message tail.
export const modulePath = ({x, y, w, h, r, tail}: Box) => `M${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h - r}Q${x + w},${y + h} ${x + w - r},${y + h}H${x + r + 48}L${x + r + 14},${y + h + tail}L${x + r + 14},${y + h}H${x + r}Q${x},${y + h} ${x},${y + h - r}V${y + r}Q${x},${y} ${x + r},${y}Z`;
