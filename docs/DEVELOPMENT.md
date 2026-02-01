# kheMessage Development Guide

## Local Setup

kheMessage has **no build step**. You can run it in several ways:

### Option 1: Open directly

Open `index.html` in a browser. Note: some features (service worker, `/qr` routing) work best with a local server.

### Option 2: Local server

```bash
# Python
python -m http.server 8000

# Node (if npx available)
npx serve .

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`.

### Option 3: VS Code Live Server

Use the Live Server extension to serve the project.

## Code Style

- **JavaScript**: ES2020+, camelCase, async/await for async operations
- **CSS**: Use custom properties (`--bg`, `--text`, etc.) for theming
- **localStorage**: Wrap in try/catch
- **Comments**: Add for complex logic; use `// ====` section headers
- **Naming**: Follow existing conventions (e.g. `blocksToHash`, `hashToBlocks`)

## Where to Add Features

| Feature type | Location in index.html |
|--------------|------------------------|
| New block type | `BLOCK_TYPES`, `TYPE_NAMES`, `renderBlocks`, slash menu |
| New UI element | HTML section (~800–1800), CSS section, JS event handlers |
| New export format | `download*` functions in Export section |
| New compression format | Compression section (~2525), format byte constants |
| New theme | CSS `html.new-theme` variables, theme toggle logic |

## File Structure

```
kheMessage/
├── index.html       # Main app (CSS + HTML + JS)
├── qr.html          # Full-page QR view
├── qrcode.js        # QR generation library
├── sw.js            # Service worker
├── manifest.json    # PWA manifest
├── 404.html         # Fallback for invalid routes
├── vercel.json      # Vercel config
└── docs/            # Documentation
```

## Testing

See [docs/TESTING.md](TESTING.md) for the full testing checklist. Before submitting a PR:

1. Test locally in Chrome, Firefox, Safari
2. Test both light and dark themes
3. Test PWA (install, offline)
4. Test keyboard navigation
5. Check console for errors

## Cursor IDE

The project includes `.cursor/` with:

- **Rules**: Project overview, PWA, version history, testing guidelines
- **Commands**: deploy, add-feature, fix-bug, code-review, etc.
- **Skills**: compression-utils, editor-core, qr-code, markdown-enhancement, theme-customization, web-design-guidelines
- **Agents**: reviewer, tester, documenter, accessibility
