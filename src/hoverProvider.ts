import * as vscode from 'vscode';
import { CssIndexer, CssDefinition } from './cssIndexer';
import { decodeTailwindClass } from './tailwindDecoder';

const CLASS_ATTRS = ['class', 'className', ':class', 'v-bind:class', '[class]', '[ngClass]', 'ng-class'];
const attrRegex = new RegExp(`(?:^|\\s)(?:${CLASS_ATTRS.map(a => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*=\\s*$`, 'i');
const jsxAttrRegex = new RegExp(`(?:^|\\s)(?:${CLASS_ATTRS.map(a => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*=\\s*\\{\\s*$`, 'i');
// attrNameRegex kept for future attribute-name detection without quotes
// const attrNameRegex = new RegExp(`\\b(?:${CLASS_ATTRS.map(a => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'i');

const UTILITY_FN_NAMES = ['cn', 'clsx', 'classNames'];

export class CssHoverProvider implements vscode.HoverProvider {
    constructor(private indexer: CssIndexer) {}

    provideHover(document: vscode.TextDocument, position: vscode.Position, _token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
        const classList = this.extractClassList(document, position);
        if (!classList || classList.length === 0) {
            return undefined;
        }

        const contents = new vscode.MarkdownString();
        contents.isTrusted = true;
        contents.supportHtml = false;

        const allDefinitions: CssDefinition[] = [];
        const allTailwind: string[] = [];

        for (const cls of classList) {
            const defs = this.indexer.getDefinitions(cls);
            if (defs) {
                allDefinitions.push(...defs);
            }
            const tw = decodeTailwindClass(cls);
            if (tw) {
                allTailwind.push(tw);
            }
        }

        let hasContent = false;
        const currentUri = document.uri.toString();

        // Summary header
        const classTags = classList.map(c => `\`${c}\``).join(', ');
        contents.appendMarkdown(`## CSS Class Hover  \n`);
        contents.appendMarkdown(`**Classes:** ${classTags}  \n\n`);
        contents.appendMarkdown(`---  \n\n`);

        // 1. CSS definitions (deduplicated by exact text+uri)
        if (allDefinitions.length > 0) {
            hasContent = true;
            const seen = new Set<string>();
            const uniqueDefs = allDefinitions.filter(d => {
                const key = `${d.uri}::${d.startLine}:${d.startChar}-${d.endLine}:${d.endChar}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });

            const sorted = uniqueDefs.sort((a, b) => {
                const aSame = a.uri === currentUri ? -1 : 0;
                const bSame = b.uri === currentUri ? -1 : 0;
                if (aSame !== bSame) return aSame - bSame;
                return a.uri.localeCompare(b.uri);
            });

            contents.appendMarkdown(`### CSS Definitions  \n\n`);

            for (let i = 0; i < sorted.length; i++) {
                const def = sorted[i];
                const fileName = vscode.workspace.asRelativePath(vscode.Uri.parse(def.uri));
                const isCurrent = def.uri === currentUri;
                const locationBadge = isCurrent ? 'current file' : fileName;

                const openArgs = encodeURIComponent(JSON.stringify([def.uri, def.line]));
                const openLink = `[Open](command:classSpy.openFile?${openArgs})`;
                const editArgs = encodeURIComponent(JSON.stringify([
                    def.uri,
                    def.startLine, def.startChar,
                    def.endLine, def.endChar
                ]));
                const editLink = `[Edit](command:classSpy.editStyle?${editArgs})`;

                if (i > 0) {
                    contents.appendMarkdown(`\n\n---\n\n`);
                }

                contents.appendMarkdown(`**Selector:** \`${def.selector}\`  \n`);
                contents.appendMarkdown(`*${locationBadge}* &nbsp; ${openLink} &bull; ${editLink}  \n\n`);
                contents.appendCodeblock(def.text, 'css');
            }
        }

        // 2. Combined Tailwind styles
        if (allTailwind.length > 0) {
            if (hasContent) {
                contents.appendMarkdown(`\n\n---\n\n`);
            }
            hasContent = true;

            const combined = allTailwind.join('\n');
            contents.appendMarkdown(`### Tailwind Generated Styles  \n\n`);
            contents.appendCodeblock(combined, 'css');
        }

        if (!hasContent) {
            return undefined;
        }

        return new vscode.Hover(contents);
    }

    private extractClassList(document: vscode.TextDocument, position: vscode.Position): string[] | undefined {
        const text = document.getText();
        const offset = document.offsetAt(position);

        // First try: inside a string literal for class/className/:class etc.
        const fromAttr = this.extractFromAttribute(text, offset, document);
        if (fromAttr) {
            return fromAttr;
        }

        // Second try: inside cn(), clsx(), classNames() calls
        const fromFn = this.extractFromUtilityFn(text, offset, document);
        if (fromFn) {
            return fromFn;
        }

        return undefined;
    }

    private extractFromAttribute(text: string, offset: number, document: vscode.TextDocument): string[] | undefined {
        const quotes = ['"', "'", '`'];
        const candidates: { char: string; pos: number }[] = [];

        // Gather every quote to the left of the cursor so we can find the
        // actual enclosing one (needed when template literals contain inner
        // quoted strings like `${cond ? 'a' : 'b'}`).
        for (let i = offset - 1; i >= 0; i--) {
            if (quotes.includes(text[i])) {
                candidates.push({ char: text[i], pos: i });
            }
        }

        if (candidates.length === 0) {
            return undefined;
        }

        for (const candidate of candidates) {
            const quoteLine = document.lineAt(document.positionAt(candidate.pos));
            const beforeInLine = quoteLine.text.substring(0, document.positionAt(candidate.pos).character);

            if (!attrRegex.test(beforeInLine) && !(candidate.char === '`' && jsxAttrRegex.test(beforeInLine))) {
                continue;
            }

            // Find matching closing quote. For backticks we must skip ${…}
            // interpolations so we don't land on an inner quoted character.
            let endPos = -1;
            if (candidate.char === '`') {
                let braceDepth = 0;
                let inInterpolation = false;
                for (let i = candidate.pos + 1; i < text.length; i++) {
                    if (!inInterpolation && text[i] === '$' && i + 1 < text.length && text[i + 1] === '{') {
                        inInterpolation = true;
                        braceDepth = 1;
                        i++;
                    } else if (inInterpolation) {
                        if (text[i] === '{') { braceDepth++; }
                        else if (text[i] === '}') { braceDepth--; }
                        if (braceDepth === 0) { inInterpolation = false; }
                    } else if (text[i] === '`') {
                        endPos = i;
                        break;
                    }
                }
            } else {
                for (let i = candidate.pos + 1; i < text.length; i++) {
                    if (text[i] === candidate.char) {
                        endPos = i;
                        break;
                    }
                }
            }

            if (endPos === -1 || offset > endPos) {
                continue;
            }

            const value = text.substring(candidate.pos + 1, endPos);
            return this.extractClassesFromString(value, candidate.char);
        }

        return undefined;
    }

    private extractFromUtilityFn(text: string, offset: number, _document: vscode.TextDocument): string[] | undefined {
        const beforeCursor = text.substring(0, offset);

        let fnName: string | null = null;
        let fnStart = -1;
        for (const name of UTILITY_FN_NAMES) {
            const regex = new RegExp(`\\b${name}\\s*\\(`, 'g');
            let match: RegExpExecArray | null;
            while ((match = regex.exec(beforeCursor)) !== null) {
                fnStart = match.index;
                fnName = name;
            }
        }

        if (!fnName || fnStart === -1) {
            return undefined;
        }

        let parenDepth = 1;
        let fnEnd = -1;
        for (let i = fnStart + fnName.length + 1; i < text.length; i++) {
            if (text[i] === '(') parenDepth++;
            if (text[i] === ')') {
                parenDepth--;
                if (parenDepth === 0) {
                    fnEnd = i;
                    break;
                }
            }
        }

        if (fnEnd === -1) {
            return undefined;
        }

        if (offset < fnStart || offset > fnEnd) {
            return undefined;
        }

        const fnBody = text.substring(fnStart + fnName.length + 1, fnEnd);
        const relOffset = offset - (fnStart + fnName.length + 1);

        const quotes = ['"', "'", '`'];
        let currentPos = 0;
        while (currentPos < fnBody.length) {
            while (currentPos < fnBody.length && !quotes.includes(fnBody[currentPos])) {
                currentPos++;
            }
            if (currentPos >= fnBody.length) break;

            const q = fnBody[currentPos];
            const strStart = currentPos + 1;
            let strEnd = strStart;
            while (strEnd < fnBody.length && fnBody[strEnd] !== q) {
                strEnd++;
            }

            if (strEnd >= fnBody.length) break;

            if (relOffset >= currentPos && relOffset <= strEnd + 1) {
                const value = fnBody.substring(strStart, strEnd);
                return this.extractClassesFromString(value, q);
            }

            currentPos = strEnd + 1;
        }

        return undefined;
    }

    private splitClasses(value: string): string[] {
        return value.split(/\s+/).filter(c => c.length > 0);
    }

    private extractClassesFromString(value: string, quoteChar: string): string[] {
        if (quoteChar !== '`') {
            return this.splitClasses(value);
        }

        // Template literal: skip ${...} interpolations, but extract quoted
        // string literals found inside them as a best-effort.
        const classes: string[] = [];
        let currentSegment = '';
        let braceDepth = 0;
        let inInterpolation = false;

        for (let i = 0; i < value.length; i++) {
            const char = value[i];
            if (!inInterpolation && char === '$' && i + 1 < value.length && value[i + 1] === '{') {
                inInterpolation = true;
                braceDepth = 1;
                i++; // skip '{'
                classes.push(...this.splitClasses(currentSegment));
                currentSegment = '';
            } else if (inInterpolation) {
                if (char === '{') {
                    braceDepth++;
                } else if (char === '}') {
                    braceDepth--;
                }
                if (braceDepth === 0) {
                    // End of interpolation — best-effort quoted strings inside it
                    classes.push(...this.extractStringLiteralsFromInterpolation(currentSegment));
                    currentSegment = '';
                    inInterpolation = false;
                } else {
                    currentSegment += char;
                }
            } else {
                currentSegment += char;
            }
        }

        classes.push(...this.splitClasses(currentSegment));
        return classes;
    }

    private extractStringLiteralsFromInterpolation(text: string): string[] {
        // Simple best-effort: find '...' and "..." inside the interpolation block.
        const classes: string[] = [];
        const regex = /['"`]([^'"`\s]+)['"`]/g;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(text)) !== null) {
            classes.push(...this.splitClasses(match[1]));
        }
        return classes;
    }
}
