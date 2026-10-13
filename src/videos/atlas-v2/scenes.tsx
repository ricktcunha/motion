import React from 'react';
import {Artwork, Clip, Icon, Label, Line, Mark, Reveal, T} from './graphics';
import {Box, C, LIBRARY, mix, p, settle, typed, visible} from './motion';

export const Origin: React.FC<{t: number}> = ({t}) => <g opacity={1 - p(t, 4.05, 4.65)}>
  <Label x={960} y={205} anchor="middle" color={C.blue} opacity={p(t, 0.15, 0.6)}>UM EQUIPAMENTO. OUTRAS POSSIBILIDADES.</Label>
  <Reveal id="v2-origin" t={t} start={0.35} x={960} y={335} anchor="middle" lines={['Dei uma', 'nova função.']} size={112} />
  <T x={960} y={545} size={44} anchor="middle" opacity={p(t, 1.15, 1.7)}>a um Mac mini de 2014.</T>
  <Label x={960} y={915} anchor="middle" opacity={p(t, 1.65, 2.15)}>2014 → UM NOVO COMEÇO</Label>
</g>;

export const Terminal: React.FC<{t: number; box: Box}> = ({t, box: b}) => <g>
  <g opacity={visible(t, 4.45, 10.55, 0.5)}>
    <Reveal id="v2-terminal-title" t={t} start={4.5} x={300} y={275} lines={['Criei o Atlas.']} size={96} />
    <T x={300} y={960} size={36}>Meu laboratório de infraestrutura.</T>
  </g>
  <Clip id="v2-terminal-clip" box={b}><g opacity={visible(t, 5.15, 10.45, 0.3)}>
    <Label x={b.x + 64} y={b.y + 48} size={22} color={C.pale}>ATLAS / SESSÃO SSH</Label>
    <T x={b.x + 70} y={b.y + 172} mono size={46} color={C.paper}>$ {typed('ssh atlas', t, 5.65, 0.75)}</T>
    <g opacity={p(t, 6.65, 7.05)}><Icon kind="check" x={b.x + 68} y={b.y + 225} color={C.blue} size={32} /><T x={b.x + 120} y={b.y + 255} mono size={30} color={C.pale}>Conexão estabelecida.</T></g>
    <T x={b.x + 70} y={b.y + 380} mono size={46} color={C.paper} opacity={p(t, 7.2, 7.5)}>atlas:~$</T>
    <rect x={b.x + 306} y={b.y + 343} width={25} height={44} fill={C.blue} opacity={p(t, 7.2, 7.5) * (t < 9.8 ? (Math.floor((t - 7.2) * 2) % 2 ? 0.4 : 1) : 1)} />
    <Label x={b.x + 70} y={b.y + 475} color={C.pale} size={22} opacity={0.7}>SERVIDOR PESSOAL</Label>
    <Label x={b.x + b.w - 70} y={b.y + 475} color={C.pale} size={22} anchor="end">Debian 13 · Linux · Redes · IA</Label>
  </g></Clip>
</g>;

