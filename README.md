# Class Spy

> **Stop guessing what your CSS classes do — hover and see everything instantly.**

[![CI](https://github.com/PrakashSewani/Class-Spy/actions/workflows/ci.yml/badge.svg)](https://github.com/PrakashSewani/Class-Spy/actions/workflows/ci.yml)
[![Build VSIX](https://github.com/PrakashSewani/Class-Spy/actions/workflows/build-vsix.yml/badge.svg)](https://github.com/PrakashSewani/Class-Spy/actions/workflows/build-vsix.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Sponsor](https://img.shields.io/badge/Sponsor-%E2%9D%A4-red)](https://github.com/sponsors/PrakashSewani)

---

## What does it do?

**Class Spy** turns your `class` and `className` attributes into interactive CSS explorers. Hover over any class string in your code and instantly see:

1. **Where the CSS is defined** — file name, line number, and the full rule
2. **What Tailwind generates** — decoded utility classes shown as plain CSS
3. **One-click navigation** — jump directly to the source file to edit

No more switching between files, no more "where did I define this style?", no more memorizing Tailwind scales.

---

## Quick Demo

### Hover to reveal CSS definitions

![Hover Demo](https://raw.githubusercontent.com/PrakashSewani/Class-Spy/main/media/demo-hover-css.gif)

### See decoded Tailwind utilities

![Tailwind Decode Demo](https://raw.githubusercontent.com/PrakashSewani/Class-Spy/main/media/demo-tailwind-decode.gif)

### Click to jump to the definition

![Click Open Demo](https://raw.githubusercontent.com/PrakashSewani/Class-Spy/main/media/demo-click-open.gif)

---

## Features

| Feature | Description |
|---------|-------------|
| **Hover Reveal** | Hover over any `className="..."`, `class="..."`, `:class`, `[ngClass]`, or `cn()` / `clsx()` call to instantly see all matching CSS definitions. |
| **Tailwind Decoder** | Automatically decodes Tailwind utility classes (`bg-red-500`, `p-4`, `flex`) into their generated CSS equivalents and combines them into a single output block. |
| **Workspace-wide Indexing** | Scans your entire workspace for `.css`, `.scss`, `.sass`, `.less`, and inline `<style>` blocks in `.vue`, `.svelte`, `.astro`, `.html`, `.jsx`, `.tsx`. |
| **Clickable References** | Every found definition includes a clickable link to its file and line number, opening in a **new tab** for quick navigation. |
| **Edit in Place** | Click **Edit** next to any CSS rule to open the source file with the rule **auto-selected** — modify and save directly. |
| **Live Updates** | File watchers keep the CSS index updated automatically as you add, modify, or delete styles. |

---

## Installation

### From VS Code Marketplace

Search for **"Class Spy"** in the Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`) and click **Install**.

### From VSIX

Download the latest `.vsix` from the [Releases](https://github.com/PrakashSewani/Class-Spy/releases) page, then run:

```bash
code --install-extension class-spy-0.0.2.vsix
```

---

## Usage

### 1. Hover over a class attribute

```tsx
// React / TSX
<div className="flex p-4 bg-red-500 text-white">
```

Hover anywhere inside `"flex p-4 bg-red-500 text-white"` and you will see:

- **CSS Definitions**: All `.flex`, `.p-4`, `.bg-red-500`, `.text-white` rules found across your workspace, with file paths and line numbers.
- **Tailwind Generated Styles**: A combined CSS block showing exactly what Tailwind generates for those utilities.

### 2. Open a definition

Click **Open `styles.css:12`** to jump to the rule in a new editor tab.

### 3. Edit a rule

Click **Edit** next to any definition. The source file opens in a split tab with the exact rule highlighted. Modify it and save with `Ctrl+S`.

### 4. Template literal & dynamic class support

Works inside JSX/TSX template literals and interpolations:

```tsx
// Template literals with dynamic prefixes
<div className={`${base}-btn flex p-4`}>

// Ternary expressions — still decodes quoted strings
<div className={`${isActive ? 'bg-red-500' : 'bg-blue-500'} flex`}>
```

Static classes are always shown. Quoted string literals inside `${…}` blocks are extracted as a best-effort, so you still see CSS definitions and Tailwind decoding for conditional classes.

### 5. Utility function support

Works inside `cn()`, `clsx()`, and `classNames()` calls:

```tsx
// shadcn/ui, Radix, etc.
<div className={cn("flex p-4", isActive && "bg-blue-600")}>
```

---

## Supported Languages & Frameworks

- **HTML** (`.html`, `.htm`)
- **React** (`.jsx`, `.tsx`)
- **Vue** (`.vue`)
- **Svelte** (`.svelte`)
- **Astro** (`.astro`)
- **Angular** templates (`[ngClass]`, `[class]`, `ng-class`)

---

## Supported CSS Languages

- `.css`
- `.scss`
- `.sass`
- `.less`
- Inline `<style>` blocks inside templates

---

## Test Suite

Class Spy includes a comprehensive test suite covering all core modules.

### Run tests locally

```bash
npm install
npm run compile
npm test
```

### Test Coverage

| Module | Tests | Coverage |
|--------|-------|----------|
| **Tailwind Decoder** | 50+ utility classes decoded, arbitrary value syntax (`[...]`), invalid class handling | >90% |
| **CSS Indexer** | Selector parsing (simple & compound), inline `<style>` extraction, deduplication, file watcher updates | >85% |
| **Hover Provider** | `class` / `className` / `cn()` extraction, combined output formatting, edge cases | >80% |
| **Extension** | Command registration, integration smoke tests | >75% |

---

## Development

### Build

```bash
npm install
npm run compile
```

### Watch

```bash
npm run watch
```

### Lint

```bash
npm run lint
```

### Package

```bash
npx vsce package
```

### Publish

```bash
npx vsce publish
```

---

## Contributing

Contributions are welcome! Please open an issue or pull request on GitHub.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Support

If Class Spy saves you time and you want to keep it growing, consider supporting the project:

[![Sponsor on GitHub](https://img.shields.io/badge/Sponsor-%E2%9D%A4-red?style=for-the-badge)](https://github.com/sponsors/PrakashSewani)

Your support helps fund new features, better Tailwind coverage, and more framework support.

---

## License

[MIT](LICENSE) © Class Spy Contributors

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.
