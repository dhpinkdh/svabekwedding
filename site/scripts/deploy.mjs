/**
 * Publishes the built site to the gh-pages branch.
 *
 * You don't normally run this directly — use:  npm --prefix site run deploy
 */
import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dist = resolve(here, '..', 'dist');
const root = resolve(here, '..', '..');

const run = (cmd, cwd) =>
  execSync(cmd, { cwd, stdio: 'inherit', encoding: 'utf8' });

const capture = (cmd, cwd) =>
  execSync(cmd, { cwd, encoding: 'utf8' }).trim();

if (!existsSync(dist)) {
  console.error('\nNothing built yet. Run:  npm --prefix site run build\n');
  process.exit(1);
}

let remote;
try {
  remote = capture('git remote get-url origin', root);
} catch {
  console.error('\nNo GitHub repository connected yet.\n');
  process.exit(1);
}

console.log(`\nPublishing to ${remote} (gh-pages branch)…\n`);

// dist is its own throwaway repo — simplest way to force-push just the built files
rmSync(resolve(dist, '.git'), { recursive: true, force: true });
run('git init -q', dist);
run('git checkout -q -B gh-pages', dist);
run('git add -A', dist);
run('git -c user.name="deploy" -c user.email="deploy@local" commit -q -m "Deploy site"', dist);
run(`git push -q -f ${remote} gh-pages`, dist);
rmSync(resolve(dist, '.git'), { recursive: true, force: true });

console.log('\n✓ Published. GitHub takes a minute or two to refresh.\n');
