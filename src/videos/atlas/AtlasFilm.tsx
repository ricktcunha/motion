import React, {useEffect, useState} from 'react';
import {AbsoluteFill, cancelRender, continueRender, delayRender, Html5Audio, staticFile, useCurrentFrame} from 'remotion';
import {ATLAS, C, mix, panelAt, progress, settle, signalAt, typed, visible} from './design';
import {AtlasMark, Cover, Headline, Icon, Label, Line, T} from './primitives';

export type AtlasProps = {stillTime?: number; muted?: boolean};
const base = '001. atlas';
let fontPromise: Promise<void> | undefined;
const loadFonts = () => {
  if (!fontPromise) {
    fontPromise = Promise.all([
      new FontFace(ATLAS.sans, `url("${staticFile(`${base}/assets/fonts/SpaceGrotesk.ttf`)}")`, {weight: '300 700'}).load(),
      new FontFace(ATLAS.mono, `url("${staticFile(`${base}/assets/fonts/IBMPlexMono-Regular.ttf`)}")`, {weight: '400'}).load(),
    ]).then(fonts => {fonts.forEach(font => document.fonts.add(font));});
  }
  return fontPromise;
};

const Titles: React.FC<{t: number}> = ({t}) => <>
  <Headline id="origin" lines={['Dei uma', 'nova função']} t={t} start={0.46} end={4.88} />
  <g opacity={visible(t, 1.05, 4.88)}><T x={112} y={602} size={38}>a um Mac mini de 2014.</T></g>

  <Headline id="atlas" lines={['Criei', 'o Atlas.']} size={108} t={t} start={5.07} end={10.90} />
  <g opacity={visible(t, 5.76, 10.90)}>
    <T x={112} y={622} size={36}>Meu laboratório</T><T x={112} y={668} size={36}>de infraestrutura.</T>
    <T x={112} y={822} size={25} mono>Debian 13 · Linux</T><T x={112} y={858} size={25} mono>Redes · IA</T>
  </g>

  <Headline id="library" lines={['Minha', 'biblioteca.']} t={t} start={11.08} end={17.96} />
  <g opacity={visible(t, 11.65, 17.96)}>
    <T x={112} y={603} size={36}>Na TV e no celular.</T>
    <Label x={112} y={822}>SERVIÇO DE MÍDIA</Label><T x={112} y={864} size={34} weight={500}>Jellyfin</T>
  </g>

  <Headline id="auto" lines={['Hermes, meu', 'assistente pessoal.']} size={70} t={t} start={18.13} end={24.12} />
  <g opacity={visible(t, 18.82, 24.12)}>
    <T x={112} y={606} size={30}>Automatiza tarefas e pesquisa</T><T x={112} y={648} size={30}>na internet por mim.</T>
    <Label x={112} y={824}>EXECUÇÃO AUTOMÁTICA</Label><T x={112} y={865} size={30} weight={500}>Atlas → Hermes → Telegram</T>
  </g>

  <Headline id="news" lines={['Notícias tech.', 'Todos os dias,', 'no Telegram.']} size={72} t={t} start={24.16} end={29.00} />
  <g opacity={visible(t, 24.90, 29.00)}><Label x={112} y={824}>UMA TAREFA. UMA ENTREGA.</Label><T x={112} y={865} size={30}>Sem uma pergunta manual.</T></g>

  <Headline id="uses" lines={['Pesquisa,', 'downloads,', 'documentos.']} size={74} t={t} start={29.03} end={34.05} />
  <g opacity={visible(t, 29.70, 34.05)}>
    <Icon kind="network" x={112} y={774} size={30} /><T x={158} y={800} size={26}>Pesquisa na internet</T>
    <Icon kind="download" x={112} y={817} size={30} /><T x={158} y={843} size={26}>Baixa materiais</T>
    <Icon kind="document" x={112} y={860} size={30} /><T x={158} y={886} size={26}>Prepara documentos</T>
  </g>

  <Headline id="network" lines={['Jellyfin na TV.', 'E no celular,', 'via Tailscale.']} size={59} t={t} start={34.16} end={38.42} />
  <g opacity={visible(t, 36.05, 38.45)}><T x={112} y={791} size={43} weight={500} spacing={-1.4}>Construído</T><T x={112} y={845} size={43} weight={500} spacing={-1.4}>para aprender.</T></g>

  <Headline id="thanks" lines={['Obrigado por', 'acompanhar.']} size={94} t={t} start={39.00} />
  <g opacity={progress(t, 39.16, 39.70)}>
    <T x={112} y={577} size={39}>Conheça o Atlas</T><T x={112} y={628} size={39}>no meu portfólio.</T>
    <T x={112} y={716} size={26} mono color={C.blue}>{ATLAS.portfolio}</T>
    <AtlasMark x={112} y={819} size={90} /><T x={224} y={883} size={59} weight={700} spacing={-2}>ATLAS</T>
    <Label x={224} y={918}>LABORATÓRIO PESSOAL</Label>
  </g>
