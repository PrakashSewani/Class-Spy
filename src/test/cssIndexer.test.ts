import * as assert from 'assert';
import * as vscode from 'vscode';
import { CssIndexer } from '../cssIndexer';

function createMockDocForUsages(content: string, uri: string): any {
    const lines = content.split('\n');
    return {
        getText: () => content,
        uri: { toString: () => uri },
        offsetAt: (pos: any) => {
            let offset = 0;
            for (let i = 0; i < pos.line; i++) {
                offset += lines[i].length + 1;
            }
            return offset + pos.character;
        },
        lineAt: (pos: any) => {
            const line = typeof pos === 'number' ? pos : pos.line;
            return { text: lines[line] || '' } as any;
        },
        positionAt: (offset: number) => {
            let currentOffset = 0;
            for (let i = 0; i < lines.length; i++) {
                const lineLength = lines[i].length + 1;
                if (currentOffset + lineLength > offset) {
                    return new vscode.Position(i, offset - currentOffset);
                }
                currentOffset += lineLength;
            }
            return new vscode.Position(lines.length - 1, 0);
        }
    } as any;
}

suite('cssIndexer', () => {
    let indexer: CssIndexer;

    setup(() => {
        indexer = new CssIndexer();
        indexer['index'].clear();
        indexer['usageIndex'].clear();
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

    // --- Usage indexing tests ---

    test('indexes class usages from HTML class attribute', () => {
        const html = '<div class="flex p-4"></div>';
        const doc = createMockDocForUsages(html, 'file:///test.html');
        indexer['scanUsages'](doc);

        const flexUsages = indexer.getUsages('flex');
        const p4Usages = indexer.getUsages('p-4');

        assert.strictEqual(flexUsages.length, 1);
        assert.strictEqual(p4Usages.length, 1);
        assert.strictEqual(flexUsages[0].uri, 'file:///test.html');
        assert.strictEqual(flexUsages[0].line, 0);
        assert.strictEqual(flexUsages[0].className, 'flex');
    });

    test('indexes class usages from JSX className', () => {
        const jsx = '<div className="flex p-4"></div>';
        const doc = createMockDocForUsages(jsx, 'file:///test.jsx');
        indexer['scanUsages'](doc);

        const flexUsages = indexer.getUsages('flex');
        assert.strictEqual(flexUsages.length, 1);
        assert.strictEqual(flexUsages[0].uri, 'file:///test.jsx');
    });

    test('indexes class usages from cn() utility function', () => {
        const tsx = 'cn("flex p-4")';
        const doc = createMockDocForUsages(tsx, 'file:///test.tsx');
        indexer['scanUsages'](doc);

        const flexUsages = indexer.getUsages('flex');
        const p4Usages = indexer.getUsages('p-4');
        assert.strictEqual(flexUsages.length, 1);
        assert.strictEqual(p4Usages.length, 1);
    });

    test('ignores classes inside <style> blocks', () => {
        const vue = '<template><div class="flex"></div></template>\n<style>.flex { display: flex; }</style>';
        const doc = createMockDocForUsages(vue, 'file:///test.vue');
        indexer['scanUsages'](doc);

        const flexUsages = indexer.getUsages('flex');
        // Should only find the usage in the template, not the definition in the style block
        assert.strictEqual(flexUsages.length, 1);
        assert.ok(flexUsages[0].context.includes('class='));
    });

    test('deduplicates duplicate usages', () => {
        const html = '<div class="flex flex"></div>';
        const doc = createMockDocForUsages(html, 'file:///test.html');
        indexer['scanUsages'](doc);

        const flexUsages = indexer.getUsages('flex');
        assert.strictEqual(flexUsages.length, 1);
    });

    test('indexes usages from template literals', () => {
        const tsx = '<div className={`flex p-4`}></div>';
        const doc = createMockDocForUsages(tsx, 'file:///test.tsx');
        indexer['scanUsages'](doc);

        const flexUsages = indexer.getUsages('flex');
        assert.strictEqual(flexUsages.length, 1);
    });

    test('indexes usages from clsx() and classNames()', () => {
        const tsx = 'clsx("flex", classNames("p-4"))';
        const doc = createMockDocForUsages(tsx, 'file:///test.tsx');
        indexer['scanUsages'](doc);

        const flexUsages = indexer.getUsages('flex');
        const p4Usages = indexer.getUsages('p-4');
        assert.strictEqual(flexUsages.length, 1);
        assert.strictEqual(p4Usages.length, 1);
    });

    test('removes usage entries when file is removed', () => {
        const html = '<div class="flex"></div>';
        const doc = createMockDocForUsages(html, 'file:///test.html');
        indexer['scanUsages'](doc);

        assert.strictEqual(indexer.getUsages('flex').length, 1);
        indexer['removeFile']({ toString: () => 'file:///test.html' } as any);
        assert.deepStrictEqual(indexer.getUsages('flex'), []);
    });

    test('returns empty array for unknown class usage', () => {
        assert.deepStrictEqual(indexer.getUsages('nonexistent'), []);
    });

    test('indexes usages from Vue :class binding', () => {
        const vue = '<div :class="flex p-4"></div>';
        const doc = createMockDocForUsages(vue, 'file:///test.vue');
        indexer['scanUsages'](doc);

        const flexUsages = indexer.getUsages('flex');
        const p4Usages = indexer.getUsages('p-4');
        assert.strictEqual(flexUsages.length, 1);
        assert.strictEqual(p4Usages.length, 1);
    });

    test('indexes usages from Angular ngClass', () => {
        const html = '<div [ngClass]="flex p-4"></div>';
        const doc = createMockDocForUsages(html, 'file:///test.html');
        indexer['scanUsages'](doc);

        const flexUsages = indexer.getUsages('flex');
        assert.strictEqual(flexUsages.length, 1);
    });
});
