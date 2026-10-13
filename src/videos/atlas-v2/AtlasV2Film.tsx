import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Html5Audio, Sequence, cancelRender, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import config from './project.json';
import {Clip, Label, Line, Mark, T} from './graphics';
import {Box, C, mix, moduleAt, modulePath, p, visible} from './motion';
import {Conversation, Ending, Library, Network, Origin, Task, TaskMessageTitle, Terminal} from './scenes';

export type AtlasV2Props = {muted?: boolean; stillTime?: number};
let fontPromise: Promise<void> | undefined;
const loadFonts = () => {
  if (!fontPromise) fontPromise = Promise.all([
    new FontFace('Space Grotesk', `url("${staticFile(`${config.projectFolder}/assets/fonts/SpaceGrotesk.ttf`)}")`, {weight: '300 700'}).load(),
    new FontFace('IBM Plex Mono', `url("${staticFile(`${config.projectFolder}/assets/fonts/IBMPlexMono-Regular.ttf`)}")`).load(),
  ]).then(fonts => {fonts.forEach(font => document.fonts.add(font));});
  return fontPromise;
};

type Scene = {name: string; start: number; end: number; component: React.ComponentType<{t: number; box: Box}>};
const scenes: Scene[] = [
  {name: 'origin', start: 0, end: 5.3, component: Origin},
  {name: 'terminal', start: 4.3, end: 11.3, component: Terminal},
  {name: 'library', start: 10.3, end: 18.3, component: Library},
  {name: 'task', start: 17.4, end: 24.6, component: Task},
  {name: 'conversation', start: 23.3, end: 34.3, component: Conversation},
  {name: 'network', start: 33.5, end: 39.4, component: Network},
  {name: 'ending', start: 38, end: 45, component: Ending},
];
const svgStyle: React.CSSProperties = {position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible'};

export const AtlasV2Film: React.FC<AtlasV2Props> = ({muted = false, stillTime}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = stillTime ?? frame / fps, box = moduleAt(t);
  const [fontHandle] = useState(() => delayRender('Carregando fontes do Atlas 2.0'));
  useEffect(() => {loadFonts().then(() => continueRender(fontHandle)).catch(cancelRender);}, [fontHandle]);
  const headerFade = 1 - p(t, 38.05, 38.65);
  const seam = t > 30 ? p(t, 38.65, 39.25) : p(t, 1.1, 1.65) * (1 - p(t, 10.0, 10.5));
  const terminalProgress = t > 30 ? 0 : p(t, 4.1, 5.2);
  const stage = t < 5 ? '01 / ORIGEM' : t < 11 ? '02 / SERVIDOR' : t < 18 ? '03 / BIBLIOTECA' : t < 24 ? '04 / AUTOMAÇÕES' : t < 29 ? '05 / ENTREGA' : t < 34 ? '06 / ASSISTENTE' : '07 / ACESSO';
  const gridX = 70 * p(t, 32.9, 33.5) * (1 - p(t, 33.5, 34.8));
  return <AbsoluteFill style={{backgroundColor: C.paper}}>
    {!muted && stillTime === undefined ? <Html5Audio src={staticFile(`${config.projectFolder}/assets/atlas-v2-original.wav`)} /> : null}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" style={svgStyle} aria-label="Atlas 2.0: laboratório pessoal de infraestrutura">
      <g opacity={0.055 * headerFade} transform={`translate(${gridX} 0)`}>{[96, 528, 960, 1392, 1824].map(x => <line key={x} x1={x} x2={x} y1={165} y2={968} stroke={C.gray} />)}{[180, 540, 900].map(y => <line key={y} x1={96} x2={1824} y1={y} y2={y} stroke={C.gray} />)}</g>
      <rect x={96} y={400} width={1728} height={550} rx={32} fill={C.pale} opacity={visible(t, 10.5, 17.75, 0.7) * 0.28} />
      <path d={modulePath(box)} fill={box.fill} opacity={p(t, 0.75, 1.45)} />
    </svg>
    {scenes.map(({name, start, end, component: SceneComponent}) => {
      const content = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" style={svgStyle}><SceneComponent t={t} box={box} /></svg>;
      return stillTime === undefined
        ? <Sequence key={name} from={Math.round(start * fps)} durationInFrames={Math.round((end - start) * fps)} premountFor={fps}>{content}</Sequence>
        : (t >= start && t < end ? <React.Fragment key={name}>{content}</React.Fragment> : null);
    })}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" style={svgStyle}>
      <Clip id="v2-shared-title-clip" box={box}><TaskMessageTitle t={t} box={box} /></Clip>
      <path d={modulePath(box)} fill="none" stroke={C.ink} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p(t, 0.8, 1.6)} />
      <g opacity={seam}><Line d={`M${box.x + 5} ${box.y + mix(45, 72, terminalProgress)}H${box.x + box.w - 5}`} color={terminalProgress > 0.5 ? C.gray : C.ink} width={2} /><circle cx={box.x + box.w - mix(75, 60, terminalProgress)} cy={box.y + mix(box.h * 0.68, 36, terminalProgress)} r={5} fill={C.blue} opacity={t > 30 ? p(t, 38.9, 39.2) : p(t, 1.75, 2.0)} /></g>
      <g opacity={headerFade}>
        <Label x={96} y={87} size={22} color={C.blue}>{stage}</Label><Mark x={1588} y={43} size={60} /><T x={1668} y={87} size={30} weight={600}>ATLAS / 02</T>
        <Line d="M96 1030H1824" color={C.gray} width={1} opacity={0.22} /><Line d={`M96 1030H${96 + 1728 * Math.min(t / 40, 1)}`} color={C.blue} width={2} />
      </g>
    </svg>
  </AbsoluteFill>;
};
