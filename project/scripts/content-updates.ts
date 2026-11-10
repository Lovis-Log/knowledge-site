import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { getAllBooks } from '../content/index';
import { contentJson } from './content-json';
const snapshot = Object.fromEntries(getAllBooks().flatMap(b => b.chapters.map(c => [`${b.slug}/${c.slug}`, { title: c.versions.zh?.title ?? c.versions.en?.title ?? c.slug, hash: createHash('sha256').update(contentJson({ versions: c.versions, translation: c.translation, sources: c.sources })).digest('hex') }])));
const file = 'content/update-snapshot.json';
let previous: typeof snapshot = {};
try {
    previous = JSON.parse(await readFile(file, 'utf8'));
}
catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT')
        throw error;
}
const changes = Object.entries(snapshot).filter(([key, value]) => !previous[key] || previous[key].hash !== value.hash).map(([key, value]) => ({ title: value.title, href: `/books/${key}/`, kind: previous[key] ? '修订 / Revised' : '新增 / Added' }));
for (const [key, value] of Object.entries(previous))
    if (!snapshot[key])
        changes.push({ title: value.title, href: '', kind: '移除 / Removed' });
await mkdir('.backend-build', { recursive: true });
await writeFile('.backend-build/update-candidate.json', JSON.stringify({ date: new Date().toISOString().slice(0, 10), features: [], content: Object.keys(previous).length ? changes : [] }, null, 2));
await writeFile('.backend-build/update-snapshot.json', JSON.stringify(snapshot, null, 2));
if (process.argv.includes('--baseline')) {
    if (Object.keys(previous).length)
        throw new Error('Baseline already exists');
    await writeFile(file, JSON.stringify(snapshot, null, 2));
}
if (process.argv.includes('--accept'))
    await writeFile(file, JSON.stringify(snapshot, null, 2));
console.log('Review .backend-build/update-candidate.json, merge approved items into content/updates.json, then use --accept and commit the snapshot together.');