</>;

const MacDetail: React.FC<{t: number}> = ({t}) => {
  const panel = panelAt(t);
  const a = visible(t, 0.32, 4.90, 0.36) + progress(t, 39.14, 39.60);
  return <g opacity={a}>
    <Line d={`M${panel.x + 5} ${panel.y + 45}H${panel.x + panel.w - 5}`} color={C.gray} width={2} p={progress(t, 0.85, 1.6)} />
    <path d={`M${panel.x + 48} ${panel.y + panel.h - 2}H${panel.x + panel.w - 48}`} fill="none" stroke={C.ink} strokeWidth={5} />
    <g opacity={visible(t, 1.45, 4.70)}><Label x={1008} y={700}>MAC MINI / 2014</Label><T x={1008} y={742} size={28}>Uma nova função para o mesmo equipamento.</T></g>
    <g opacity={progress(t, 39.05, 39.65)}>
      <T x={1120} y={706} size={32} weight={500}>Um Mac mini de 2014.</T>
      <T x={1120} y={750} size={29}>Um servidor pessoal para</T><T x={1120} y={790} size={29}>minhas automações com Hermes.</T>
      <Line d="M1120 813H1736" color={C.gray} width={1.5} /><Label x={1120} y={852}>DEBIAN 13 · MÍDIA · AUTOMAÇÕES</Label>
    </g>
  </g>;
};

const Terminal: React.FC<{t: number}> = ({t}) => {
  const a = visible(t, 4.86, 10.82, 0.34);
  return <g opacity={a} clipPath="url(#active-panel)">
    <Line d="M800 334H1808" color={C.gray} width={1.5} />
    <Label x={856} y={304} color={C.paper}>ATLAS / SESSÃO SSH</Label>
    <T x={1748} y={303} size={20} mono color={C.paper} anchor="end">TERMINAL</T>
    <g transform={`translate(0 ${24 * (1 - progress(t, 5.12, 5.70))})`}>
      <T x={856} y={414} size={34} mono color={C.paper}>$ {typed('ssh atlas', t, 5.72, 6.52)}</T>
      <g opacity={progress(t, 6.78, 7.15)}>
        <Icon kind="check" x={856} y={457} size={31} color={C.pale} /><T x={903} y={482} size={28} mono color={C.pale}>Conexão estabelecida.</T>
      </g>
      <g opacity={progress(t, 7.15, 7.50)}><T x={856} y={603} size={34} mono color={C.paper}>atlas:~$</T></g>
    </g>
    <g opacity={progress(t, 7.60, 8.1)}>
      <Line d="M856 730H1752" color={C.gray} width={1} /><T x={856} y={784} size={23} mono color={C.pale}>Debian 13</T><T x={1752} y={784} size={23} mono color={C.paper} anchor="end">Servidor pessoal</T>
    </g>
  </g>;
};

