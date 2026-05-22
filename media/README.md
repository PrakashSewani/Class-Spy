# Demo Media for Class Spy

This folder contains demo GIFs and videos used in the README and VS Code Marketplace listing.

## Current Assets

| File | Status | Size | Notes |
|------|--------|------|-------|
| `demo-hover-css.gif` | Ready | ~1.9 MB | Hover tooltip showing CSS definitions |
| `demo-tailwind-decode.gif` | Needs compression | ~32 MB | Tailwind decoded CSS output — **too large, see below** |
| `demo-click-open.gif` | Needs compression | ~24 MB | Click to open file at line — **borderline, see below** |
| `demo-click-edit.gif` | **Missing** | — | Need a GIF showing the Edit button auto-selecting a rule |

## Size Warnings

Two of the GIFs are **too big** for comfortable distribution:

- `demo-tailwind-decode.gif` (~32 MB) — GitHub warns on files >50 MB and blocks >100 MB, but this still bloats the `.vsix` package massively.
- `demo-click-open.gif` (~24 MB) — Close to the GitHub warning threshold.

The `.vsix` extension package already includes `node_modules` (~54 MB). Adding 56 MB of GIFs makes the download **~110 MB+**, which is poor user experience.

### Recommended fix

**Re-record shorter GIFs** (3–5 seconds max, 15 fps, smaller window) or compress them with an online tool:

- [ezgif.com/optimize](https://ezgif.com/optimize)
- [iloveimg.com/compress-image](https://www.iloveimg.com/compress-image)

Target: **each GIF under 2 MB** (the hover demo is already perfect at 1.9 MB).

---

## Recording Tips for Replacement GIFs

1. **Zoom in** — use `Ctrl + =` in VS Code so the code is readable on small screens
2. **Use a clean theme** — Dracula, One Dark Pro, or GitHub Dark look great in recordings
3. **Hide distractions** — close sidebar, panel, and minimap (`View → Appearance`)
4. **Cursor highlight** — use a tool that shows click highlights (ScreenToGif has this)
5. **Keep it short** — 3 to 5 seconds is plenty; loop-friendly is best
6. **Small window** — record at 1280×720 or smaller

---

## Compressing GIFs Locally (if tools are installed)

```bash
# Using gifsicle
npm install -g gifsicle
gifsicle --optimize=3 --colors=128 demo-tailwind-decode.gif -o demo-tailwind-decode-small.gif

# Using ImageMagick
magick demo-tailwind-decode.gif -coalesce -layers Optimize demo-tailwind-decode-small.gif
```

---

Once all 4 GIFs are under ~2 MB each, commit them to `main` and the Marketplace README will display them automatically.
