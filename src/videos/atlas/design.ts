import {Easing, interpolate, interpolateColors, spring} from 'remotion';

export const ATLAS = {
  width: 1920, height: 1080, fps: 60, frames: 2700,
  portfolio: 'ricktcunha.space/trabalhos/atlas',
  colors: {paper: '#F5F3ED', ink: '#191C22', blue: '#2855F9', pale: '#DCE5FF', gray: '#626975'},
  sans: 'Space Grotesk', mono: 'IBM Plex Mono',
} as const;
export const C = ATLAS.colors;
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const ease = Easing.bezier(0.65, 0, 0.2, 1);
export const quick = Easing.bezier(0.2, 0.8, 0.2, 1);
export const progress = (t: number, a: number, b: number, curve = ease) => curve(clamp01((t - a) / (b - a)));
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
export const visible = (t: number, a: number, b: number, fade = 0.25) => progress(t, a, a + fade, quick) * (1 - progress(t, b - fade, b, quick));
export const settle = (t: number, start: number) => spring({frame: (t - start) * 60, fps: 60, config: {damping: 26, stiffness: 230, mass: 0.7}});

type PanelKey = {t: number; x: number; y: number; w: number; h: number; r: number; fill: string};
const panels: PanelKey[] = [
  {t: 0, x: 1008, y: 462, w: 676, h: 152, r: 52, fill: C.paper},
  {t: 3.50, x: 1008, y: 462, w: 676, h: 152, r: 52, fill: C.paper},
  {t: 4.12, x: 860, y: 441, w: 838, h: 188, r: 60, fill: C.paper},
  {t: 5.16, x: 800, y: 252, w: 1008, h: 592, r: 16, fill: C.ink},
  {t: 10.25, x: 800, y: 252, w: 1008, h: 592, r: 16, fill: C.ink},
  {t: 11.22, x: 776, y: 252, w: 1032, h: 548, r: 16, fill: C.paper},
  {t: 17.25, x: 776, y: 252, w: 1032, h: 548, r: 16, fill: C.paper},
  {t: 18.20, x: 824, y: 252, w: 984, h: 592, r: 16, fill: C.paper},
  {t: 23.50, x: 824, y: 252, w: 984, h: 592, r: 16, fill: C.paper},
  {t: 24.32, x: 824, y: 252, w: 984, h: 628, r: 16, fill: C.paper},
  {t: 33.40, x: 824, y: 252, w: 984, h: 628, r: 16, fill: C.paper},
  {t: 34.62, x: 1608, y: 354, w: 200, h: 100, r: 12, fill: C.paper},
  {t: 38.05, x: 1608, y: 354, w: 200, h: 100, r: 12, fill: C.paper},
  {t: 39.58, x: 1120, y: 470, w: 616, h: 138, r: 48, fill: C.paper},
  {t: 45, x: 1120, y: 470, w: 616, h: 138, r: 48, fill: C.paper},
];
export const panelAt = (t: number) => {
  const index = panels.findIndex((k, i) => i < panels.length - 1 && t >= k.t && t <= panels[i + 1].t);
  const a = panels[Math.max(0, index)], b = panels[Math.max(0, index) + 1];
  const p = progress(t, a.t, b.t);
  return {x: mix(a.x, b.x, p), y: mix(a.y, b.y, p), w: mix(a.w, b.w, p), h: mix(a.h, b.h, p), r: mix(a.r, b.r, p), fill: interpolateColors(p, [0, 1], [a.fill, b.fill])};
};

type SignalKey = {t: number; x: number; y: number; w: number; h: number};
const signalKeys: SignalKey[] = [
  {t: 0, x: 1628, y: 550, w: 14, h: 14},
  {t: 4.12, x: 1628, y: 550, w: 14, h: 14},
  {t: 5.52, x: 897, y: 403, w: 4, h: 34},
  {t: 5.72, x: 897, y: 403, w: 4, h: 34},
  {t: 6.52, x: 1080, y: 403, w: 4, h: 34},
  {t: 6.90, x: 1080, y: 403, w: 4, h: 34},
  {t: 7.50, x: 1020, y: 591, w: 4, h: 34},
  {t: 10.20, x: 1020, y: 591, w: 4, h: 34},
  {t: 11.40, x: 858, y: 395, w: 70, h: 5},
  {t: 12.28, x: 1049, y: 512, w: 6, h: 40},
  {t: 13.38, x: 1049, y: 512, w: 6, h: 40},
  {t: 13.66, x: 1156, y: 688, w: 12, h: 12},
  {t: 13.90, x: 1156, y: 776, w: 12, h: 12},
  {t: 14.10, x: 1478, y: 776, w: 12, h: 12},
  {t: 14.28, x: 1478, y: 812, w: 12, h: 12},
  {t: 17.24, x: 1478, y: 812, w: 12, h: 12},
  {t: 18.72, x: 932, y: 724, w: 12, h: 12},
  {t: 20.10, x: 932, y: 724, w: 12, h: 12},
  {t: 20.48, x: 1192, y: 724, w: 12, h: 12},
  {t: 21.45, x: 1192, y: 724, w: 12, h: 12},
  {t: 21.80, x: 1504, y: 724, w: 12, h: 12},
  {t: 22.00, x: 1504, y: 724, w: 12, h: 12},
  {t: 22.30, x: 942, y: 868, w: 12, h: 12},
  {t: 22.82, x: 1268, y: 868, w: 12, h: 12},
  {t: 23.40, x: 1630, y: 868, w: 12, h: 12},
  {t: 24.66, x: 874, y: 454, w: 12, h: 12},
  {t: 28.80, x: 874, y: 454, w: 12, h: 12},
  {t: 29.72, x: 1740, y: 796, w: 12, h: 12},
  {t: 30.12, x: 1740, y: 796, w: 12, h: 12},
  {t: 30.78, x: 1740, y: 514, w: 12, h: 12},
  {t: 31.46, x: 874, y: 638, w: 12, h: 12},
  {t: 33.48, x: 874, y: 638, w: 12, h: 12},
  {t: 34.76, x: 950, y: 366, w: 12, h: 12},
  {t: 35.00, x: 950, y: 218, w: 12, h: 12},
  {t: 35.45, x: 1574, y: 218, w: 12, h: 12},
  {t: 35.95, x: 1574, y: 404, w: 12, h: 12},
  {t: 36.38, x: 1708, y: 404, w: 12, h: 12},
  {t: 36.70, x: 1708, y: 534, w: 12, h: 12},
  {t: 37.48, x: 1708, y: 534, w: 12, h: 12},
  {t: 37.48, x: 1072, y: 422, w: 12, h: 12},
  {t: 38.05, x: 1072, y: 422, w: 12, h: 12},
  {t: 39.58, x: 1684, y: 550, w: 14, h: 14},
  {t: 45, x: 1684, y: 550, w: 14, h: 14},
];
export const signalAt = (t: number) => {
  const i = signalKeys.findIndex((k, j) => j < signalKeys.length - 1 && t >= k.t && t <= signalKeys[j + 1].t);
  const a = signalKeys[Math.max(0, i)], b = signalKeys[Math.max(0, i) + 1];
  // Smooth at the endpoints: the travelling node rests before each new action.
  const p = progress(t, a.t, b.t);
  return {x: mix(a.x, b.x, p), y: mix(a.y, b.y, p), w: mix(a.w, b.w, p), h: mix(a.h, b.h, p)};
};
export const typed = (text: string, t: number, start: number, end: number) => text.slice(0, Math.floor(interpolate(t, [start, end], [0, text.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})));
