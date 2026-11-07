import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';

const contentRoot = path.join(process.cwd(), 'content');
const pagesRoot = path.join(contentRoot, 'pages');
const sharedRoot = path.join(contentRoot, 'shared');
const manifest = Object.freeze(
  JSON.parse(fs.readFileSync(path.join(contentRoot, 'manifest.json'), 'utf8')),
);

const readFile = cache((filename) => fs.readFileSync(filename, 'utf8'));

export function getManifest() {
  return manifest;
}

export function getPage(route) {
  return manifest[route] ?? null;
}

export function readSharedFragment(name) {
  return readFile(path.join(sharedRoot, `${name}.html`));
}

export function readContentSection(route, reference) {
  if (reference.startsWith('shared:')) {
    return readFile(path.join(sharedRoot, reference.slice('shared:'.length)));
  }

  return readFile(path.join(pagesRoot, route, reference));
}

export function readSharedStyles() {
  return readFile(path.join(sharedRoot, 'head.css'));
}
