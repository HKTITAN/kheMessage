# kheMessage Agent Instructions

Simple instructions for AI agents working on kheMessage.

## Project Overview

kheMessage is a minimal, in-browser text editor that stores everything in the URL.
- Single HTML file architecture
- No backend, no build step
- Vanilla JavaScript (ES2020+)
- PWA with offline support

## Code Style

- Use async/await for async operations
- Wrap localStorage in try/catch
- Use CSS custom properties for colors
- Keep everything in single HTML file when possible
- Follow existing naming conventions (camelCase)

## Architecture Principles

1. **Single-file first** - Prefer keeping code in index.html
2. **No dependencies** - Avoid adding npm packages
3. **Backwards compatible** - Don't break existing URLs
4. **Progressive enhancement** - Core features work without JS
5. **Accessibility** - Use semantic HTML and ARIA

## Common Tasks

### Adding a Feature
1. Add HTML structure in appropriate section
2. Add CSS styles using custom properties
3. Add JavaScript with proper error handling
4. Test in both light and dark themes
5. Test offline functionality

### Fixing a Bug
1. Reproduce the issue
2. Check browser console for errors
3. Make minimal fix
4. Test in multiple browsers
5. Verify no regressions

### Updating Styles
1. Use CSS custom properties (--bg, --text, etc.)
2. Add transitions for smooth theme changes
3. Test responsive design
4. Check custom cursor support

## Key Files

- `index.html` - Main application
- `sw.js` - Service worker
- `manifest.json` - PWA manifest
- `qr.html` - Full-page QR view
- `qrcode.js` - QR generation library
- `vercel.json` - Vercel platform configuration

## Deployment

### Vercel Deployment

The project is configured for automatic deployment to Vercel via GitHub Actions.

**Quick deploy:** `npx vercel`

**Configuration (`vercel.json`):**
- Clean URLs enabled (`/qr` works without `.html`)
- Security headers (X-Frame-Options, CSP, etc.)
- Optimal cache headers for static assets
- Service worker properly configured

**GitHub Actions:**
- Workflow: `.github/workflows/deploy.yaml`
- Triggers: Push to `master`/`main`, pull requests, manual dispatch
- Requires secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

**Important Notes:**
- No build step required - deploy files as-is
- Service worker cache version in `sw.js` updates automatically
- QR codes use `location.origin` for domain flexibility
- All URLs work with or without custom domain
