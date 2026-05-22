import * as assert from 'assert';
import * as vscode from 'vscode';
import { CssHoverProvider } from '../hoverProvider';
import { CssIndexer } from '../cssIndexer';

function createMockDocument(content: string, languageId = 'html'): vscode.TextDocument {
    return {
        getText: () => content,
        languageId,
        uri: { toString: () => 'file:///test.html' } as any,
        offsetAt: (pos: vscode.Position) => {
            const lines = content.split('\n');
            let offset = 0;
            for (let i = 0; i < pos.line; i++) {
                offset += lines[i].length + 1;
            }
            return offset + pos.character;
        },
        lineAt: (pos: vscode.Position | number) => {
            const line = typeof pos === 'number' ? pos : pos.line;
            const text = content.split('\n')[line] || '';
            return { text } as any;
        },
        positionAt: (offset: number) => {
            const lines = content.split('\n');
            let currentOffset = 0;
            for (let i = 0; i < lines.length; i++) {
                const lineLength = lines[i].length + 1;
                if (currentOffset + lineLength > offset) {
                    return new vscode.Position(i, offset - currentOffset);
                }
                currentOffset += lineLength;
            }
            return new vscode.Position(lines.length - 1, 0);
        },
    } as vscode.TextDocument;
}

suite('hoverProvider', () => {
    let indexer: CssIndexer;
    let provider: CssHoverProvider;

    setup(() => {
        indexer = new CssIndexer();
        provider = new CssHoverProvider(indexer);
    });

    test('extracts classes from class attribute', async () => {
        const content = '<div class="flex p-4"></div>';
        const doc = createMockDocument(content, 'html');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 15), // cursor inside "flex p-4"
            new vscode.CancellationTokenSource().token
        );

        assert.ok(hover, 'Should return a hover');
        const contents = Array.isArray(hover!.contents) ? hover!.contents[0] : hover!.contents;
        assert.ok(contents instanceof vscode.MarkdownString);
        const markdown = contents as vscode.MarkdownString;
        assert.ok(markdown.value.includes('Class Spy') || markdown.value.includes('flex'));
    });

    test('extracts classes from className attribute', async () => {
        const content = '<div className="flex p-4"></div>';
        const doc = createMockDocument(content, 'html');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 22),
            new vscode.CancellationTokenSource().token
        );

        assert.ok(hover);
    });

    test('returns undefined when not inside a class attribute', async () => {
        const content = '<div id="myId"></div>';
        const doc = createMockDocument(content, 'html');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 10),
            new vscode.CancellationTokenSource().token
        );

        assert.strictEqual(hover, undefined);
    });

    test('returns undefined for empty class string', async () => {
        const content = '<div class=""></div>';
        const doc = createMockDocument(content, 'html');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 13),
            new vscode.CancellationTokenSource().token
        );

        assert.strictEqual(hover, undefined);
    });

    test('handles single quotes', async () => {
        const content = "<div class='flex p-4'></div>";
        const doc = createMockDocument(content, 'html');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 15),
            new vscode.CancellationTokenSource().token
        );

        assert.ok(hover);
    });

    test('handles backtick quotes in cn()', async () => {
        const content = 'cn(`flex p-4`)';
        const doc = createMockDocument(content, 'typescript');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 8),
            new vscode.CancellationTokenSource().token
        );

        assert.ok(hover);
    });

    test('extracts from cn() utility function', async () => {
        const content = 'cn("flex p-4")';
        const doc = createMockDocument(content, 'typescript');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 8),
            new vscode.CancellationTokenSource().token
        );

        assert.ok(hover);
    });

    test('extracts from clsx() utility function', async () => {
        const content = 'clsx("flex p-4")';
        const doc = createMockDocument(content, 'typescript');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 10),
            new vscode.CancellationTokenSource().token
        );

        assert.ok(hover);
    });

    test('extracts from classNames() utility function', async () => {
        const content = 'classNames("flex p-4")';
        const doc = createMockDocument(content, 'typescript');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 15),
            new vscode.CancellationTokenSource().token
        );

        assert.ok(hover);
    });

    test('combines multiple class definitions', async () => {
        const css = '.flex { display: flex; }\n.p-4 { padding: 16px; }';
        indexer['processCssText'](css, 'file:///test.css', '.css', 0);

        const content = '<div class="flex p-4"></div>';
        const doc = createMockDocument(content, 'html');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 15),
            new vscode.CancellationTokenSource().token
        );

        assert.ok(hover);
        const contents2 = Array.isArray(hover!.contents) ? hover!.contents[0] : hover!.contents;
        const markdown = contents2 as vscode.MarkdownString;
        assert.ok(markdown.value.includes('flex') || markdown.value.includes('padding'));
    });

    test('combines tailwind styles', async () => {
        const content = '<div class="flex p-4"></div>';
        const doc = createMockDocument(content, 'html');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 15),
            new vscode.CancellationTokenSource().token
        );

        assert.ok(hover);
        const contents3 = Array.isArray(hover!.contents) ? hover!.contents[0] : hover!.contents;
        const markdown = contents3 as vscode.MarkdownString;
        assert.ok(
            markdown.value.includes('display: flex;') ||
            markdown.value.includes('padding: 16px;') ||
            markdown.value.includes('Tailwind')
        );
    });

    test('handles cursor at the edge of class string', async () => {
        const content = '<div class="flex"></div>';
        const doc = createMockDocument(content, 'html');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 12), // right after opening quote
            new vscode.CancellationTokenSource().token
        );

        assert.ok(hover);
    });

    test('returns undefined outside any string', async () => {
        const content = '<div class="flex"></div>';
        const doc = createMockDocument(content, 'html');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 2), // inside <div tag
            new vscode.CancellationTokenSource().token
        );

        assert.strictEqual(hover, undefined);
    });

    test('extracts static classes from JSX template literal with interpolation', async () => {
        const content = '<div className={`${base}-btn flex p-4`}></div>';
        const doc = createMockDocument(content, 'typescript');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 35), // cursor inside the template literal
            new vscode.CancellationTokenSource().token
        );

        assert.ok(hover);
        const contents = Array.isArray(hover!.contents) ? hover!.contents[0] : hover!.contents;
        const markdown = contents as vscode.MarkdownString;
        // Should mention the static classes that were found
        assert.ok(markdown.value.includes('flex') || markdown.value.includes('padding'));
    });

    test('extracts quoted string literals from inside interpolation', async () => {
        const content = 'cn(`${isActive ? \'bg-red-500\' : \'bg-blue-500\'} flex`)';
        const doc = createMockDocument(content, 'typescript');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 35),
            new vscode.CancellationTokenSource().token
        );

        assert.ok(hover);
        const contents = Array.isArray(hover!.contents) ? hover!.contents[0] : hover!.contents;
        const markdown = contents as vscode.MarkdownString;
        assert.ok(markdown.value.includes('bg-red-500') || markdown.value.includes('bg-blue-500') || markdown.value.includes('Tailwind'));
    });

    test('returns undefined for purely dynamic template literal', async () => {
        const content = '<div className={`${dynamic}`}></div>';
        const doc = createMockDocument(content, 'typescript');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 20),
            new vscode.CancellationTokenSource().token
        );

        assert.strictEqual(hover, undefined);
    });

    test('handles nested braces inside template literal interpolation', async () => {
        const content = '<div className={`${condition ? (isDark ? \'dark\' : \'light\') : \'\'} flex`}></div>';
        const doc = createMockDocument(content, 'typescript');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 50),
            new vscode.CancellationTokenSource().token
        );

        assert.ok(hover);
        const contents = Array.isArray(hover!.contents) ? hover!.contents[0] : hover!.contents;
        const markdown = contents as vscode.MarkdownString;
        assert.ok(markdown.value.includes('flex'));
    });

    test('handles backtick string without interpolation like regular quotes', async () => {
        const content = '<div className={`flex p-4`}></div>';
        const doc = createMockDocument(content, 'typescript');
        const hover = await provider.provideHover(
            doc,
            new vscode.Position(0, 20),
            new vscode.CancellationTokenSource().token
        );

        assert.ok(hover);
        const contents = Array.isArray(hover!.contents) ? hover!.contents[0] : hover!.contents;
        const markdown = contents as vscode.MarkdownString;
        assert.ok(markdown.value.includes('flex') || markdown.value.includes('padding'));
    });
});

