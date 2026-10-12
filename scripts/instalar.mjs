// Instala as dependências do Studio e da transcrição local.
// Uso: npm run instalar   (ou: node scripts/instalar.mjs)
import {spawnSync} from 'node:child_process';

const python = process.platform === 'win32' ? 'python' : 'python3';
const passos = [
  ['Dependências do Remotion', 'npm install --no-audit --no-fund'],
  ['Transcrição local (faster-whisper)', `${python} -m pip install faster-whisper`],
];

const falhas = [];
for (const [nome, comando] of passos) {
  console.log(`\n==> ${nome}\n    ${comando}`);
  if (spawnSync(comando, {stdio: 'inherit', shell: true}).status !== 0) falhas.push(nome);
}

for (const programa of ['ffmpeg -version', 'ffprobe -version']) {
  if (spawnSync(programa, {stdio: 'ignore', shell: true}).status !== 0) falhas.push(`${programa.split(' ')[0]} (instale pelo guia)`);
}

console.log('\n' + '='.repeat(60));
if (falhas.length === 0) {
  console.log('Dependências instaladas. Abra esta pasta no Codex para começar.');
} else {
  console.log('Falhou ou está ausente:');
  for (const f of falhas) console.log(`  - ${f}`);
  console.log('Consulte guias/1-primeiros-passos.md para instruções.');
}
process.exit(falhas.length === 0 ? 0 : 1);
