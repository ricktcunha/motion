import React from 'react';
import {Box, C, mix, modulePath, p} from './motion';

type TextProps = {x: number; y: number; children: React.ReactNode; size?: number; weight?: number; color?: string; mono?: boolean; anchor?: 'start' | 'middle' | 'end'; spacing?: number; opacity?: number};
export const T: React.FC<TextProps> = ({x, y, children, size = 36, weight = 400, color = C.ink, mono = false, anchor = 'start', spacing = 0, opacity = 1}) => <text x={x} y={y} fontFamily={mono ? 'IBM Plex Mono' : 'Space Grotesk'} fontSize={size} fontWeight={weight} textAnchor={anchor} letterSpacing={spacing} fill={color} opacity={opacity}>{children}</text>;
export const Label: React.FC<TextProps> = props => <T {...props} size={props.size ?? 22} mono color={props.color ?? C.gray} spacing={0.7} />;
export const Line: React.FC<{d: string; color?: string; width?: number; progress?: number; opacity?: number}> = ({d, color = C.ink, width = 3, progress = 1, opacity = 1}) => <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - progress} opacity={opacity} />;

export const Reveal: React.FC<{id: string; t: number; start: number; x: number; y: number; lines: string[]; size?: number; width?: number; anchor?: 'start' | 'middle'; color?: string}> = ({id, t, start, x, y, lines, size = 90, width = 1700, anchor = 'start', color = C.ink}) => <>{lines.map((line, i) => {
  const q = p(t, start + i * 0.11, start + 0.62 + i * 0.11), baseline = y + i * size * 1.06;
  return <g key={`${id}-${i}`}><clipPath id={`${id}-${i}`}><rect x={anchor === 'middle' ? x - width / 2 : x - 3} y={baseline - size * 1.08} width={width} height={size * 1.17} /></clipPath><g clipPath={`url(#${id}-${i})`}><g transform={`translate(0 ${mix(size * 1.16, 0, q)})`}><T x={x} y={baseline} size={size} weight={600} spacing={-size * 0.035} anchor={anchor} color={color}>{line}</T></g></g></g>;
})}</>;

export const Mark: React.FC<{x: number; y: number; size?: number; color?: string}> = ({x, y, size = 64, color = C.ink}) => <g transform={`translate(${x} ${y}) scale(${size / 64})`}><rect x={2} y={17} width={60} height={30} rx={10} fill="none" stroke={color} strokeWidth={3} /><path d="M4 29H60" fill="none" stroke={color} strokeWidth={2} /><circle cx={51} cy={37.5} r={2.5} fill={C.blue} /></g>;

type IconKind = 'check' | 'clock' | 'send' | 'play' | 'document' | 'download' | 'network';
const paths: Record<IconKind, string> = {
  check: 'M7 21L16 30L33 10', clock: 'M20 4A16 16 0 1 1 19.99 4M20 10V20L27 24',
  send: 'M4 5L36 20L4 35L10 20ZM10 20H36', play: 'M14 7L34 20L14 33Z',
  document: 'M10 4H26L34 12V36H10ZM26 4V12H34M15 19H29M15 25H29M15 31H25',
  download: 'M20 4V27M11 18L20 27L29 18M7 31V36H33V31', network: 'M20 7V20M7 30V20H33V30M13 7H27M3 32H11M16 32H24M29 32H37',
};
export const Icon: React.FC<{kind: IconKind; x: number; y: number; size?: number; color?: string}> = ({kind, x, y, size = 40, color = C.ink}) => <g transform={`translate(${x} ${y}) scale(${size / 40})`}><path d={paths[kind]} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" /></g>;

export const Artwork: React.FC<{box: Box; variant?: number; id: string}> = ({box: {x, y, w, h, r}, variant = 1, id}) => <g><clipPath id={id}><rect x={x + 8} y={y + 8} width={w - 16} height={h - 16} rx={Math.max(2, r - 6)} /></clipPath><g clipPath={`url(#${id})`}>
  <rect x={x} y={y} width={w} height={h} fill={variant % 2 ? C.ink : C.pale} />
  {variant === 0 ? <><circle cx={x + w * 0.5} cy={y + h * 0.4} r={w * 0.27} fill="none" stroke={C.blue} strokeWidth={w * 0.13} /><path d={`M${x} ${y + h * 0.85}L${x + w} ${y + h * 0.3}V${y + h}H${x}Z`} fill={C.ink} /></> : null}
  {variant === 1 ? <><rect x={x + w * 0.12} y={y + h * 0.12} width={w * 0.21} height={h * 0.64} fill={C.paper} /><rect x={x + w * 0.4} y={y + h * 0.27} width={w * 0.23} height={h * 0.65} fill={C.blue} /><rect x={x + w * 0.7} y={y + h * 0.05} width={w * 0.15} height={h * 0.46} fill={C.pale} /></> : null}
  {variant === 2 ? <><circle cx={x + w * 0.62} cy={y + h * 0.32} r={w * 0.29} fill={C.ink} /><rect x={x + w * 0.12} y={y + h * 0.5} width={w * 0.62} height={h * 0.38} fill={C.blue} /><path d={`M${x} ${y + h}L${x + w} ${y + h * 0.54}`} stroke={C.paper} strokeWidth={w * 0.1} /></> : null}
  {variant === 3 ? <>{[0, 1, 2, 3].map(i => <circle key={i} cx={x + w / 2} cy={y + h / 2} r={w * (0.1 + i * 0.13)} fill="none" stroke={i % 2 ? C.blue : C.paper} strokeWidth={w * 0.06} />)}</> : null}
</g></g>;

export const Clip: React.FC<{id: string; box: Box; children: React.ReactNode}> = ({id, box, children}) => <><clipPath id={id}><path d={modulePath(box)} /></clipPath><g clipPath={`url(#${id})`}>{children}</g></>;
