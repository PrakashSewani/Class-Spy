import * as vscode from 'vscode';
import { CssIndexer, ClassUsage } from './cssIndexer';

/**
 * Hover provider for CSS/SCSS/SASS/LESS files.
 * When hovering over a class selector (e.g. `.my-class`), shows all
 * template/JSX files where that class is used.
 */
export class CssUsageHoverProvider implements vscode.HoverProvider {
    constructor(private indexer: CssIndexer) {}

    async provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        _token: vscode.CancellationToken
    ): Promise<vscode.Hover | undefined> {
        const wordRange = document.getWordRangeAtPosition(position, /\.([a-zA-Z0-9_-]+)/);
        if (!wordRange) {
            return undefined;
        }

        const word = document.getText(wordRange);
        const className = word.substring(1); // strip leading dot

        if (!className || className.length === 0) {
            return undefined;
        }

        const usages = await this.indexer.findUsages(className);
        if (usages.length === 0) {
            return undefined;
        }

        const contents = new vscode.MarkdownString();
        contents.isTrusted = true;

        contents.appendMarkdown(`## Class Usage — \`.${className}\`  \n`);
        contents.appendMarkdown(`Found in **${usages.length}** file${usages.length > 1 ? 's' : ''}  \n\n`);
        contents.appendMarkdown(`---  \n\n`);

        const currentUri = document.uri.toString();

        // Group by file, deduplicate lines
        const byFile = new Map<string, ClassUsage[]>();
        for (const usage of usages) {
            const list = byFile.get(usage.uri) || [];
            list.push(usage);
            byFile.set(usage.uri, list);
        }

        let count = 0;
        for (const [uriStr, fileUsages] of byFile) {
            const fileName = vscode.workspace.asRelativePath(vscode.Uri.parse(uriStr));
            const isCurrent = uriStr === currentUri;

            // Deduplicate lines within the same file
            const seenLines = new Set<number>();
            const uniqueUsages = fileUsages.filter(u => {
                if (seenLines.has(u.line)) return false;
                seenLines.add(u.line);
                return true;
            });

            for (const usage of uniqueUsages) {
                if (count > 0) {
                    contents.appendMarkdown(`\n`);
                }

                const openArgs = encodeURIComponent(JSON.stringify([uriStr, usage.line]));
                const openLink = `[Open](command:classSpy.openFile?${openArgs})`;
                const label = isCurrent ? 'current file' : fileName;
                const linePreview = usage.lineText.length > 80
                    ? usage.lineText.substring(0, 80) + '…'
                    : usage.lineText;

                contents.appendMarkdown(`**${label}:${usage.line + 1}** &nbsp; ${openLink}  \n`);
                contents.appendMarkdown(`\`${linePreview}\`  \n`);
                count++;
            }
        }

        return new vscode.Hover(contents);
    }
}
