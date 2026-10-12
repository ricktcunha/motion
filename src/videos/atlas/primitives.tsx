import React from 'react';
import {ATLAS, C, mix, progress} from './design';

export const T: React.FC<{x: number; y: number; children: React.ReactNode; size?: number; weight?: number; color?: string; mono?: boolean; spacing?: number; anchor?: 'start' | 'middle' | 'end'; opacity?: number}> = ({x, y, children, size = 28, weight = 400, color = C.ink, mono = false, spacing = 0, anchor = 'start', opacity = 1}) => <text x={x} y={y} fill={color} fontSize={size} fontFamily={mono ? ATLAS.mono : ATLAS.sans} fontWeight={weight} letterSpacing={spacing} textAnchor={anchor} opacity={opacity}>{children}</text>;

export const Label: React.FC<{x: number; y: number; children: React.ReactNode; color?: string; size?: number}> = ({x, y, children, color = C.gray, size = 19}) => <T x={x} y={y} size={size} weight={500} color={color} spacing={1.5}>{children}</T>;

export const Line: React.FC<{d: string; color?: string; width?: number; p?: number; dash?: string}> = ({d, color = C.ink, width = 3, p = 1, dash}) => <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={dash ?? 1} strokeDashoffset={dash ? undefined : 1 - p} />;

export const AtlasMark: React.FC<{x: number; y: number; size?: number; color?: string; indicator?: boolean}> = ({x, y, size = 64, color = C.ink, indicator = false}) => <g transform={`translate(${x} ${y}) scale(${size / 64})`}>
  <rect x={2} y={17} width={60} height={30} rx={10} fill="none" stroke={color} strokeWidth={3} />
  <path d="M4 29H60" fill="none" stroke={color} strokeWidth={2} />
  <rect x={48} y={35} width={5} height={5} rx={2.5} fill={indicator ? C.blue : color} />
</g>;

export const Icon: React.FC<{kind: 'play' | 'download' | 'clock' | 'send' | 'check' | 'network' | 'study' | 'briefcase' | 'document'; x: number; y: number; size?: number; color?: string}> = ({kind, x, y, size = 40, color = C.ink}) => {
  const paths = {
    play: 'M14 7L34 20L14 33Z', download: 'M20 4V27M11 18L20 27L29 18M7 31V36H33V31',
    clock: 'M20 4A16 16 0 1 1 19.99 4M20 10V20L27 24', send: 'M4 5L36 20L4 35L10 20ZM10 20H36',
    check: 'M7 21L16 30L33 10', network: 'M20 7V20M7 30V20H33V30M13 7H27M3 32H11M16 32H24M29 32H37',
    study: 'M4 8Q12 5 20 10Q28 5 36 8V32Q28 29 20 34Q12 29 4 32ZM20 10V34',
    briefcase: 'M5 13H35V33H5ZM13 13V6H27V13M5 22H35M17 22V27H23V22',
    document: 'M10 4H26L34 12V36H10ZM26 4V12H34M15 19H29M15 25H29M15 31H25',
  };
  return <g transform={`translate(${x} ${y}) scale(${size / 40})`}><path d={paths[kind]} fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" /></g>;
};

export const Headline: React.FC<{id: string; lines: string[]; size?: number; x?: number; y?: number; t: number; start: number; end?: number; weight?: number}> = ({id, lines, size = 94, x = 112, y = 324, t, start, end = 50, weight = 600}) => {
  const out = 1 - progress(t, end - 0.32, end);
  return <g opacity={out}>{lines.map((text, i) => {
    const baseline = y + i * size * 1.08;
    const p = progress(t, start + i * 0.09, start + 0.56 + i * 0.09);
    return <g key={text}>
      <clipPath id={`${id}-${i}`}><rect x={x - 2} y={baseline - size * 1.06} width={710} height={size * 1.3} /></clipPath>
      <g clipPath={`url(#${id}-${i})`}><g transform={`translate(0 ${mix(size * 1.2, 0, p)})`}><T x={x} y={baseline} size={size} weight={weight} spacing={-size * 0.045}>{text}</T></g></g>
    </g>;
  })}</g>;
};

export const Cover: React.FC<{x: number; y: number; w?: number; h?: number; variant?: number; selected?: boolean}> = ({x, y, w = 180, h = 244, variant = 0, selected = false}) => <g>
  <clipPath id={`cover-${x}-${y}`}><rect x={x} y={y} width={w} height={h} rx={4} /></clipPath>
  <g clipPath={`url(#cover-${x}-${y})`}>
    <rect x={x} y={y} width={w} height={h} fill={variant % 2 ? C.ink : C.pale} />
    {variant === 0 && <><circle cx={x + w / 2} cy={y + h * 0.48} r={w * 0.36} fill="none" stroke={C.blue} strokeWidth={w * 0.16} /><path d={`M${x} ${y + h * 0.85}L${x + w} ${y + h * 0.30}V${y + h}H${x}Z`} fill={C.ink} /></>}
    {variant === 1 && <><rect x={x + w * 0.12} y={y + h * 0.13} width={w * 0.24} height={h * 0.68} fill={C.paper} /><rect x={x + w * 0.42} y={y + h * 0.24} width={w * 0.22} height={h * 0.67} fill={C.blue} /><rect x={x + w * 0.70} y={y + h * 0.06} width={w * 0.15} height={h * 0.48} fill={C.pale} /></>}
    {variant === 2 && <><circle cx={x + w * 0.62} cy={y + h * 0.33} r={w * 0.29} fill={C.ink} /><rect x={x + w * 0.12} y={y + h * 0.50} width={w * 0.62} height={h * 0.38} fill={C.blue} /><path d={`M${x} ${y + h}L${x + w} ${y + h * 0.54}`} stroke={C.paper} strokeWidth={w * 0.12} /></>}
    {variant === 3 && <>{[0, 1, 2, 3].map(i => <circle key={i} cx={x + w / 2} cy={y + h / 2} r={w * (0.12 + i * 0.14)} fill="none" stroke={i % 2 ? C.blue : C.paper} strokeWidth={w * 0.065} />)}</>}
  </g>
  {selected && <rect x={x - 7} y={y - 7} width={w + 14} height={h + 14} rx={9} fill="none" stroke={C.blue} strokeWidth={3} />}
</g>;