const Library: React.FC<{t: number}> = ({t}) => {
  const a = visible(t, 10.98, 18.10, 0.32);
  const select = Math.max(0, settle(t, 12.08));
  const output = progress(t, 13.66, 14.46);
  const downloads = progress(t, 14.78, 15.38);
  return <g opacity={a}>
    <g clipPath="url(#active-panel)">
      <T x={824} y={312} size={28} weight={600}>Jellyfin</T><T x={1760} y={310} size={16} spacing={1} anchor="end" color={C.gray}>DEMONSTRAÇÃO</T>
      <Line d="M776 336H1808" color={C.gray} width={1} />
      {['Filmes', 'Séries', 'Shows', 'Animes'].map((name, i) => <T key={name} x={824 + i * 190} y={379} size={26} weight={i === 0 ? 600 : 400} color={i === 0 ? C.ink : C.gray}>{name}</T>)}
      {[0, 1, 2, 3].map((variant, i) => {
        const appear = progress(t, 11.32 + i * 0.065, 11.92 + i * 0.065);
        return <g key={i} transform={`translate(0 ${mix(28, 0, appear)})`} opacity={appear}>
          <Cover x={824 + i * 232} y={416} w={200} h={260} variant={variant} />
          {i === 1 ? <rect x={1049} y={409} width={214} height={274} rx={9} fill="none" stroke={C.blue} strokeWidth={3 * select} /> : null}
          <Line d={`M${824 + i * 232} 708H${944 + i * 232}`} color={C.gray} width={2} />
        </g>;
      })}
      <T x={824} y={761} size={22} color={C.gray}>Biblioteca pessoal</T><T x={1760} y={761} size={22} color={C.gray} anchor="end">Acesso em diferentes telas</T>
    </g>
    <g opacity={downloads} transform={`translate(0 ${mix(16, 0, downloads)})`}>
      <rect x={776} y={840} width={464} height={112} rx={12} fill={C.pale} />
      <Icon kind="download" x={800} y={865} size={40} color={C.blue} />
      <T x={859} y={883} size={27} weight={500}>qBittorrent</T><T x={859} y={921} size={21}>Em fila → Disponível</T>
      <Line d="M1240 896H1292V778" color={C.blue} width={3} p={progress(t, 15.38, 16.00)} />
      <T x={800} y={984} size={19} color={C.gray}>Downloads via qBittorrent · demonstração</T>
    </g>
    <g opacity={output} transform={`translate(0 ${mix(22, 0, output)})`}>
      <rect x={1467} y={796} width={22} height={8} fill={C.paper} />
      <Line d="M1156 684V776H1478V818" color={C.blue} width={3} p={output} />
      <rect x={1336} y={818} width={284} height={146} rx={8} fill={C.paper} stroke={C.ink} strokeWidth={3} />
      <rect x={1347} y={829} width={262} height={116} rx={2} fill={C.pale} />
      <Cover x={1353} y={834} w={250} h={80} variant={0} />
      <circle cx={1478} cy={874} r={22} fill={C.paper} />
      <Icon kind="play" x={1454} y={854} size={40} color={C.blue} />
      <rect x={1347} y={914} width={262} height={31} fill={C.ink} />
      <T x={1358} y={934} size={13} weight={500} color={C.paper}>Jellyfin · Reproduzindo</T>
      <Line d="M1446 964V982H1510" width={3} />
      <rect x={1690} y={818} width={84} height={160} rx={13} fill={C.paper} stroke={C.ink} strokeWidth={3} />
      <rect x={1698} y={842} width={68} height={112} rx={4} fill={C.pale} />
      <T x={1704} y={856} size={10} weight={600}>Jellyfin</T>
      <Cover x={1704} y={862} w={56} h={58} variant={0} />
      <rect x={1698} y={922} width={68} height={26} fill={C.ink} />
      <T x={1704} y={939} size={8} color={C.paper}>REPRODUZINDO</T>
      <Line d="M1720 830H1744M1712 967H1752" width={2} />
    </g>
  </g>;
};

const Status: React.FC<{t: number}> = ({t}) => {
  const active = t < 20.48 ? 0 : t < 21.80 ? 1 : 2;
  return <g opacity={visible(t, 18.86, 23.94)}>
    <Line d="M932 724H1570" color={C.gray} width={1.5} p={progress(t, 19.05, 19.75)} />
    {['Agendada', 'Em execução', 'Concluída'].map((name, i) => <g key={name}>
      <rect x={[902, 1162, 1474][i]} y={702} width={[198, 240, 252][i]} height={50} rx={25} fill={active === i ? C.pale : C.paper} />
      <T x={[956, 1216, 1528][i]} y={733} size={24} weight={active === i ? 500 : 400} color={active === i ? C.ink : C.gray}>{name}</T>
    </g>)}
  </g>;
};

const AutomationFlow: React.FC<{t: number}> = ({t}) => <g opacity={visible(t, 21.80, 24.26)}>
  <Line d="M945 884V868H1630V884M1268 868V884" color={C.blue} width={3} p={progress(t, 21.85, 22.55)} />
  {[{x: 880, name: 'Atlas', w: 130}, {x: 1134, name: 'Hermes Agent', w: 270}, {x: 1512, name: 'Telegram', w: 240}].map(({x, name, w}, i) => <g key={name} opacity={progress(t, 21.87 + i * 0.09, 22.2 + i * 0.09)}>
    <rect x={x} y={884} width={w} height={72} rx={10} fill={C.paper} stroke={C.ink} strokeWidth={2} />
    <T x={x + w / 2} y={931} size={26} weight={500} anchor="middle">{name}</T>
  </g>)}
