// Original score and restrained interface sounds, synthesized for Atlas 2.0. Same original score, new transition cues.
// SPDX-License-Identifier: CC0-1.0. No samples or third-party recordings.
import fs from 'node:fs';
const rate = 48000, seconds = 45, length = rate * seconds;
const left = new Float64Array(length), right = new Float64Array(length);
let seed = 2014;
const random = () => {seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296 * 2 - 1;};
const frequency = midi => 440 * Math.pow(2, (midi - 69) / 12);
const add = (start, duration, wave, gain, pan = 0) => {
  const first = Math.round(start * rate), count = Math.floor(duration * rate);
  const l = Math.sqrt((1 - pan) / 2), r = Math.sqrt((1 + pan) / 2);
  for (let i = 0; i < count && first + i < length; i++) {
    const t = i / rate, value = wave(t, duration) * gain;
    if (first + i >= 0) {left[first + i] += value * l; right[first + i] += value * r;}
  }
};
const sine = (f, t) => Math.sin(2 * Math.PI * f * t);
const env = (t, d) => Math.min(1, t / 0.012) * Math.min(1, Math.max(0, (d - t) / 0.08));
const chords = [[45, 52, 57, 60, 64], [41, 48, 57, 60, 64], [48, 55, 60, 64, 67], [43, 50, 57, 59, 62]];
for (let block = 0; block < 10; block++) {
  const start = block * 4, notes = chords[block % 4];
  for (const [i, note] of notes.entries()) {
    const f = frequency(note);
    add(start, 4.8, (t, d) => (sine(f, t) + 0.18 * sine(f * 2, t)) * Math.min(1, t / 0.38) * Math.min(1, Math.max(0, (d - t) / 0.65)), 0.021, (i - 2) * 0.24);
  }
}
const motif = [76, 79, 83, 79, 74, 79, 81, 79];
for (let beat = 0; beat < 80; beat++) {
  const start = beat * 0.5;
  const root = chords[Math.floor(start / 4) % 4][0] - 12;
  add(start, 0.42, t => sine(frequency(root), t) * Math.exp(-t * 7) * Math.min(1, t / 0.012), 0.13);
  if (start >= 2 && start < 38 && beat % 2 === 0) {
    add(start, 0.24, t => Math.sin(2 * Math.PI * (42 * t + 9 * (1 - Math.exp(-25 * t)))) * Math.exp(-t * 22) * Math.min(1, t / 0.004), 0.16);
  }
  if (start >= 5 && start < 38) {
    add(start + 0.25, 0.05, t => random() * Math.exp(-t * 85) * Math.min(1, t / 0.001), 0.036, beat % 2 ? 0.2 : -0.2);
    if (beat % 4 === 2) add(start, 0.08, t => (random() * 0.45 + sine(1800, t) * 0.2) * Math.exp(-t * 45), 0.055);
  }
  if (beat % 2 === 0 && start >= 5 && start < 38) {
    const f = frequency(motif[Math.floor(beat / 2) % motif.length]);
    add(start + 0.25, 0.72, (t, d) => (sine(f, t) + 0.35 * sine(f * 2, t) + 0.1 * sine(f * 3, t)) * Math.exp(-t * 7) * env(t, d), 0.061, beat % 4 ? 0.28 : -0.28);
  }
}
// Tonal accents coincide with connection, selection, completion and messages.
for (const [time, midi] of [[1.75, 79], [5.65, 72], [7.2, 79], [11.35, 81], [13.95, 84], [15.4, 79], [18.8, 76], [20.9, 79], [22.1, 84], [24.3, 86], [30.45, 81], [31.4, 84], [32.15, 79], [35.2, 76], [36.05, 81], [39.1, 79]]) {
  const f = frequency(midi);
  add(time, 0.22, (t, d) => (sine(f, t) + 0.2 * sine(f * 2, t)) * Math.exp(-t * 18) * env(t, d), 0.10);
}
for (const [i, note] of [45, 52, 57, 60, 64].entries()) {
  add(40, 5, (t, d) => sine(frequency(note), t) * Math.min(1, t / 0.3) * Math.exp(-t * 0.3) * Math.min(1, (d - t) / 1.1), 0.047, (i - 2) * 0.20);
}
let peak = 0;
for (let i = 0; i < length; i++) peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
const gain = 0.70 / peak;
const data = Buffer.alloc(44 + length * 4);
data.write('RIFF', 0); data.writeUInt32LE(data.length - 8, 4); data.write('WAVEfmt ', 8); data.writeUInt32LE(16, 16);
data.writeUInt16LE(1, 20); data.writeUInt16LE(2, 22); data.writeUInt32LE(rate, 24); data.writeUInt32LE(rate * 4, 28);
data.writeUInt16LE(4, 32); data.writeUInt16LE(16, 34); data.write('data', 36); data.writeUInt32LE(length * 4, 40);
for (let i = 0; i < length; i++) {
  const fade = Math.min(1, i / (rate * 0.2)) * Math.min(1, (length - i) / (rate * 0.35));
  data.writeInt16LE(Math.round(Math.tanh(left[i] * gain) * fade * 32767), 44 + i * 4);
  data.writeInt16LE(Math.round(Math.tanh(right[i] * gain) * fade * 32767), 46 + i * 4);
}
fs.mkdirSync('projetos/002. atlas-v2/assets', {recursive: true});
fs.writeFileSync('projetos/002. atlas-v2/assets/atlas-v2-original.wav', data);
console.log('Trilha original criada: 45 s · 48 kHz · estéreo · CC0');
