import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const indexHtml = join(dist, 'index.html');

const routes = [
  'checkout',
  'checkout/host-kit',
  'checkout/guest-guide',
  'checkout/finance',
];

for (const route of routes) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(indexHtml, join(dir, 'index.html'));
}

// Some static hosts serve 404.html for missing paths
copyFileSync(indexHtml, join(dist, '404.html'));

console.log(`SPA fallback pages written for: ${routes.join(', ')}`);