export const Library: React.FC<{t: number; box: Box}> = ({t, box: b}) => {
  const q = p(t, 13.7, 14.7), out = 1 - p(t, 17.1, 17.8);
  const selectionScale = 1 + 0.025 * Math.sin(Math.PI * p(t, 11.9, 12.4));
  return <g>
    <g opacity={visible(t, 10.55, 17.65, 0.5)}>
      <Reveal id="v2-library-title" t={t} start={10.6} x={150} y={250} lines={['Minha biblioteca.']} size={96} />
      <T x={150} y={330} size={44} opacity={p(t, 11.0, 11.45)}>Na TV e no celular.</T><T x={1770} y={250} size={38} anchor="end" color={C.blue} weight={600}>Jellyfin</T>
    </g>
    <g opacity={out}>{[0, 2, 3].map((variant, i) => {
      const x = mix(LIBRARY.columns[variant], [160, 355, 550][i], q), y = mix(LIBRARY.y, 485, q), w = mix(LIBRARY.w, 140, q), h = mix(LIBRARY.h, 180, q);
      const a = p(t, 11.15 + i * 0.12, 11.75 + i * 0.12);
      const box: Box = {x, y: y + mix(55, 0, a), w, h, r: 12, tail: 0, fill: C.paper};
      const gallery = 1 - p(t, 13.7, 14.05), thumbnails = p(t, 14.3 + i * 0.08, 14.8 + i * 0.08);
      return <g key={variant} opacity={a * (gallery + thumbnails)}><Artwork box={box} id={`v2-cover-${variant}`} variant={variant} /><T x={x + w / 2} y={box.y + h + LIBRARY.captionGap} size={28} weight={500} anchor="middle" color={C.gray} opacity={1 - p(t, 13.65, 13.95)}>{['Filmes', 'Shows', 'Animes'][i]}</T></g>;
    })}
      <g opacity={(1 - p(t, 13.65, 13.95)) * p(t, 11.4, 11.85)}><T x={b.x + b.w / 2} y={b.y + b.h + LIBRARY.captionGap} size={28} weight={600} anchor="middle" color={C.blue}>Séries</T><Line d={`M${b.x + b.w / 2 - 22} ${b.y + b.h + 70}H${b.x + b.w / 2 + 22}`} color={C.blue} width={2} progress={p(t, 11.9, 12.25)} /></g>
      <T x={160} y={445} size={34} weight={500} opacity={p(t, 14.15, 14.65)}>Biblioteca pessoal.</T>
    </g>
    <g opacity={visible(t, 10.5, 17.7, 0.4)}><Artwork box={b} id="v2-selected-art" variant={1} /></g>
    <g opacity={p(t, 11.9, 12.25) * (1 - p(t, 17.1, 17.6))}>
      <g transform={`translate(${b.x + b.w / 2} ${b.y + b.h / 2}) scale(${selectionScale}) translate(${-b.x - b.w / 2} ${-b.y - b.h / 2})`}><rect x={b.x - 9} y={b.y - 9} width={b.w + 18} height={b.h + 18} rx={b.r + 6} fill="none" stroke={C.blue} strokeWidth={3} opacity={1 - q} /></g>
    </g>
    <g opacity={p(t, 14.4, 14.85) * out}>
      <circle cx={b.x + b.w / 2} cy={b.y + b.h / 2} r={43} fill={C.paper} /><Icon kind="play" x={b.x + b.w / 2 - 22} y={b.y + b.h / 2 - 22} size={44} color={C.blue} />
      <Line d={`M${b.x + b.w / 2} ${b.y + b.h}V${b.y + b.h + 38}M${b.x + b.w / 2 - 75} ${b.y + b.h + 38}H${b.x + b.w / 2 + 75}`} />
      <Label x={b.x + b.w / 2} y={927} anchor="middle" size={23}>JELLYFIN / TV EM CASA</Label>
      <g transform={`translate(0 ${mix(35, 0, settle(t, 14.85))})`} opacity={p(t, 14.85, 15.4)}>
        <rect x={1650} y={535} width={160} height={305} rx={25} fill={C.paper} stroke={C.ink} strokeWidth={3} />
        <Artwork box={{x: 1658, y: 575, w: 144, h: 211, r: 10, tail: 0, fill: C.ink}} id="v2-phone-art" />
        <rect x={1707} y={551} width={46} height={5} rx={2.5} fill={C.ink} />
        <T x={1730} y={817} size={20} anchor="middle">Jellyfin</T>
      </g>
      <g opacity={p(t, 15.3, 15.8)}>
        <rect x={160} y={785} width={515} height={122} rx={18} fill={C.pale} />
        <Icon kind="download" x={182} y={808} size={32} color={C.blue} /><T x={234} y={840} size={32} weight={500}>qBittorrent</T>
        <T x={234} y={878} size={25} color={C.gray}>{t < 16.2 ? 'Em fila' : 'Disponível'} · demonstração</T>
        <Line d="M675 845H727V630H800" color={C.blue} progress={p(t, 15.6, 16.2)} width={2.5} />
      </g>
    </g>
  </g>;
};

