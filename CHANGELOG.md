# Change Log

All notable changes to the "Class Spy" extension will be documented in this file.

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
