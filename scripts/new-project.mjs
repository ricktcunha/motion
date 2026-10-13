import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [slug, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(' ').trim();
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug ?? '') || !title) {
  throw new Error('Uso: npm run project:new -- <slug> "<nome do projeto>"');
}

const projectsRoot = path.join(root, 'projetos');
const editionsRoot = path.join(root, 'edicoes');
const codeRoot = path.join(root, 'src/videos');
const numbers = new Set();
const collectNumber = value => {
  const match = /^(\d{3})\. [a-z0-9]+(?:-[a-z0-9]+)*$/.exec(value);
  if (match) numbers.add(Number(match[1]));
};

for (const directory of fs.readdirSync(projectsRoot, {withFileTypes: true})) {
  if (directory.isDirectory()) collectNumber(directory.name);
}
for (const directory of fs.readdirSync(codeRoot, {withFileTypes: true})) {
  if (!directory.isDirectory() || directory.name.startsWith('_')) continue;
  const manifestPath = path.join(codeRoot, directory.name, 'project.json');
  if (fs.existsSync(manifestPath)) {
    try {
      collectNumber(JSON.parse(fs.readFileSync(manifestPath, 'utf8')).projectFolder);
    } catch {
      throw new Error(`Não consegui ler o manifesto existente: ${manifestPath}`);
    }
  }
}

const number = Math.max(0, ...numbers) + 1;
if (number > 999) throw new Error('A numeração de projetos chegou a 999.');
const projectFolder = `${String(number).padStart(3, '0')}. ${slug}`;
const projectPath = path.join(projectsRoot, projectFolder);
const editionPath = path.join(editionsRoot, projectFolder);
if (fs.existsSync(projectPath) || fs.existsSync(editionPath) || fs.existsSync(path.join(codeRoot, slug))) {
  throw new Error(`Já existe uma pasta ou composição para "${projectFolder}" / "${slug}".`);
}

const planTemplate = fs.readFileSync(path.join(projectsRoot, '000. exemplo/plano.md'), 'utf8');
const projectReadme = `# ${title}\n\nMateriais de trabalho de **${title}**.\n\n- Coloque o master original em video/ e referências em prints/. Preserve os arquivos originais.\n- O plano para aprovação está em plano.md.\n- Quadros, transcrição e assets preparados ficam em frames/, transcricao/ e assets/.\n- Código Remotion em src/videos/${slug}/; entregas em edicoes/${projectFolder}/.\n`;
const editionReadme = `# ${title} — entregas\n\nEste diretório guarda as saídas locais de **${title}**.\n\n- Prévia aprovada para revisão: revisao/.\n- Quadros de revisão: revisao/stills/.\n- Arquivo final: o nome definido em src/videos/${slug}/project.json.\n- Arquive cada nova rodada de revisão em revisao/r01/, r02/ etc.\n\nOs arquivos desta pasta são locais e ficam fora do Git.\n`;

const directories = [
  'video', 'prints', 'frames', 'transcricao', 'assets',
].map(name => path.join(projectPath, name)).concat([
  path.join(editionPath, 'revisao/stills'),
]);

fs.mkdirSync(projectPath, {recursive: true});
fs.mkdirSync(editionPath, {recursive: true});
for (const directory of directories) fs.mkdirSync(directory, {recursive: true});
fs.writeFileSync(path.join(projectPath, 'LEIA-ME.md'), projectReadme, {flag: 'wx'});
fs.writeFileSync(path.join(projectPath, 'plano.md'), planTemplate.replaceAll('<nome do vídeo>', title).replaceAll('<NNN. slug>', projectFolder), {flag: 'wx'});
fs.writeFileSync(path.join(editionPath, 'LEIA-ME.md'), editionReadme, {flag: 'wx'});

console.log(`Projeto preparado: ${projectFolder}`);
console.log(`Plano para aprovação: ${path.relative(root, path.join(projectPath, 'plano.md'))}`);
console.log('Depois da aprovação, crie a composição em src/videos/<slug>/ e registre-a em src/videos/registry.ts.');