export const Task: React.FC<{t: number; box: Box}> = ({t, box: b}) => {
  const out = 1 - p(t, 23.1, 23.8);
  return <g>
    <g opacity={visible(t, 17.65, 23.8, 0.5)}><Reveal id="v2-task-title" t={t} start={17.65} x={150} y={245} lines={['Hermes, meu', 'assistente pessoal.']} size={82} /></g>
    <Clip id="v2-task-clip" box={b}><g opacity={p(t, 18.45, 18.85) * out}>
      <Label x={b.x + 80} y={b.y + 394} size={21}>TAREFA AGENDADA · DEMONSTRAÇÃO</Label>
      {['FREQUÊNCIA', 'DESTINO'].map((label, i) => <g key={label} opacity={p(t, 18.9 + i * 0.13, 19.35 + i * 0.13)} transform={`translate(0 ${mix(22, 0, p(t, 18.9 + i * 0.13, 19.35 + i * 0.13))})`}><Label x={b.x + 920} y={b.y + 85 + i * 102} size={22}>{label}</Label><T x={b.x + 920} y={b.y + 132 + i * 102} size={36} weight={500}>{i === 0 ? 'Diária' : 'Telegram'}</T></g>)}
      <Line d={`M${b.x + 175} ${b.y + 285}H${b.x + 1150}`} color={C.gray} width={2} progress={p(t, 19.15, 19.6)} />
      {['Agendada', 'Em execução', 'Concluída'].map((state, i) => {
        const active = t >= [19.1, 20.9, 22.1][i] && (i === 2 || t < [20.9, 22.1, 30][i]);
        const x = b.x + [175, 660, 1150][i];
        return <g key={state} opacity={p(t, 19.15 + i * 0.12, 19.6 + i * 0.12)}><circle cx={x} cy={b.y + 285} r={active ? 12 : 7} fill={active ? C.blue : C.paper} stroke={active ? C.blue : C.gray} strokeWidth={2} /><T x={x} y={b.y + 335} anchor="middle" size={29} weight={active ? 600 : 400} color={active ? C.blue : C.gray}>{state}</T></g>;
      })}
      <Icon kind="clock" x={b.x + 844} y={b.y + 76} size={44} color={C.blue} />
    </g></Clip>
    <g opacity={visible(t, 21.35, 23.85)}>
      <Line d="M675 937H1220" color={C.blue} width={3} progress={p(t, 21.4, 22.15)} />
      {['Atlas', 'Hermes', 'Telegram'].map((name, i) => <g key={name} opacity={p(t, 21.4 + i * 0.16, 21.8 + i * 0.16)}><rect x={520 + i * 320} y={905} width={230} height={64} rx={32} fill={C.paper} stroke={C.blue} strokeWidth={2} /><T x={635 + i * 320} y={948} size={28} anchor="middle" weight={500}>{name}</T></g>)}
    </g>
  </g>;
};

// Shared text travels with the module through task → message → history.
export const TaskMessageTitle: React.FC<{t: number; box: Box}> = ({t, box: b}) => {
  const compact = p(t, 28.85, 29.2), manual = p(t, 28.4, 29.35);
  return <g opacity={visible(t, 18.5, 30.9, 0.4)}>
    <g opacity={1 - p(t, 23.15, 23.5)}><T x={b.x + 80} y={b.y + 100} size={54} weight={600} spacing={-1.6}>Resumo diário</T><T x={b.x + 80} y={b.y + 162} size={54} weight={600} spacing={-1.6}>de tecnologia</T></g>
    <T x={b.x + 80} y={b.y + 97} size={46} weight={600} spacing={-1} opacity={p(t, 23.55, 24.0) * (1 - p(t, 28.4, 28.7))}>Resumo diário de tecnologia</T>
    <g opacity={compact}><Label x={b.x + 36} y={b.y + 37} size={18}>ENTREGA AUTOMÁTICA ANTERIOR</Label><T x={b.x + 36} y={b.y + 84} size={28} weight={500}>Resumo diário de tecnologia</T></g>
    <g opacity={p(t, 24.2, 24.55)}><Icon kind="check" x={b.x + b.w - 86} y={b.y + mix(70, 61, manual)} size={mix(34, 28, manual)} color={C.blue} /></g>
  </g>;
};

