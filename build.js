import { build } from 'esbuild';
import { promises as fs } from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function buildPackage() {
  // Ensure dist directory exists
  await fs.mkdir('dist', { recursive: true });

  // Build ESM version
  await build({
    entryPoints: ['src/index.js'],
    bundle: true,
    format: 'esm',
    outfile: 'dist/index.mjs',
    external: ['through2', 'plugin-error'],
    platform: 'node',
    target: 'node14'
  });

  // Build CommonJS version
  await build({
    entryPoints: ['src/index.js'],
    bundle: true,
    format: 'cjs',
    outfile: 'dist/index.cjs',
    external: ['through2', 'plugin-error'],
    platform: 'node',
    target: 'node14'
  });

  console.log('Build completed successfully!');
}

buildPackage().catch(console.error);