</g>;

// This container really changes its bounds; the text is re-laid out, never scaled.
const TaskMessage: React.FC<{t: number}> = ({t}) => {
  const toMessage = progress(t, 23.60, 24.48);
  const toHistory = progress(t, 28.70, 29.40);
  const x = 880;
  const y = mix(mix(352, 394, toMessage), 386, toHistory);
  const w = mix(872, 776, toMessage);
  const h = mix(mix(304, 160, toMessage), 78, toHistory);
  const fontSize = mix(mix(40, 36, toMessage), 25, toHistory);
  const opacity = visible(t, 18.13, 33.85, 0.34);
  return <g opacity={opacity}>
    <rect x={x} y={y} width={w} height={h} rx={mix(8, 16, toMessage)} fill={C.pale} />
    <g opacity={1 - toHistory}>
      <T x={912} y={y + mix(65, 64, toMessage)} size={fontSize} weight={500}>Resumo diário</T>
      <T x={912} y={y + mix(114, 110, toMessage)} size={fontSize} weight={500}>de tecnologia</T>
    </g>
    <g opacity={toHistory}><T x={912} y={y + 48} size={25} weight={500}>Resumo diário de tecnologia</T></g>
    <g opacity={1 - toMessage}>
      <Label x={912} y={532} size={17} color={C.ink}>FREQUÊNCIA</Label><T x={912} y={575} size={31}>Diária</T>
      <Label x={1360} y={532} size={17} color={C.ink}>DESTINO</Label><T x={1360} y={575} size={31}>Telegram</T>
      <Icon kind="clock" x={1646} y={406} size={46} color={C.blue} />
    </g>
    <g opacity={toMessage * (1 - toHistory)}>
      <T x={912} y={600} size={22} color={C.gray}>Recebido automaticamente</T>
      <Icon kind="check" x={1634} y={511} size={25} color={C.blue} />
    </g>
  </g>;
};

const ChatFrame: React.FC<{t: number}> = ({t}) => {
  const autoHeader = visible(t, 18.16, 24.02);
  const chatHeader = visible(t, 23.96, 34.06);
  const manual = progress(t, 28.84, 29.42);
  return <g clipPath="url(#active-panel)">
    <g opacity={autoHeader}>
      <Icon kind="clock" x={864} y={277} size={35} /><T x={920} y={305} size={26} weight={500}>Tarefa agendada</T>
      <T x={1752} y={304} size={15} spacing={1} anchor="end" color={C.gray}>DEMONSTRAÇÃO</T>
    </g>
    <g opacity={chatHeader}>
      <rect x={824} y={252} width={984} height={84} fill={C.pale} />
      <AtlasMark x={858} y={264} size={56} />
      <T x={937} y={293} size={29} weight={600}>Atlas · Hermes</T>
      <T x={937} y={321} size={19}>{manual > 0.8 ? 'Conversa manual · demonstração' : 'Entrega automática · demonstração'}</T>
      <Icon kind="send" x={1732} y={273} size={35} />
    </g>
    <Line d="M824 336H1808" color={C.gray} width={1} />
    <g opacity={visible(t, 24.42, 28.95)}>
      <Label x={880} y={374} size={18}>ROTINA DIÁRIA</Label>
      <rect x={880} y={708} width={872} height={84} rx={14} fill={C.paper} stroke={C.gray} strokeWidth={1.5} />
      <T x={912} y={758} size={26} color={C.gray}>Mensagem</T><Icon kind="send" x={1696} y={732} size={33} color={C.gray} />
      <T x={880} y={839} size={20} color={C.gray}>Interface conceitual. Mensagem exemplificativa.</T>
    </g>
    <g opacity={visible(t, 29.00, 34.04)}>
      <Label x={880} y={371} size={17}>ENTREGA AUTOMÁTICA ANTERIOR</Label>
      <ManualMessages t={t} />
    </g>
  </g>;
};