export const Conversation: React.FC<{t: number; box: Box}> = ({t, box: b}) => {
  const manual = p(t, 28.4, 29.35), out = 1 - p(t, 33.25, 33.85);
  const automatic = 1 - p(t, 28.4, 28.78);
  return <g>
    <g opacity={visible(t, 23.6, 28.8, 0.5)}><Reveal id="v2-news-title" t={t} start={23.6} x={150} y={260} lines={['Notícias tech.']} size={100} /><T x={150} y={345} size={44} opacity={p(t, 24.0, 24.5)}>Todos os dias, no Telegram.</T></g>
    <g opacity={visible(t, 28.55, 33.8, 0.4)}>
      <Reveal id="v2-manual-title" t={t} start={28.6} x={150} y={280} lines={['Pesquisa,', 'downloads,', 'documentos.']} size={86} width={670} />
      {['Pesquisa na internet', 'Download de materiais', 'Preparação de documentos'].map((line, i) => <g key={line} opacity={p(t, 29.55 + i * 0.18, 30.15 + i * 0.18)} transform={`translate(0 ${mix(20, 0, p(t, 29.55 + i * 0.18, 30.15 + i * 0.18))})`}><Icon kind={(['network', 'download', 'document'] as const)[i]} x={150} y={652 + i * 73} size={32} color={C.blue} /><T x={204} y={680 + i * 73} size={30}>{line}</T></g>)}
    </g>
    <g opacity={p(t, 23.8, 24.3) * out}>
      <g transform={`translate(${mix(330, 830, manual)} ${mix(420, 288, manual)})`}><Mark x={0} y={0} size={60} /><T x={84} y={49} size={34} weight={600}>Atlas · Hermes</T><Label x={mix(1260, 810, manual)} y={46} anchor="end" size={22} color={C.blue} opacity={automatic}>ENTREGA AUTOMÁTICA</Label><g opacity={manual}><Icon kind="send" x={730} y={17} size={32} color={C.blue} /></g></g>
      <g opacity={automatic}>
        <Clip id="v2-receipt-clip" box={b}><T x={b.x + 80} y={b.y + 162} size={32} color={C.gray} opacity={p(t, 24.3, 24.8)}>Recebido automaticamente.</T></Clip>
        <Label x={330} y={862} size={22}>INTERFACE CONCEITUAL · DEMONSTRAÇÃO</Label>
      </g>
      <g opacity={manual}>
        <Label x={830} y={378} size={21}>CONVERSA MANUAL · DEMONSTRAÇÃO</Label>
        <g opacity={p(t, 30.65, 31.0)}><rect x={830} y={435} width={810} height={128} rx={18} fill={C.pale} /><Label x={866} y={472} size={18}>ENTREGA AUTOMÁTICA ANTERIOR</Label><T x={866} y={519} size={28} weight={500}>Resumo diário de tecnologia</T><Icon kind="check" x={1554} y={496} size={28} color={C.blue} /></g>
        <g opacity={p(t, 29.75, 30.4)} transform={`translate(0 ${mix(30, 0, settle(t, 29.75))})`}>
          <rect x={930} y={600} width={710} height={108} rx={22} fill={C.blue} /><T x={966} y={665} size={31} weight={500} color={C.paper}>Pesquise e prepare um documento.</T>
        </g>
        <g opacity={visible(t, 31.25, 32.25, 0.2)}><T x={b.x + 38} y={b.y + 68} size={32} weight={500}>Documento pronto.</T><Icon kind="check" x={b.x + b.w - 76} y={b.y + 42} size={28} color={C.blue} /></g>
        <g opacity={p(t, 32.0, 32.45)}><rect x={830} y={770} width={515} height={112} rx={20} fill={C.pale} /><T x={868} y={838} size={32} weight={500}>Documento pronto.</T><Icon kind="check" x={1270} y={812} size={28} color={C.blue} /></g>
      </g>
    </g>
    <Clip id="v2-document-clip" box={b}><g opacity={visible(t, 32.25, 33.9, 0.3)}>
      <Icon kind="document" x={b.x + b.w / 2 - 31} y={b.y + 22} size={62} color={C.blue} /><T x={b.x + b.w / 2} y={b.y + b.h - 32} size={26} weight={500} anchor="middle">Documento</T>
    </g></Clip>
  </g>;
};

const NetworkNode: React.FC<{x: number; y: number; w: number; title: string; subtitle: string; kind?: 'server' | 'play' | 'clock'}> = ({x, y, w, title, subtitle, kind = 'play'}) => <g>
  <rect x={x} y={y} width={w} height={116} rx={18} fill={C.paper} stroke={C.ink} strokeWidth={2.5} />
  {kind === 'server' ? <Mark x={x + 18} y={y + 18} size={60} /> : <Icon kind={kind} x={x + 22} y={y + 35} size={36} color={C.blue} />}
  <T x={x + 88} y={y + 49} size={31} weight={600}>{title}</T><T x={x + 88} y={y + 87} size={21} color={C.gray}>{subtitle}</T>
</g>;

