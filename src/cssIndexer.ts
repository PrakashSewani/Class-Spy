import * as vscode from 'vscode';
import * as postcss from 'postcss';
import * as postcssScss from 'postcss-scss';
import * as postcssLess from 'postcss-less';
import * as postcssSass from 'postcss-sass';

export interface CssDefinition {
    uri: string;
    line: number; // 0-based start line (for display)
    startLine: number;
    startChar: number;
    endLine: number;
    endChar: number;
    selector: string;
    text: string;
}

export class CssIndexer {
    private index = new Map<string, CssDefinition[]>();
    private watchers: vscode.FileSystemWatcher[] = [];

    activate(context: vscode.ExtensionContext) {
        this.refresh();

        const cssWatcher = vscode.workspace.createFileSystemWatcher('**/*.{css,scss,sass,less}');
        cssWatcher.onDidCreate(uri => this.parseFile(uri));
        cssWatcher.onDidChange(uri => this.parseFile(uri));
        cssWatcher.onDidDelete(uri => this.removeFile(uri));
        context.subscriptions.push(cssWatcher);
        this.watchers.push(cssWatcher);

        const tplWatcher = vscode.workspace.createFileSystemWatcher('**/*.{html,htm,vue,svelte,astro,jsx,tsx}');
        tplWatcher.onDidCreate(uri => this.parseFile(uri));
        tplWatcher.onDidChange(uri => this.parseFile(uri));
        tplWatcher.onDidDelete(uri => this.removeFile(uri));
        context.subscriptions.push(tplWatcher);
        this.watchers.push(tplWatcher);
    }

    async refresh() {
        this.index.clear();
        const cssFiles = await vscode.workspace.findFiles('**/*.{css,scss,sass,less}', '**/node_modules/**');
        const tplFiles = await vscode.workspace.findFiles('**/*.{html,htm,vue,svelte,astro,jsx,tsx}', '**/node_modules/**');

        const allFiles = [...cssFiles, ...tplFiles];
        for (const uri of allFiles) {
            await this.parseFile(uri);
        }
    }

    getDefinitions(className: string): CssDefinition[] {
        return this.index.get(className) || [];
    }

    private async parseFile(uri: vscode.Uri) {
        try {
            const doc = await vscode.workspace.openTextDocument(uri);
            const text = doc.getText();
            const ext = uri.path.substring(uri.path.lastIndexOf('.')).toLowerCase();
            const isTemplate = ['.html', '.htm', '.vue', '.svelte', '.astro', '.jsx', '.tsx'].includes(ext);

            this.removeFile(uri);

            if (!isTemplate) {
                this.processCssText(text, uri.toString(), ext, 0);
            } else {
                const styleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
                let match: RegExpExecArray | null;
                while ((match = styleRegex.exec(text)) !== null) {
                    const styleContent = match[1];
                    const styleTag = match[0];
                    const langMatch = styleTag.match(/lang\s*=\s*["']([^"']+)["']/i);
                    const lang = langMatch ? langMatch[1] : 'css';

                    const styleStartOffset = match.index + match[0].indexOf('>') + 1;
                    const styleStartPos = doc.positionAt(styleStartOffset);
                    const baseLine = styleStartPos.line;

                    const langExt = lang.startsWith('.') ? lang : '.' + lang;
                    this.processCssText(styleContent, uri.toString(), langExt, baseLine);
                }
            }
        } catch (e) {
            // Ignore parse errors for individual files
        }
    }

    private removeFile(uri: vscode.Uri) {
        const key = uri.toString();
        for (const [className, defs] of this.index.entries()) {
            const filtered = defs.filter(d => d.uri !== key);
            if (filtered.length === 0) {
                this.index.delete(className);
            } else {
                this.index.set(className, filtered);
            }
        }
    }

    private processCssText(text: string, uri: string, ext: string, baseLine: number) {
        let root: postcss.Root | postcss.Document | undefined;
        try {
            switch (ext) {
                case '.scss': root = postcssScss.parse(text); break;
                case '.sass': root = postcssSass.parse(text); break;
                case '.less': root = postcssLess.parse(text); break;
                default: root = postcss.parse(text); break;
            }
        } catch (e) {
            // Silently ignore unparseable blocks/files
            return;
        }

        if (!root) return;

        root.walkRules(rule => {
            const selectors = rule.selector.split(',').map(s => s.trim());
            const classNames = new Set<string>();
            for (const sel of selectors) {
                const matches = sel.match(/\.([a-zA-Z0-9_-]+)/g);
                if (matches) {
                    matches.forEach(m => classNames.add(m.substring(1)));
                }
            }

            if (classNames.size === 0) return;

            const start = rule.source?.start;
            const end = rule.source?.end;
            const startLine = (start?.line ?? 1) - 1 + baseLine;
            const startChar = (start?.column ?? 1) - 1;
            const endLine = (end?.line ?? 1) - 1 + baseLine;
            const endChar = (end?.column ?? 1) - 1;
            const line = startLine;
            const ruleText = rule.toString();

            classNames.forEach(cls => {
                const defs = this.index.get(cls) || [];
                defs.push({
                    uri,
                    line,
                    startLine,
                    startChar,
                    endLine,
                    endChar,
                    selector: rule.selector,
                    text: ruleText
                });
                this.index.set(cls, defs);
            });
        });
    }
}
