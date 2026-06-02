# Change Log

All notable changes to the "Class Spy" extension will be documented in this file.

## [0.0.5] - 2026-06-02

### Added
- **Reverse class lookup (CSS hover)** — hover over any class selector (`.foo`) in `.css`, `.scss`, `.sass`, or `.less` files to see every template/HTML/JSX/Vue/Svelte/Astro/Angular usage across the workspace.
- **"Show all usages" quick pick** — when more than 10 usages are found, a command link opens a `QuickPick` to browse and jump to any usage.
- **Usage indexing** — the indexer now scans all template files (`html`, `vue`, `svelte`, `astro`, `jsx`, `tsx`) for `class`, `className`, `:class`, `[ngClass]`, `v-bind:class`, `ng-class`, and utility calls (`cn`, `clsx`, `classNames`), building a reverse map of `className -> usage locations`.
- **Live usage updates** — file watchers automatically update the usage index when templates are created, modified, or deleted.
- **CSS language activation** — extension now activates on `css`, `scss`, `sass`, and `less` files.

### Fixed
- `extensionDevelopmentPath` in test runner was resolving to the wrong directory, causing the VS Code test instance to fail loading.

## [0.0.4] - 2026-05-23

### Added
- **Template literal interpolation support** — hover now works inside JSX/TSX backtick strings with `${…}` interpolations. Static classes are extracted normally, and quoted string literals inside `${…}` blocks are found as a best-effort (e.g. `${isActive ? 'bg-red-500' : 'bg-blue-500'}`).
- **JSX brace syntax detection** — `className={`…`}` is now recognised alongside regular quoted attributes.

### Fixed
- `h-screen` was returning `height: 100vw` instead of `height: 100vh`.
- `inset-x-*` / `inset-y-*` returned `undefined`.
- `gap-y-*` returned `column-gap` instead of `row-gap`.
- Test suite runner was not discovering test files due to an incorrect glob path.

## [0.0.2] - 2026-05-23

### Fixed
- **Extension failing silently after Marketplace install** — removed `node_modules/**` from `.vscodeignore` so runtime dependencies (`postcss`, `postcss-scss`, `postcss-less`, `postcss-sass`) are bundled in the `.vsix`. Previously the extension could not activate because these packages were missing.

### Changed
- Improved README with demo video placeholders and clearer "What does it do?" section for Marketplace discoverability.

## [0.0.1] - 2026-05-23

### Added
- Initial release of Class Spy.
- Hover over `class`, `className`, `:class`, `[ngClass]`, or utility calls (`cn`, `clsx`, `classNames`) to reveal all associated CSS definitions.
- Full Tailwind CSS utility class decoder with combined generated CSS output.
- Clickable file references that open definitions in a new tab.
- **Edit** action to select and modify CSS rules directly in source files.
- Workspace-wide CSS indexing for `.css`, `.scss`, `.sass`, `.less`, and inline `<style>` blocks in `.vue`, `.svelte`, `.astro`, `.html`, `.jsx`, `.tsx`.
- Live file watchers keep the index updated as you edit.
- Support for VS Code 1.74.0+.

### Tested
- 50+ Tailwind utility classes decoded and verified.
- CSS indexer tested with compound selectors (`.btn.primary`, `.card > .title`).
- Hover provider tested across HTML, React (JSX/TSX), Vue, Svelte, and Astro templates.
