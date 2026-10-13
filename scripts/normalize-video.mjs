import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {RenderInternals} from '@remotion/renderer';

export const runFfmpeg = args => {
  // Use the binaries bundled with the pinned Remotion version on each platform.
  const executable = RenderInternals.getExecutablePath({type: 'ffmpeg', indent: false, logLevel: 'error', binariesDirectory: null});
  const directory = path.dirname(executable);
  const result = spawnSync(executable, args, {
    cwd: directory, stdio: 'inherit',
    env: {...process.env, ...(process.platform === 'darwin' ? {DYLD_LIBRARY_PATH: directory} : {})},
  });
  if (result.status !== 0) throw new Error(`FFmpeg falhou: ${result.error?.message ?? result.status}`);
};

export const normalizeDuration = (file, seconds, audioBitrate = '320k') => {
  if (!Number.isFinite(seconds) || seconds <= 0) throw new Error('A duração precisa ser um número positivo.');
  if (!/^\d+k$/.test(audioBitrate)) throw new Error('O bitrate do áudio precisa usar o formato, por exemplo, 320k.');
  const input = path.resolve(file);
  const temporary = input.replace(/\.mp4$/i, '.duration-check.mp4');
  if (temporary === input) throw new Error('O arquivo de saída precisa ser um MP4.');
  // AAC padding can make the container a few milliseconds longer than its video.
  // Copy every video packet unchanged and give audio/container the exact end time.
  runFfmpeg(['-y', '-v', 'error', '-i', input, '-map', '0:v:0', '-map', '0:a:0',
    '-c:v', 'copy', '-c:a', 'aac', '-b:a', audioBitrate, '-af', `atrim=duration=${seconds},asetpts=PTS-STARTPTS`,
    '-t', String(seconds), '-movflags', '+faststart', temporary]);
  fs.renameSync(temporary, input);
};

if (path.resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  if (!process.argv[2] || !process.argv[3]) throw new Error('Uso: node scripts/normalize-video.mjs <arquivo.mp4> <duração-em-segundos> [bitrate-de-áudio]');
  normalizeDuration(process.argv[2], Number(process.argv[3]), process.argv[4]);
}