export const Network: React.FC<{t: number; box: Box}> = ({t, box: b}) => {
  const enter = p(t, 33.75, 34.75), exit = p(t, 37.85, 38.8);
  const shift = mix(55, 0, enter), camera = 1 - p(t, 37.85, 39.2) * 0.6;
  const distance = p(t, 35.6, 36.3) * 1545;
  const dot = distance < 70 ? {x: 1595, y: 830 + distance} : distance < 1295 ? {x: 1595 - (distance - 70), y: 900} : {x: 370, y: 900 - (distance - 1295)};
  return <g>
    <g opacity={visible(t, 33.8, 38.15, 0.5)}><Reveal id="v2-network-title" t={t} start={33.8} x={150} y={245} lines={['Jellyfin na TV.']} size={88} /><T x={150} y={327} size={52} opacity={p(t, 34.15, 34.65)}>E no celular, via Tailscale.</T><T x={150} y={972} size={32} weight={500}>Construído para aprender.</T></g>
    <Clip id="v2-network-clip" box={b}><g opacity={enter * (1 - exit)} transform={`translate(${b.x + b.w / 2} ${b.y + b.h / 2}) scale(${camera}) translate(-750 -620)`}>
      <Label x={212} y={455} size={22}>MINHA REDE / DEBIAN 13</Label>
      <g transform={`translate(0 ${shift * 0.5})`}>
        <Line d="M530 585H655V546H690M1010 546H1100V610M370 650V744H690" width={2.5} color={C.gray} progress={p(t, 34.45, 35.15)} />
        <Label x={670} y={522} size={19} anchor="end">MÍDIA</Label>
      </g>
      <g transform={`translate(0 ${shift})`}>
        <g opacity={p(t, 34.3, 34.7)}><NetworkNode x={220} y={530} w={310} title="Atlas" subtitle="Mac mini · 2014" kind="server" /></g>
        <g opacity={p(t, 34.45, 34.85)}><NetworkNode x={690} y={488} w={320} title="Jellyfin" subtitle="Biblioteca de mídia" /></g>
        <g opacity={p(t, 34.6, 35.0)}><NetworkNode x={690} y={685} w={320} title="Hermes" subtitle="Automações e IA" kind="clock" /></g>
        <g opacity={p(t, 34.65, 35.05)}><rect x={1048} y={594} width={225} height={138} rx={12} fill={C.paper} stroke={C.ink} strokeWidth={2.5} /><Icon kind="play" x={1140} y={627} size={36} color={C.blue} /><Line d="M1160 732V757M1120 757H1200" width={2.5} /><T x={1160} y={791} size={25} anchor="middle">TV em casa</T></g>
      </g>
    </g></Clip>
    <g opacity={p(t, 34.8, 35.3) * (1 - exit)} transform={`translate(${mix(25, 0, enter)} 0)`}>
      <Label x={1595} y={474} anchor="middle" size={22}>ACESSO REMOTO</Label>
      <rect x={1510} y={550} width={170} height={280} rx={26} fill={C.paper} stroke={C.ink} strokeWidth={3} /><rect x={1522} y={588} width={146} height={182} rx={12} fill={C.pale} /><Icon kind="play" x={1572} y={649} size={44} color={C.blue} /><T x={1595} y={801} size={23} anchor="middle">Jellyfin</T><rect x={1572} y={566} width={46} height={5} rx={2.5} fill={C.ink} />
      <Line d="M1595 830V900H370V650" color={C.blue} progress={p(t, 35.6, 36.3)} width={3} />
      <Label x={1300} y={943} size={25} anchor="middle" color={C.blue}>VIA TAILSCALE</Label>
      <circle cx={dot.x} cy={dot.y} r={7} fill={C.blue} opacity={visible(t, 35.6, 36.55, 0.15)} />
    </g>
  </g>;
};

export const Ending: React.FC<{t: number}> = ({t}) => <g>
  <Reveal id="v2-ending-title" t={t} start={38.55} x={960} y={275} anchor="middle" lines={['Obrigado por', 'acompanhar.']} size={104} />
  <g opacity={p(t, 38.9, 39.5)} transform={`translate(0 ${mix(20, 0, p(t, 38.9, 39.5))})`}><T x={960} y={492} size={38} anchor="middle">Conheça o Atlas no meu portfólio.</T></g>
  <g opacity={p(t, 39.08, 39.65)}><T x={960} y={568} size={30} anchor="middle" mono color={C.blue}>ricktcunha.space/trabalhos/atlas</T></g>
  <g opacity={p(t, 39.25, 39.85)} transform={`translate(0 ${mix(12, 0, p(t, 39.25, 39.85))})`}><Mark x={835} y={906} size={68} /><T x={922} y={956} size={54} weight={700} spacing={-2}>ATLAS</T><Label x={960} y={1005} anchor="middle" size={20}>UM EQUIPAMENTO. OUTRAS POSSIBILIDADES.</Label></g>
</g>;
