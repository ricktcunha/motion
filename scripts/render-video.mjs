import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {bundle} from '@remotion/bundler';
import {openBrowser, renderMedia, renderStill, selectComposition} from '@remotion/renderer';
import {normalizeDuration} from './normalize-video.mjs';

const usage = 'Uso: npm run video -- <slug> <stills|preview|final> [segundos ...]';

export const renderVideo = async (slug, mode, requestedSeconds = []) => {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug ?? '')) throw new Error(usage);
  if (!['stills', 'preview', 'final'].includes(mode)) throw new Error(usage);

  const manifestPath = path.resolve('src/videos', slug, 'project.json');
  if (!fs.existsSync(manifestPath)) throw new Error(`Projeto "${slug}" não encontrado em src/videos/.`);
  const project = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const {composition, render} = project;
  const editionDir = path.resolve('edicoes', project.editionFolder);
  const reviewDir = path.join(editionDir, 'revisao');
  const stillsDir = path.join(reviewDir, 'stills');
  fs.mkdirSync(stillsDir, {recursive: true});

  const serveUrl = await bundle({
    entryPoint: path.resolve('src/index.ts'),
    outDir: path.resolve('.remotion', `${slug}-bundle`),
    publicDir: path.resolve('projetos'),
    enableCaching: false,
  });
  const browser = await openBrowser('chrome');
  try {
    const inputProps = mode === 'stills'
      ? {...composition.defaultProps, ...render.stillsInputProps}
      : composition.defaultProps ?? {};
    const selected = await selectComposition({
      serveUrl,
      id: composition.id,
      inputProps,
      puppeteerInstance: browser,
    });

    if (mode === 'stills') {
      const seconds = requestedSeconds.length
        ? requestedSeconds.map(Number)
        : render.stillSeconds;
      if (!seconds.length || seconds.some(value => !Number.isFinite(value) || value < 0)) {
        throw new Error('Informe tempos em segundos válidos para gerar quadros.');
      }
      for (const second of seconds) {
        const frame = Math.min(selected.durationInFrames - 1, Math.round(second * selected.fps));
        const output = path.join(stillsDir, `${render.stillsPrefix}-${String(frame).padStart(4, '0')}.png`);
        await renderStill({serveUrl, composition: selected, inputProps, frame, output, imageFormat: 'png', puppeteerInstance: browser});
        console.log(`Quadro ${frame} (${second}s) → ${output}`);
      }
      return;
    }

    const preview = mode === 'preview';
    const output = path.join(preview ? reviewDir : editionDir, preview ? render.previewFile : render.finalFile);
    let lastReport = -1;
    await renderMedia({
      serveUrl,
      composition: selected,
      inputProps,
      codec: 'h264',
      outputLocation: output,
      puppeteerInstance: browser,
      scale: preview ? (render.previewScale ?? 0.5) : 1,
      crf: preview ? (render.previewCrf ?? 26) : (render.finalCrf ?? 17),
      imageFormat: 'jpeg',
      jpegQuality: 100,
      pixelFormat: 'yuv420p',
      concurrency: render.concurrency ?? 4,
      ...(render.audioBitrate ? {audioBitrate: render.audioBitrate} : {}),
      onProgress: ({renderedFrames, progress}) => {
        const bucket = Math.floor(progress * 20);
        if (bucket > lastReport) {
          lastReport = bucket;
          console.log(`${mode}: ${Math.round(progress * 100)}% · ${renderedFrames}/${selected.durationInFrames} quadros`);
        }
      },
    });
    if (render.normalizeDurationSeconds) normalizeDuration(output, render.normalizeDurationSeconds);
    console.log(`Concluído → ${output}`);
  } finally {
    await browser.close({silent: true});
  }
};

if (path.resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  await renderVideo(process.argv[2], process.argv[3], process.argv.slice(4));
}
