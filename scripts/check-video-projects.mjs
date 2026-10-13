import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const videosDir = path.join(root, 'src/videos');
const registryPath = path.join(videosDir, 'registry.ts');
const registry = fs.readFileSync(registryPath, 'utf8');
const issues = [];
const slugs = new Set();
const folders = new Set();
const compositionIds = new Set();
const projects = fs.readdirSync(videosDir, {withFileTypes: true})
  .filter(entry => entry.isDirectory() && !entry.name.startsWith('_'))
  .map(entry => entry.name)
  .sort();

for (const directory of projects) {
  const manifestPath = path.join(videosDir, directory, 'project.json');
  const addIssue = message => issues.push(`${directory}: ${message}`);
  if (!fs.existsSync(manifestPath)) {
    addIssue('falta project.json');
    continue;
  }

  let project;
  try {
    project = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    addIssue(`project.json não é JSON válido (${error.message})`);
    continue;
  }

  if (project.slug !== directory || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug ?? '')) {
    addIssue(`slug deve ser igual ao nome da pasta de código (${directory})`);
  }
  if (slugs.has(project.slug)) addIssue(`slug duplicado: ${project.slug}`);
  slugs.add(project.slug);

  const folderMatch = /^(\d{3})\. ([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(project.projectFolder ?? '');
  if (!folderMatch || folderMatch[2] !== project.slug) {
    addIssue('projectFolder deve seguir "NNN. <slug>" e usar o mesmo slug');
  }
  if (folders.has(project.projectFolder)) addIssue(`projectFolder duplicado: ${project.projectFolder}`);
  folders.add(project.projectFolder);

  if (project.editionFolder !== undefined || project.folderLabel !== undefined) {
    addIssue('remova editionFolder e folderLabel; ambos são derivados de projectFolder e slug');
  }
  if (!fs.existsSync(path.join(videosDir, directory, 'index.tsx'))) addIssue('falta index.tsx');
  if (!registry.includes(`from './${directory}'`)) addIssue('projeto não está importado em registry.ts');

  const composition = project.composition;
  if (!composition || typeof composition.id !== 'string' || !composition.id) {
    addIssue('composition.id é obrigatório');
  } else {
    if (compositionIds.has(composition.id)) addIssue(`id de composição duplicado: ${composition.id}`);
    compositionIds.add(composition.id);
  }
  for (const key of ['width', 'height', 'durationInFrames']) {
    if (!Number.isInteger(composition?.[key]) || composition[key] <= 0) {
      addIssue(`composition.${key} deve ser um inteiro positivo`);
    }
  }
  if (!Number.isFinite(composition?.fps) || composition.fps <= 0) addIssue('composition.fps deve ser positivo (aceita taxas como 29.97)');
  if (!composition?.defaultProps || typeof composition.defaultProps !== 'object' || Array.isArray(composition.defaultProps)) {
    addIssue('composition.defaultProps deve ser um objeto');
  }
  if (project.styleFrame?.id) {
    if (compositionIds.has(project.styleFrame.id)) addIssue(`id de composição duplicado: ${project.styleFrame.id}`);
    compositionIds.add(project.styleFrame.id);
  }

  const render = project.render;
  if (!render || typeof render !== 'object') {
    addIssue('render é obrigatório');
    continue;
  }
  for (const key of ['previewFile', 'finalFile']) {
    if (typeof render[key] !== 'string' || path.basename(render[key]) !== render[key] || !render[key].endsWith('.mp4')) {
      addIssue(`render.${key} deve ser um nome de arquivo .mp4, sem diretório`);
    }
  }
  if (typeof render.stillsPrefix !== 'string' || !render.stillsPrefix.startsWith(project.slug)) {
    addIssue('render.stillsPrefix deve começar com o slug do projeto');
  }
  const durationSeconds = composition?.fps > 0 ? composition.durationInFrames / composition.fps : 0;
  if (!Array.isArray(render.stillSeconds) || render.stillSeconds.length === 0 || render.stillSeconds.some(time => !Number.isFinite(time) || time < 0 || time >= durationSeconds)) {
    addIssue('render.stillSeconds deve listar tempos entre 0 e a duração do vídeo');
  }
  for (const key of ['previewScale', 'previewCrf', 'finalCrf', 'audioBitrate', 'normalizeDurationSeconds', 'concurrency']) {
    if (render[key] !== undefined && (typeof render[key] !== 'number' && key !== 'audioBitrate')) {
      addIssue(`render.${key} tem tipo inválido`);
    }
  }
  if (render.previewScale !== undefined && (render.previewScale <= 0 || render.previewScale > 1)) addIssue('render.previewScale deve estar entre 0 e 1');
  for (const key of ['previewCrf', 'finalCrf']) {
    if (render[key] !== undefined && (render[key] < 0 || render[key] > 51)) addIssue(`render.${key} deve estar entre 0 e 51`);
  }
  if (render.concurrency !== undefined && (!Number.isInteger(render.concurrency) || render.concurrency < 1)) addIssue('render.concurrency deve ser um inteiro positivo');
  if (render.normalizeDurationSeconds !== undefined && (render.normalizeDurationSeconds <= 0 || render.normalizeDurationSeconds > durationSeconds)) {
    addIssue('render.normalizeDurationSeconds deve ser positivo e não superar a duração da composição');
  }
  if (render.audioBitrate !== undefined && (typeof render.audioBitrate !== 'string' || !/^\d+k$/.test(render.audioBitrate))) {
    addIssue('render.audioBitrate deve usar o formato, por exemplo, 320k');
  }

  if (project.audioGenerator !== undefined) {
    if (typeof project.audioGenerator !== 'string' || path.isAbsolute(project.audioGenerator)) {
      addIssue('audioGenerator deve apontar para um arquivo existente dentro da pasta do projeto');
    } else {
      const projectPath = path.join(videosDir, directory);
      const generator = path.resolve(projectPath, project.audioGenerator);
      const relative = path.relative(projectPath, generator);
      if (relative.startsWith('..') || path.isAbsolute(relative) || !fs.existsSync(generator) || !fs.statSync(generator).isFile()) {
        addIssue('audioGenerator deve apontar para um arquivo existente dentro da pasta do projeto');
      }
    }
  }
}

const registeredSlugs = [...registry.matchAll(/from ['"]\.\/([a-z0-9-]+)['"]/g)].map(match => match[1]);
for (const slug of registeredSlugs) {
  if (!slugs.has(slug)) issues.push(`registry.ts importa "${slug}", mas src/videos/${slug}/project.json não existe`);
}
if (new Set(registeredSlugs).size !== registeredSlugs.length) issues.push('registry.ts contém importação duplicada de projeto');

if (issues.length) {
  console.error(`Validação dos projetos de vídeo encontrou ${issues.length} problema(s):`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log(`${projects.length} projeto(s) de vídeo: manifestos, pastas e registry consistentes.`);
}
