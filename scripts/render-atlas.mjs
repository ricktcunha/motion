import path from 'node:path';
import fs from 'node:fs';
import {bundle} from '@remotion/bundler';
import {openBrowser, renderMedia, renderStill, selectComposition} from '@remotion/renderer';
import {normalizeDuration} from './atlas-export.mjs';

const mode = process.argv[2] ?? 'stills';
const out = path.resolve('edicoes/001. atlas');
fs.mkdirSync(path.join(out, 'revisao/stills'), {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), outDir: path.resolve('.remotion/atlas-bundle'), publicDir: path.resolve('projetos'), enableCaching: false});
const browser = await openBrowser('chrome');
try {
  const props = {muted: mode === 'stills'};
  const composition = await selectComposition({serveUrl, id: 'Atlas', inputProps: props, puppeteerInstance: browser});
  if (mode === 'stills') {
    const seconds = process.argv.slice(3).length ? process.argv.slice(3).map(Number) : [2.8, 8.5, 15.7, 20.7, 26.5, 32.4, 36.5, 42.5];
    for (const second of seconds) {
      const frame = Math.min(2699, Math.round(second * 60));
      const output = path.join(out, 'revisao/stills', `atlas-${String(frame).padStart(4, '0')}.png`);
      await renderStill({serveUrl, composition, inputProps: props, frame, output, imageFormat: 'png', puppeteerInstance: browser});
      console.log(`Quadro ${frame} (${second}s) → ${output}`);
    }
  } else {
    const preview = mode === 'animatic' || mode === 'preview';
    const outputLocation = path.join(out, preview ? 'revisao/atlas-animatic.mp4' : 'atlas-final.mp4');
    let lastReport = -1;
    await renderMedia({serveUrl, composition, inputProps: props, codec: 'h264', outputLocation,
      puppeteerInstance: browser, scale: preview ? 0.5 : 1, crf: preview ? 26 : 17,
      imageFormat: 'jpeg', jpegQuality: 100, pixelFormat: 'yuv420p', concurrency: 4,
      audioBitrate: '320k',
      onProgress: ({renderedFrames, progress}) => {
        const bucket = Math.floor(progress * 20);
        if (bucket > lastReport) {lastReport = bucket; console.log(`${mode}: ${Math.round(progress * 100)}% · ${renderedFrames}/2700 quadros`);}
      },
    });
    normalizeDuration(outputLocation, composition.durationInFrames / composition.fps);
    console.log(`Concluído → ${outputLocation}`);
  }
} finally {await browser.close({silent: true});}
