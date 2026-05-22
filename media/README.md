# Demo Media for Class Spy

This folder contains demo GIFs and videos used in the README and VS Code Marketplace listing.

## Required Demo Assets

Upload the following files to this folder on the `main` branch so the README raw URLs resolve correctly.

### 1. `demo-hover-css.gif` (recommended ~5 seconds)
**What to record:**
- Open any project with a React/HTML/Vue file
- Hover your mouse over a `className` or `class` attribute value (e.g. `"flex p-4 bg-red-500"`)
- Show the hover tooltip appearing with **CSS Definitions** listing files and line numbers

**Settings for best quality:**
- VS Code zoom: `Ctrl + =` a few times to make text large
- Window size: 1280×720 or smaller
- Recording tool: ScreenToGif, LICEcap, or OBS Studio
- Frame rate: 15-20 fps
- Duration: 3–6 seconds (loop-friendly)

### 2. `demo-tailwind-decode.gif` (recommended ~5 seconds)
**What to record:**
- Hover over a string of Tailwind classes
- Show the **Tailwind Generated Styles** section appearing with decoded CSS like `display: flex;` and `padding: 16px;`

### 3. `demo-click-open.gif` (recommended ~5 seconds)
**What to record:**
- Hover to show the tooltip
- Click the **"Open styles.css:12"** link
- Show the CSS file opening in a split/new tab and jumping to the correct line

### 4. `demo-click-edit.gif` (recommended ~5 seconds)
**What to record:**
- Hover to show the tooltip
- Click the **"Edit"** link next to a definition
- Show the source file opening with the exact CSS rule highlighted/selected

---

## Tips for Great Extension GIFs

1. **Zoom in** — use `Ctrl + =` in VS Code so the code is readable on small screens
2. **Use a clean theme** — a popular theme like Dracula, One Dark Pro, or GitHub Dark looks great in recordings
3. **Hide distractions** — close sidebar, panel, and minimap (`View → Appearance`)
4. **Cursor highlight** — use a tool that shows click highlights (ScreenToGif has this)
5. **File size** — keep each GIF under **2 MB** if possible. Use ScreenToGif's optimizer or compress with `gifsicle`

### Compressing GIFs (optional)

```bash
# Install gifsicle
npm install -g gifsicle

# Optimize
gifsicle --optimize=3 --colors=128 demo-hover-css.gif -o demo-hover-css-small.gif
```

---

Once you've recorded and uploaded these GIFs to this folder, commit them to `main` and the README will automatically display them in the Marketplace!