const ManualMessages: React.FC<{t: number}> = ({t}) => {
  const send = progress(t, 30.12, 30.78);
  const reply = settle(t, 31.33);
  const outgoingY = mix(755, 482, send);
  const appear = progress(t, 29.28, 29.78);
  return <g>
    <rect x={880} y={756} width={872} height={82} rx={14} fill={C.paper} stroke={C.gray} strokeWidth={1.5} />
    <g opacity={1 - progress(t, 30.10, 30.32)}><T x={912} y={807} size={25} color={C.gray}>{typed('Pesquise um tema e prepare um documento.', t, 29.35, 30.02)}</T></g>
    <g opacity={appear * send}>
      <rect x={966} y={outgoingY} width={786} height={78} rx={14} fill={C.blue} />
      <T x={997} y={outgoingY + 49} size={28} color={C.paper}>Pesquise um tema e prepare um documento.</T>
    </g>
    <g opacity={send}><T x={912} y={807} size={25} color={C.gray}>Mensagem</T></g>
    <Icon kind="send" x={1696} y={779} size={34} color={C.blue} />
    <g opacity={Math.min(1, reply)} transform={`translate(0 ${mix(18, 0, reply)})`}>
      <rect x={880} y={600} width={822} height={86} rx={14} fill={C.pale} />
      <T x={912} y={654} size={28}>Pesquisa concluída. Documento pronto.</T>
    </g>
  </g>;
};

const NetworkNode: React.FC<{x: number; y: number; w: number; label: string; detail?: string; icon: 'play' | 'download' | 'clock'; t: number; start: number}> = ({x, y, w, label, detail, icon, t, start}) => {
  const p = progress(t, start, start + 0.5);
  const out = progress(t, 38.13 + (start - 34) * 0.18, 38.86 + (start - 34) * 0.18);
  return <g opacity={p * (1 - out)} transform={`translate(${out * (1428 - x) * 0.30} ${out * (550 - y) * 0.30 + (1 - p) * 10})`}>
    <rect x={x} y={y} width={w} height={100} rx={12} fill={C.paper} stroke={C.ink} strokeWidth={2} />
    <Icon kind={icon} x={x + 20} y={y + 30} size={35} /><T x={x + 70} y={y + 47} size={28} weight={500}>{label}</T>
    {detail && <T x={x + 70} y={y + 76} size={18} color={C.gray}>{detail}</T>}
  </g>;
};

const Network: React.FC<{t: number}> = ({t}) => {
  const a = visible(t, 33.86, 39.03, 0.65);
  return <g opacity={a}>
    <rect x={728} y={260} width={824} height={620} rx={24} fill={C.pale} stroke={C.gray} strokeWidth={2} />
    <Label x={768} y={309} color={C.ink}>MINHA REDE / DEBIAN 13</Label>
    <g opacity={progress(t, 34.06, 34.66) * (1 - progress(t, 38.45, 39.00))}>
      <rect x={800} y={366} width={300} height={110} rx={14} fill={C.paper} stroke={C.ink} strokeWidth={2} />
      <AtlasMark x={820} y={383} size={73} /><T x={920} y={416} size={33} weight={600}>Atlas</T><T x={920} y={449} size={22} color={C.gray}>Mac mini · 2014</T>
      <Line d="M1100 421H1134V404H1172M1134 421V548H1172M950 476V730H882" width={2.5} color={C.gray} p={progress(t, 34.12, 34.75)} />
    </g>
    <NetworkNode x={1172} y={354} w={332} label="Jellyfin" detail="Biblioteca de mídia" icon="play" t={t} start={34.21} />
    <g opacity={visible(t, 34.31, 38.58)}>
      <rect x={1172} y={498} width={332} height={100} rx={12} fill={C.paper} stroke={C.ink} strokeWidth={2} />
      <path d="M1200 523H1244V560H1200ZM1212 568H1232M1222 560V568" fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
      <T x={1260} y={544} size={26} weight={500}>TV em casa</T><T x={1260} y={574} size={18} color={C.gray}>reprodução local</T>
    </g>
    <NetworkNode x={816} y={680} w={476} label="Hermes Agent" detail="Assistente pessoal e automações" icon="clock" t={t} start={34.42} />
    <g opacity={visible(t, 34.50, 38.55)}>
      <Label x={1608} y={315} size={16}>ACESSO REMOTO</Label>
      <rect x={1608} y={354} width={200} height={100} rx={12} fill={C.paper} stroke={C.ink} strokeWidth={2} />
      <Icon kind="network" x={1624} y={372} size={34} color={C.blue} /><T x={1668} y={402} size={23} weight={500}>Tailscale</T><T x={1668} y={430} size={18} color={C.gray}>VPN</T>
      <Line d="M1608 404H1574V190H950V366" color={C.blue} width={2.5} p={progress(t, 35.2, 36.1)} />
      <Line d="M1708 454V534" color={C.blue} width={2.5} p={progress(t, 36.0, 36.5)} />
      <g opacity={progress(t, 36.0, 36.45)}>
        <rect x={1646} y={534} width={124} height={172} rx={14} fill={C.paper} stroke={C.ink} strokeWidth={2} />
        <rect x={1655} y={550} width={106} height={136} rx={5} fill={C.pale} />
        <Icon kind="play" x={1688} y={598} size={40} color={C.blue} />
        <T x={1708} y={674} size={16} anchor="middle" weight={500}>Jellyfin</T>
        <Line d="M1688 694H1728" color={C.ink} width={2} />
      </g>
      <T x={1180} y={220} size={18} color={C.gray}>Tailscale conecta o celular ao servidor</T>
    </g>
  </g>;
};

