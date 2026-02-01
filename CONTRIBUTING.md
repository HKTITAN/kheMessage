# Contributing to kheMessage

Thank you for your interest in contributing to kheMessage! This document provides guidelines for contributing.

## How to Contribute

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create a branch** for your change: `git checkout -b feature/my-feature` or `git checkout -b fix/my-fix`
4. **Make your changes** following the code style below
5. **Test** your changes (see [docs/TESTING.md](docs/TESTING.md))
6. **Commit** with a clear message: `feat: add X` or `fix: resolve Y`
7. **Push** to your fork and open a **Pull Request**

## Code Style

- **JavaScript**: ES2020+, camelCase, async/await for async operations
- **CSS**: Use custom properties (`--bg`, `--text`, etc.) for theming
- **localStorage**: Wrap in try/catch
- **Architecture**: Keep everything in the single `index.html` file when possible
- **Accessibility**: Use semantic HTML and ARIA labels
- **Naming**: Follow existing conventions (e.g. `blocksToHash`, `hashToBlocks`)

## Architecture Principles

1. **Single-file first** — Prefer keeping code in `index.html`
2. **No dependencies** — Avoid adding npm packages
3. **Backwards compatible** — Don't break existing URLs
4. **Progressive enhancement** — Core features work without JS
5. **Accessibility** — Semantic HTML, ARIA, keyboard navigation

## Testing Expectations

Before submitting a PR:

- Test in Chrome, Firefox, and Safari
- Test both light and dark themes
- Test PWA (install, offline)
- Test keyboard navigation
- Run through the checklist in [docs/TESTING.md](docs/TESTING.md) for relevant areas

## PR Guidelines

- Keep PRs focused; one feature or fix per PR when possible
- Add a clear description of what changed and why
- Reference any related issues
- Ensure no console errors or warnings

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — System overview and diagrams
- [docs/CODE_STRUCTURE.md](docs/CODE_STRUCTURE.md) — index.html section map
- [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) — Local setup and where to add features
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — Vercel deployment
- [docs/TESTING.md](docs/TESTING.md) — Testing checklist

## Questions?

Open an issue for bugs, feature requests, or questions.
