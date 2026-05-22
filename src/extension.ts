import * as vscode from 'vscode';
import { CssIndexer } from './cssIndexer';
import { CssHoverProvider } from './hoverProvider';

export function activate(context: vscode.ExtensionContext) {
    const indexer = new CssIndexer();
    const hoverProvider = new CssHoverProvider(indexer);

    const selector: vscode.DocumentSelector = [
        { scheme: 'file', language: 'html' },
        { scheme: 'file', language: 'javascript' },
        { scheme: 'file', language: 'typescript' },
        { scheme: 'file', language: 'javascriptreact' },
        { scheme: 'file', language: 'typescriptreact' },
        { scheme: 'file', language: 'vue' },
        { scheme: 'file', language: 'svelte' },
        { scheme: 'file', language: 'astro' },
        { scheme: 'untitled', language: 'html' },
        { scheme: 'untitled', language: 'javascript' },
        { scheme: 'untitled', language: 'typescript' },
        { scheme: 'untitled', language: 'javascriptreact' },
        { scheme: 'untitled', language: 'typescriptreact' },
        { scheme: 'untitled', language: 'vue' },
        { scheme: 'untitled', language: 'svelte' },
        { scheme: 'untitled', language: 'astro' },
    ];

    context.subscriptions.push(
        vscode.languages.registerHoverProvider(selector, hoverProvider)
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('classSpy.openFile', (uri: string, line: number) => {
            const docUri = vscode.Uri.parse(uri);
            vscode.window.showTextDocument(docUri, {
                selection: new vscode.Range(new vscode.Position(line, 0), new vscode.Position(line, 0)),
                viewColumn: vscode.ViewColumn.Beside,
                preview: false
            }).then(editor => {
                const pos = new vscode.Position(line, 0);
                editor.revealRange(
                    new vscode.Range(pos, pos),
                    vscode.TextEditorRevealType.InCenterIfOutsideViewport
                );
            });
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('classSpy.editStyle', async (
            uri: string,
            startLine: number,
            startChar: number,
            endLine: number,
            endChar: number
        ) => {
            const docUri = vscode.Uri.parse(uri);

            const editor = await vscode.window.showTextDocument(docUri, {
                viewColumn: vscode.ViewColumn.Beside,
                preview: false
            });

            const targetRange = new vscode.Range(
                new vscode.Position(startLine, startChar),
                new vscode.Position(endLine, endChar)
            );

            // Select the exact rule text for immediate editing
            editor.selection = new vscode.Selection(targetRange.start, targetRange.end);

            // Reveal and center the selected rule
            editor.revealRange(
                targetRange,
                vscode.TextEditorRevealType.InCenterIfOutsideViewport
            );
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('classSpy.refreshIndex', () => {
            indexer.refresh();
        })
    );

    indexer.activate(context);
}

export function deactivate() {}