const Signal: React.FC<{t: number}> = ({t}) => {
  const p = signalAt(t);
  if (t >= 5.72 && t <= 6.52) p.x = 856 + (2 + typed('ssh atlas', t, 5.72, 6.52).length) * 20.4;
  // A restrained, deterministic blink only while the terminal is awaiting input.
  const blink = t > 7.7 && t < 10.15 ? (Math.floor((t - 7.7) / 0.65) % 2 ? 0.55 : 1) : 1;
  const previous = signalAt(Math.max(0, t - 1 / 60));
  const speed = Math.hypot(p.x - previous.x, p.y - previous.y);
  return <g opacity={progress(t, 1.95, 2.20) * blink}>
    {speed > 9 ? <path d={`M${mix(p.x, previous.x, 0.50)} ${mix(p.y, previous.y, 0.50)}L${p.x} ${p.y}`} fill="none" stroke={C.blue} strokeWidth={Math.min(p.w, p.h)} strokeLinecap="round" opacity={0.24} /> : null}
    <rect x={p.x - p.w / 2} y={p.y - p.h / 2} width={p.w} height={p.h} rx={Math.min(p.w, p.h) / 2} fill={C.blue} />
  </g>;
};

export const AtlasFilm: React.FC<AtlasProps> = ({stillTime, muted = false}) => {
  const frame = useCurrentFrame();
  const t = stillTime ?? frame / 60;
  const [fontHandle] = useState(() => delayRender('Carregando Space Grotesk e IBM Plex Mono'));
  useEffect(() => {loadFonts().then(() => continueRender(fontHandle)).catch(cancelRender);}, [fontHandle]);
  const panel = panelAt(t);
  const scene = t < 5 ? '01 / ORIGEM' : t < 11 ? '02 / ENTRAR NO ATLAS' : t < 18 ? '03 / BIBLIOTECA' : t < 29 ? '04 / AUTOMAÇÕES' : t < 34 ? '05 / OUTROS USOS' : t < 38 ? '06 / VISÃO DO SISTEMA' : t < 39.58 ? '07 / RETORNO' : 'ATLAS / CONSTRUÍDO PARA APRENDER';
  return <AbsoluteFill style={{backgroundColor: C.paper}}>
    {!muted && stillTime === undefined && <Html5Audio src={staticFile(`${base}/assets/atlas-original.wav`)} />}
    <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" style={{fontFamily: ATLAS.sans}}>
      <rect width={1920} height={1080} fill={C.paper} />
      <defs><clipPath id="active-panel"><rect x={panel.x} y={panel.y} width={panel.w} height={panel.h} rx={panel.r} /></clipPath></defs>
      <g opacity={progress(t, 0.05, 0.65)}>
        <AtlasMark x={112} y={60} size={47} /><T x={179} y={94} size={25} weight={700} spacing={-0.7}>ATLAS</T>
        <Label x={1228} y={94}>LABORATÓRIO PESSOAL DE INFRAESTRUTURA</Label>
        <Line d="M112 138H1808" color={C.gray} width={1} />
      </g>
      <rect x={panel.x} y={panel.y} width={panel.w} height={panel.h} rx={panel.r} fill={panel.fill} stroke={C.ink} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - progress(t, 0.38, 1.50)} />
      <Network t={t} />
      <MacDetail t={t} />
      <Terminal t={t} />
      <Library t={t} />
      <ChatFrame t={t} />
      <TaskMessage t={t} />
      <Status t={t} />
      <AutomationFlow t={t} />
      <Signal t={t} />
      <Titles t={t} />
      <g opacity={progress(t, 0.70, 1.1)}>
        <Label x={112} y={1018} size={18}>{scene}</Label>
        <T x={1808} y={1018} size={20} color={C.gray} anchor="end" opacity={1 - progress(t, 39, 39.5)}>Um sistema que eu construí.</T>
      </g>
    </svg>
  </AbsoluteFill>;
};
