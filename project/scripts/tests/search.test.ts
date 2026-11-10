import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAllBooks } from '../../content/index';
import { searchEntries, type SearchEntry } from '../../lib/search';
import { tagLabel, zhLabels } from '../../lib/tag-labels';
import { canonicalTag } from '../../lib/tag-aliases';
test('all Latin chapter tags have Chinese labels', () => { for (const b of getAllBooks())
    for (const c of b.chapters)
        for (const t of c.tags ?? [])
            if (/^[a-z]/.test(t))
                assert.ok(zhLabels[t], t); });
test('metadata search AND tokens, aliases, category and merged languages', () => {
    const entries: SearchEntry[] = [{ book: 'math', bookTitle: '数学', chapter: '1', category: 'math', titles: ['向量', 'Vectors'], summaries: ['线性无关'], tags: ['null-space'] }, { book: 'ai', bookTitle: 'AI', chapter: '2', category: 'ai', titles: ['Agent'], summaries: ['数学 applications'], tags: ['workflows'] }];
    assert.equal(searchEntries(entries, '向量 线性').length, 1);
    assert.equal(searchEntries(entries, 'VECTORS').length, 1);
    assert.equal(searchEntries(entries, 'nullspace').length, 1);
    assert.equal(searchEntries(entries, '数学', 'ai').length, 1);
    assert.equal(searchEntries(entries, 'missing').length, 0);
    assert.equal(searchEntries(entries, '', '', 'workflow')[0].book, 'ai');
    assert.notEqual(canonicalTag('special-solutions'), canonicalTag('particular-solution'));
    assert.notEqual(tagLabel('special-solutions').zh, tagLabel('particular-solution').zh);
});
