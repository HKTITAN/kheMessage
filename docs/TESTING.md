# kheMessage Testing Checklist

## Pre-Deployment Verification

### Local Testing

- [ ] Open `index.html` in browser - all features work
- [ ] Test light/dark theme switching
- [ ] Test block editor functionality (slash commands, drag handles, etc.)
- [ ] Test version history (undo/redo, branching)
- [ ] Test QR code generation at `/qr` route
- [ ] Test export functionality (TXT, HTML, MD)
- [ ] Test PWA installation locally
- [ ] Test keyboard navigation (all interactive elements)
- [ ] Test focus states visibility
- [ ] Test with screen reader (basic accessibility check)

## GitHub Secrets Setup

Before deployment, ensure these secrets are configured in GitHub repository settings:

1. **VERCEL_TOKEN**
   - Go to https://vercel.com/account/tokens
   - Create new token
   - Add to GitHub: Settings → Secrets and variables → Actions → New repository secret

2. **VERCEL_ORG_ID** and **VERCEL_PROJECT_ID**
   - Run `npx vercel` once locally
   - Find values in `.vercel/project.json`
   - Add both to GitHub secrets

## Post-Deployment Testing

### Critical Features

- [ ] Root `/` loads correctly
- [ ] `/qr` route works (clean URL without .html)
- [ ] 404 page shows for invalid routes (e.g., `/nonexistent`)
- [ ] Custom cursors load in both light and dark themes
- [ ] Google Fonts load correctly
- [ ] Service worker registers successfully
- [ ] PWA installs on mobile devices
- [ ] PWA installs on desktop (Chrome, Edge)

### Functionality Testing

#### Editor

- [ ] Block editor loads and is editable
- [ ] Slash commands menu appears on `/`
- [ ] Tab/Shift+Tab indentation works
- [ ] Drag handles appear and work
- [ ] Block types render correctly (headings, lists, code, quotes, callouts)
- [ ] Todo checkboxes are interactive
- [ ] Toggle sections expand/collapse
- [ ] Inline formatting works (bold, italic, code, links)

#### URL Storage

- [ ] Content compresses and stores in URL hash
- [ ] URL updates after typing (debounced)
- [ ] Refreshing page preserves content
- [ ] Sharing URL works - recipient sees same content
- [ ] URL size indicator shows in status bar (matches share URL)
- [ ] 8KB danger limit enforced (typing disabled at limit; paste truncated)
- [ ] Size warnings appear at 4KB/8KB/16KB thresholds

#### Version History

- [ ] Versions save to localStorage
- [ ] Version list shows in History dropdown
- [ ] Version graph renders correctly
- [ ] Clicking version enters preview mode
- [ ] Preview mode is read-only with banner
- [ ] "Restore this version" works
- [ ] "Back to current" exits preview mode
- [ ] Version undo/redo buttons work
- [ ] Reset clears history

#### Share & Export

- [ ] "Copy link" copies full URL with hash
- [ ] Export TXT downloads correctly
- [ ] Export HTML downloads correctly
- [ ] Export MD downloads correctly
- [ ] Lock/unlock works (AES-GCM) on HTTPS/localhost

#### QR Code

- [ ] `/qr` page loads
- [ ] QR code generates for current URL
- [ ] QR code uses correct domain (location.origin)
- [ ] QR code updates when hash changes
- [ ] "Back to kheMessage" link works
- [ ] Bottom-right QR panel works in main app

#### Theme

- [ ] Light theme displays correctly
- [ ] Dark theme displays correctly
- [ ] System preference respected (no ?theme= param)
- [ ] `?theme=light` parameter works
- [ ] `?theme=dark` parameter works
- [ ] Theme toggle button works
- [ ] Theme persists across page loads
- [ ] All UI elements transition smoothly
- [ ] Theme color meta tag updates

#### Accessibility

- [ ] All icon buttons have aria-labels
- [ ] Keyboard navigation works throughout
- [ ] Focus states visible on all interactive elements
- [ ] Screen reader announces important changes
- [ ] Notification toast has aria-live="polite"
- [ ] Todo checkboxes have role="button" and aria-checked
- [ ] Drag handles respond to keyboard (Enter/Space)
- [ ] History rows are keyboard navigable
- [ ] Dropdowns have proper ARIA attributes

#### Performance

- [ ] Page loads quickly (< 2s on 3G)
- [ ] No CLS (Cumulative Layout Shift)
- [ ] Fonts load with fallback
- [ ] Images (if any) have explicit dimensions
- [ ] Service worker caches assets properly
- [ ] Subsequent visits load from cache
- [ ] Offline mode works (cached pages load)

#### Touch & Mobile

- [ ] Buttons have proper touch targets (44x44px minimum)
- [ ] No double-tap zoom delay on buttons
- [ ] Tap highlight color intentional
- [ ] Drag handles work on touch devices
- [ ] Dropdowns close on outside tap
- [ ] Modal/dropdown overlays don't overscroll

#### Reduced Motion

- [ ] Animations respect prefers-reduced-motion
- [ ] All transitions disabled or minimal with reduced-motion
- [ ] Functionality remains intact with reduced-motion

### Browser Testing

Test in multiple browsers to ensure compatibility:

- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Network Conditions

- [ ] Works on slow 3G
- [ ] Works offline after initial visit
- [ ] Recovers from network errors gracefully

### Security Headers

Check headers in browser DevTools (Network tab):

- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] X-XSS-Protection: 1; mode=block
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Service worker has proper Service-Worker-Allowed header

### Caching

Verify cache headers:

- [ ] Service worker (`sw.js`): `max-age=0, must-revalidate`
- [ ] Manifest: `max-age=86400` (1 day)
- [ ] QR code JS: `max-age=31536000, immutable` (1 year)
- [ ] Cursor files: `max-age=31536000, immutable` (1 year)

### Edge Cases

- [ ] Empty content (placeholder shows)
- [ ] Very long content (8KB+ triggers limit)
- [ ] Special characters in content
- [ ] Multiple rapid saves (debouncing works)
- [ ] Browser back/forward with different hashes
- [ ] Direct URL access with hash
- [ ] URL with invalid base64
- [ ] localStorage full/disabled
- [ ] Service worker registration fails
- [ ] Password lock unavailable on insecure origins (shows message)

## Performance Metrics

Use Lighthouse or WebPageTest to verify:

- [ ] Performance score > 90
- [ ] Accessibility score > 95
- [ ] Best Practices score > 90
- [ ] SEO score > 90
- [ ] PWA installable

## Known Limitations

1. 8KB URL size limit (browser-dependent, conservative estimate)
2. localStorage required for version history
3. Modern browser required (ES2020+ features)
4. Custom cursors may not work in all browsers

## Rollback Plan

If critical issues found in production:

1. Revert GitHub Actions workflow to previous version
2. Redeploy from last known good commit
3. Or: Update Vercel deployment to previous production deployment via Vercel dashboard
