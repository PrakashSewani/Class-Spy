# Class Spy v0.0.4 Release Notes

## Template Literal & Dynamic Class Support

We're excited to announce **Class Spy v0.0.4**, featuring robust support for JSX/TSX template literals with dynamic class names!

### What's New

#### Template Literal Interpolation Support
Hover now works seamlessly inside backtick template literals with `${…}` interpolations:

```tsx
// Template literals with dynamic prefixes
<div className={`${base}-btn flex p-4`}>

// Ternary expressions — still decodes quoted strings
<div className={`${isActive ? 'bg-red-500' : 'bg-blue-500'} flex`}>
```

**How it works:**
- **Static classes** are extracted normally (e.g., `flex`, `p-4`)
- **Quoted string literals** inside `${…}` blocks are found as a best-effort (e.g., `bg-red-500`, `bg-blue-500`)
- **Dynamic variables** are skipped to avoid false positives

#### JSX Brace Syntax Detection
`className={`…`}` is now recognised alongside regular quoted attributes:

```tsx
// Both of these now work!
<div className="flex p-4">
<div className={`flex p-4`}>
<div className={`${base}-btn flex p-4`}>
```

#### Utility Function Template Literal Support
Works inside `cn()`, `clsx()`, and `classNames()` calls with template literals:

```tsx
cn(`${isOpen ? 'open' : 'closed'} flex p-4`)
clsx(`${isActive ? 'bg-red-500' : 'bg-blue-500'} text-white`)
```

### Bug Fixes

#### Tailwind Decoder Fixes
- **`h-screen`** was returning `height: 100vw` → now correctly returns `height: 100vh`
- **`inset-x-*` / `inset-y-*`** returned `undefined` → now correctly decodes (e.g., `inset-x-2` → `left: 8px; right: 8px;`)
- **`gap-y-*`** returned `column-gap` → now correctly returns `row-gap`

#### Test Suite Fix
- Fixed test suite runner glob path so all tests actually execute (was silently skipping test files)

### Test Coverage

Added **5 new tests** for template literal scenarios:
1. Static classes in JSX template literal with interpolation
2. Quoted string literals extracted from inside `${…}`
3. Purely dynamic template literals (correctly returns `undefined`)
4. Nested braces inside interpolations (e.g., `${condition ? (isDark ? 'dark' : 'light') : ''}`)
5. Backtick strings without interpolation (still work like regular quotes)

**Total test coverage:** 58 passing tests

### Installation

#### From VS Code Marketplace
Search for **"Class Spy"** in the Extensions panel and click **Install**.

#### From VSIX
Download the latest `.vsix` from the [Releases](https://github.com/PrakashSewani/Class-Spy/releases) page, then run:

```bash
code --install-extension class-spy-0.0.4.vsix
```

### Full Changelog

See [CHANGELOG.md](CHANGELOG.md) for complete release history.

---

**Contributors:** @PrakashSewani  
**License:** MIT  
**Repository:** [github.com/PrakashSewani/Class-Spy](https://github.com/PrakashSewani/Class-Spy)
