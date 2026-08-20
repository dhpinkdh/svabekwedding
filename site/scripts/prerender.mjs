/**
 * GitHub Pages serves plain files — it has no idea your site has
 * several pages. Without this, visiting svabekwedding.com/rsvp directly
 * returns a "404 not found" status, which breaks link previews when you
 * text the site to someone and stops Google indexing those pages.
 *
 * So we give every page a real file at its own address.
 */
import { mkdirSync, copyFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

// Must match the routes in src/App.jsx
const routes = ['our-story', 'location', 'travel', 'rsvp', 'registry'];

for (const route of routes) {
  mkdirSync(resolve(dist, route), { recursive: true });
  copyFileSync(resolve(dist, 'index.html'), resolve(dist, route, 'index.html'));
}

// Anything unexpected still lands on the app, which shows the "page not found" screen
copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'));

console.log(`Prepared ${routes.length} pages + fallback`);
