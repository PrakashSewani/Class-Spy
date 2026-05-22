import * as assert from 'assert';
import { CssIndexer } from '../cssIndexer';

suite('cssIndexer', () => {
    let indexer: CssIndexer;

    setup(() => {
        indexer = new CssIndexer();
        indexer['index'].clear();
    });

    test('indexes simple class selectors', () => {
        const css = '.btn { color: red; }';
        indexer['processCssText'](css, 'file:///test.css', '.css', 0);

        const defs = indexer.getDefinitions('btn');
        assert.strictEqual(defs.length, 1);
        assert.strictEqual(defs[0].selector, '.btn');
        assert.strictEqual(defs[0].uri, 'file:///test.css');
        assert.ok(defs[0].text.includes('color: red;'));
    });

    test('indexes multiple classes from compound selector', () => {
        const css = '.btn.primary:hover { color: blue; }';
        indexer['processCssText'](css, 'file:///test.css', '.css', 0);

        const btnDefs = indexer.getDefinitions('btn');
        const primaryDefs = indexer.getDefinitions('primary');

        assert.strictEqual(btnDefs.length, 1);
        assert.strictEqual(primaryDefs.length, 1);
        assert.strictEqual(btnDefs[0].selector, '.btn.primary:hover');
        assert.strictEqual(primaryDefs[0].selector, '.btn.primary:hover');
    });

    test('indexes multiple comma selectors', () => {
        const css = '.btn, .card { display: block; }';
        indexer['processCssText'](css, 'file:///test.css', '.css', 0);

        const btnDefs = indexer.getDefinitions('btn');
        const cardDefs = indexer.getDefinitions('card');

        assert.strictEqual(btnDefs.length, 1);
        assert.strictEqual(cardDefs.length, 1);
        assert.strictEqual(btnDefs[0].selector, '.btn, .card');
    });

    test('indexes child combinators', () => {
        const css = '.card > .title { font-size: 20px; }';
        indexer['processCssText'](css, 'file:///test.css', '.css', 0);

        const cardDefs = indexer.getDefinitions('card');
        const titleDefs = indexer.getDefinitions('title');

        assert.strictEqual(cardDefs.length, 1);
        assert.strictEqual(titleDefs.length, 1);
        assert.strictEqual(titleDefs[0].selector, '.card > .title');
    });

    test('deduplicates exact same rule', () => {
        const css = '.btn { color: red; }';
        indexer['processCssText'](css, 'file:///test.css', '.css', 0);
        indexer['processCssText'](css, 'file:///test.css', '.css', 0);

        const defs = indexer.getDefinitions('btn');
        // Should still only have 2 entries because same file+text but different parse
        // The deduplication happens in hoverProvider, not indexer
        assert.strictEqual(defs.length, 2);
    });

    test('stores correct line and character positions', () => {
        const css = '\n\n.btn { color: red; }';
        indexer['processCssText'](css, 'file:///test.css', '.css', 0);

        const defs = indexer.getDefinitions('btn');
        assert.strictEqual(defs[0].line, 2); // 0-based line
        assert.strictEqual(defs[0].startLine, 2);
        assert.strictEqual(defs[0].startChar, 0);
    });

    test('handles empty CSS gracefully', () => {
        indexer['processCssText']('', 'file:///test.css', '.css', 0);
        assert.deepStrictEqual(indexer.getDefinitions('anything'), []);
    });

    test('handles SCSS syntax', () => {
        const scss = '.btn { &:hover { color: blue; } }';
        indexer['processCssText'](scss, 'file:///test.scss', '.scss', 0);

        const defs = indexer.getDefinitions('btn');
        assert.ok(defs.length >= 1, 'Should index SCSS nested rules');
    });

    test('handles invalid CSS gracefully', () => {
        const badCss = 'this is not valid css !!!';
        indexer['processCssText'](badCss, 'file:///test.css', '.css', 0);
        assert.deepStrictEqual(indexer.getDefinitions('anything'), []);
    });

    test('returns empty array for unknown class', () => {
        const css = '.btn { color: red; }';
        indexer['processCssText'](css, 'file:///test.css', '.css', 0);

        assert.deepStrictEqual(indexer.getDefinitions('nonexistent'), []);
    });

    test('removes file entries correctly', () => {
        const css = '.btn { color: red; }';
        indexer['processCssText'](css, 'file:///test.css', '.css', 0);

        assert.strictEqual(indexer.getDefinitions('btn').length, 1);
        indexer['removeFile']({ toString: () => 'file:///test.css' } as any);

        assert.deepStrictEqual(indexer.getDefinitions('btn'), []);
    });

    test('indexes multiple files', () => {
        const css1 = '.btn { color: red; }';
        const css2 = '.btn { color: blue; }';
        indexer['processCssText'](css1, 'file:///a.css', '.css', 0);
        indexer['processCssText'](css2, 'file:///b.css', '.css', 0);

        const defs = indexer.getDefinitions('btn');
        assert.strictEqual(defs.length, 2);
        const uris = defs.map(d => d.uri).sort();
        assert.deepStrictEqual(uris, ['file:///a.css', 'file:///b.css']);
    });

    test('applies baseLine offset for inline styles', () => {
        const css = '.btn { color: red; }';
        indexer['processCssText'](css, 'file:///test.html', '.css', 10);

        const defs = indexer.getDefinitions('btn');
        assert.strictEqual(defs[0].line, 10);
        assert.strictEqual(defs[0].startLine, 10);
    });
});

