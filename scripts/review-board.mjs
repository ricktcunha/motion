import fs from 'node:fs';
import path from 'node:path';
import {openBrowser} from '@remotion/renderer';

// Contact sheet from existing review PNGs. Uses the same local browser as Remotion.
const [slug, mode = 'composicoes', ...requestedFrames] = process.argv.slice(2);
if (!/^[a-z0-9][a-z0-9-]*$/.test(slug ?? '') || !['composicoes', 'transicoes'].includes(mode)) {
  throw new Error('Uso: node scripts/review-board.mjs <slug> [composicoes|transicoes] [quadros ...]');
}
const config = JSON.parse(fs.readFileSync(path.resolve('src/videos', slug, 'project.json'), 'utf8'));
const frames = requestedFrames.length ? requestedFrames.map(Number) : config.render.stillSeconds.map(second => Math.round(second * config.composition.fps));
if (!frames.length || frames.some(frame => !Number.isInteger(frame) || frame < 0)) throw new Error('Quadros inválidos.');
const folder = path.resolve('edicoes', config.editionFolder, 'revisao');
const images = frames.map(frame => 'data:image/png;base64,' + fs.readFileSync(path.join(folder, 'stills', `${config.render.stillsPrefix}-${String(frame).padStart(4, '0')}.png`)).toString('base64'));
const columns = mode === 'transicoes' ? 3 : 2, width = mode === 'transicoes' ? 480 : 640, height = width * 9 / 16;
const browser = await openBrowser('chrome');
try {
  const page = await browser.newPage({context: () => null, logLevel: 'error', indent: false, pageIndex: 0, onBrowserLog: null, onLog: () => {}});
  await page.goto({url: 'about:blank', timeout: 30000});
  const dataUrl = await page.evaluate(async (sources, cols, tileWidth, tileHeight) => {
    const canvas = document.createElement('canvas');
    canvas.width = cols * tileWidth;
    canvas.height = Math.ceil(sources.length / cols) * tileHeight;
    const context = canvas.getContext('2d');
    context.fillStyle = '#F5F3ED';
    context.fillRect(0, 0, canvas.width, canvas.height);
    const decoded = await Promise.all(sources.map(src => new Promise((resolve, reject) => {
      const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = src;
    })));
    decoded.forEach((image, index) => context.drawImage(image, (index % cols) * tileWidth, Math.floor(index / cols) * tileHeight, tileWidth, tileHeight));
    return canvas.toDataURL('image/png');
  }, images, columns, width, height);
  const output = path.join(folder, `${slug}-${mode}.png`);
  fs.writeFileSync(output, Buffer.from(dataUrl.split(',')[1], 'base64'));
  console.log(`Painel de revisão → ${output}`);
} finally {
  await browser.close({silent: true});
}
