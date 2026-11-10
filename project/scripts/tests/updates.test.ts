import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
test('announcement baseline, metadata-only edits, bilingual revision and removal', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'lovismind-updates-')), book = join(dir, 'vault', 'book');
    try {
        await mkdir(book, { recursive: true });
        await mkdir(join(dir, 'content'));
        await writeFile(join(dir, 'vault', 'taxonomy.json'), JSON.stringify({ sections: [{ slug: 'courses', name: 'Courses' }], categories: [{ slug: 'math', name: 'Math', section: 'courses' }] }));
        await writeFile(join(book, '_book.md'), '---\nslug: book\ntitle: Book\ncategory: math\n---\n');
        const chapter = (tag: string, date: string, body: string) => `---\nslug: 01-test\ntitle: Chapter\nsummary: Summary\nupdatedAt: ${date}\ntags: [${tag}]\n---\n${body}\n`;
        const source = join(book, '01 - test.zh.md');
        await writeFile(source, chapter('math', '2026-11-01', 'Body'));
        const run = (args: string[] = []) => execFileSync(process.execPath, [resolve('node_modules/tsx/dist/cli.mjs'), resolve('scripts/content-updates.ts'), ...args], { cwd: dir, env: { ...process.env, KNOWLEDGE_SITE_DIR: join(dir, 'vault'), TSX_TSCONFIG_PATH: resolve('tsconfig.json') }, stdio: 'pipe' });
        const changes = async () => JSON.parse(await readFile(join(dir, '.backend-build/update-candidate.json'), 'utf8')).content;
        run(['--baseline']);
        assert.equal((await changes()).length, 0);
        await writeFile(source, chapter('new-tag', '2026-11-10', 'Body'));
        run();
        assert.equal((await changes()).length, 0);
        await writeFile(join(book, '01 - test.en.md'), chapter('math', '2026-11-10', 'English body'));
        run();
        assert.equal((await changes()).length, 1);
        run(['--accept']);
        await rm(source);
        await rm(join(book, '01 - test.en.md'));
        run();
        assert.equal((await changes())[0].href, '');
    }
    finally {
        await rm(dir, { recursive: true, force: true });
    }
});
