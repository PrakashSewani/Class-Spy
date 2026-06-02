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

export interface ClassUsage {
    className: string;
    uri: string;
    line: number;
    startChar: number;
    endChar: number;
    context: string;
}

export class CssIndexer {
    private index = new Map<string, CssDefinition[]>();
    private usageIndex = new Map<string, ClassUsage[]>();
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
        this.usageIndex.clear();
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

    getUsages(className: string): ClassUsage[] {
        return this.usageIndex.get(className) || [];
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

                this.scanUsages(doc);
            }
        } catch (e) {
            // Ignore parse errors for individual files
        }
    }

    private removeFile(uri: vscode.Uri) {
        const key = uri.toString();
        // Remove from definition index
        for (const [className, defs] of this.index.entries()) {
            const filtered = defs.filter(d => d.uri !== key);
            if (filtered.length === 0) {
                this.index.delete(className);
            } else {
                this.index.set(className, filtered);
            }
        }
        // Remove from usage index
        for (const [className, usages] of this.usageIndex.entries()) {
            const filtered = usages.filter(u => u.uri !== key);
            if (filtered.length === 0) {
                this.usageIndex.delete(className);
            } else {
                this.usageIndex.set(className, filtered);
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

    private scanUsages(doc: vscode.TextDocument) {
        const text = doc.getText();
        const uri = doc.uri.toString();
        const ext = uri.substring(uri.lastIndexOf('.')).toLowerCase();
        const isTemplate = ['.html', '.htm', '.vue', '.svelte', '.astro', '.jsx', '.tsx'].includes(ext);

        if (!isTemplate) return;

        // Mask out <style> blocks so CSS rules don't appear as usages
        let maskedText = text;
        const styleRegex = /<style\b[^>]*>[\s\S]*?<\/style>/gi;
        let match: RegExpExecArray | null;
        while ((match = styleRegex.exec(text)) !== null) {
            const spaces = ' '.repeat(match[0].length);
            maskedText = maskedText.substring(0, match.index) + spaces + maskedText.substring(match.index + match[0].length);
        }

        const allUsages = new Map<string, ClassUsage[]>();

        const addUsage = (className: string, absStart: number, absEnd: number) => {
            const pos = doc.positionAt(absStart);
            const line = pos.line;
            const startChar = pos.character;
            const endChar = startChar + (absEnd - absStart);
            const lineText = doc.lineAt(line).text;
            const usage: ClassUsage = {
                className,
                uri,
                line,
                startChar,
                endChar,
                context: lineText.trim()
            };
            const existing = allUsages.get(className) || [];
            existing.push(usage);
            allUsages.set(className, existing);
        };

        // Scan 1: Single-line attributes with simple quoted strings
        const attrNames = ['class', 'className', ':class', 'v-bind:class', '[class]', '[ngClass]', 'ng-class'];
        const attrRegex = new RegExp(
            `(?:^|\\s)(?:${attrNames.map(a => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*=\\s*(?:\\{\\s*)?["'\`]([^"'\`]*)["'\`](?:\\s*\\})?`,
            'g'
        );
        let attrMatch: RegExpExecArray | null;
        while ((attrMatch = attrRegex.exec(maskedText)) !== null) {
            const value = attrMatch[1];
            const fullMatch = attrMatch[0];
            const quoteChars = ['"', "'", '`'];
            let quoteStart = -1;
            for (let i = 0; i < fullMatch.length; i++) {
                if (quoteChars.includes(fullMatch[i])) {
                    quoteStart = i;
                    break;
                }
            }
            if (quoteStart === -1) continue;
            const valueStart = attrMatch.index + quoteStart + 1;
            const classes = value.split(/\s+/).filter(c => c.length > 0);
            let searchPos = 0;
            for (const cls of classes) {
                const tokenPos = value.indexOf(cls, searchPos);
                if (tokenPos === -1) break;
                searchPos = tokenPos + cls.length;
                const absStart = valueStart + tokenPos;
                const absEnd = absStart + cls.length;
                addUsage(cls, absStart, absEnd);
            }
        }

        // Scan 2: Multi-line template literals for className
        const templateRegex = /(?:^|\s)className\s*=\s*\{\s*`/g;
        let tplMatch: RegExpExecArray | null;
        while ((tplMatch = templateRegex.exec(maskedText)) !== null) {
            const startBacktick = tplMatch.index + tplMatch[0].length - 1;
            let endBacktick = -1;
            let braceDepth = 0;
            let inInterpolation = false;
            for (let i = startBacktick + 1; i < maskedText.length; i++) {
                if (!inInterpolation && maskedText[i] === '$' && i + 1 < maskedText.length && maskedText[i + 1] === '{') {
                    inInterpolation = true;
                    braceDepth = 1;
                    i++;
                } else if (inInterpolation) {
                    if (maskedText[i] === '{') braceDepth++;
                    else if (maskedText[i] === '}') braceDepth--;
                    if (braceDepth === 0) inInterpolation = false;
                } else if (maskedText[i] === '`') {
                    endBacktick = i;
                    break;
                }
            }
            if (endBacktick === -1) continue;

            const value = maskedText.substring(startBacktick + 1, endBacktick);
            const valueStart = startBacktick + 1;
            const classes = value.split(/\s+/).filter(c => c.length > 0);
            let searchPos = 0;
            for (const cls of classes) {
                const tokenPos = value.indexOf(cls, searchPos);
                if (tokenPos === -1) break;
                searchPos = tokenPos + cls.length;
                const absStart = valueStart + tokenPos;
                const absEnd = absStart + cls.length;
                addUsage(cls, absStart, absEnd);
            }
        }

        // Scan 3: Utility functions
        const fnNames = ['cn', 'clsx', 'classNames'];
        for (const fnName of fnNames) {
            const regex = new RegExp(`\\b${fnName}\\s*\\(`, 'g');
            let fnMatch: RegExpExecArray | null;
            while ((fnMatch = regex.exec(maskedText)) !== null) {
                const fnStart = fnMatch.index + fnMatch[0].length - 1;
                let parenDepth = 1;
                let fnEnd = -1;
                for (let i = fnStart + 1; i < maskedText.length; i++) {
                    if (maskedText[i] === '(') parenDepth++;
                    else if (maskedText[i] === ')') {
                        parenDepth--;
                        if (parenDepth === 0) {
                            fnEnd = i;
                            break;
                        }
                    }
                }
                if (fnEnd === -1) continue;

                const fnBody = maskedText.substring(fnStart + 1, fnEnd);
                const bodyStart = fnStart + 1;

                const quotes = ['"', "'", '`'];
                let pos = 0;
                while (pos < fnBody.length) {
                    while (pos < fnBody.length && !quotes.includes(fnBody[pos])) pos++;
                    if (pos >= fnBody.length) break;
                    const q = fnBody[pos];
                    const strStart = pos + 1;
                    let strEnd = strStart;
                    while (strEnd < fnBody.length && fnBody[strEnd] !== q) strEnd++;
                    if (strEnd >= fnBody.length) break;

                    const value = fnBody.substring(strStart, strEnd);
                    const absStrStart = bodyStart + strStart;
                    const classes = value.split(/\s+/).filter(c => c.length > 0);
                    let searchPos = 0;
                    for (const cls of classes) {
                        const tokenPos = value.indexOf(cls, searchPos);
                        if (tokenPos === -1) break;
                        searchPos = tokenPos + cls.length;
                        const absStart = absStrStart + tokenPos;
                        const absEnd = absStart + cls.length;
                        addUsage(cls, absStart, absEnd);
                    }

                    pos = strEnd + 1;
                }
            }
        }

        // Deduplicate and store
        for (const [className, usages] of allUsages.entries()) {
            const seen = new Set<string>();
            const unique = usages.filter(u => {
                const key = `${u.line}:${u.startChar}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });

            const existing = this.usageIndex.get(className) || [];
            this.usageIndex.set(className, [...existing, ...unique]);
        }
    }
}
