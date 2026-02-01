# Security Audit

Audit kheMessage for security vulnerabilities and best practices.

## Security Scope

### Client-Side Storage
- **localStorage** - Version history, current hash
- **URL hash** - Compressed content
- **No server-side storage** - All data client-side

### Content Security

1. **XSS Prevention**
   - Using `contenteditable="plaintext-only"`
   - No `innerHTML` for user content
   - URL parsing with proper encoding

2. **URL Safety**
   - Content compressed, not plaintext
   - Base64url encoding (URL-safe)
   - Links opened with `target="_blank"` and `rel="noopener noreferrer"`

3. **Third-Party Code**
   - `qrcode.js` - QR generation library
   - Google Fonts - External font loading

### Data Privacy

- No analytics or tracking
- No data sent to servers
- All content stored locally
- Content visible in URL (share with caution)

## Audit Checklist

- [ ] No eval() or Function() usage
- [ ] No innerHTML with user input
- [ ] External links have noopener noreferrer
- [ ] localStorage access wrapped in try/catch
- [ ] No sensitive data in console.log
- [ ] CSP headers configured (server-side)
- [ ] HTTPS enforced (server-side)

## Known Considerations

1. **URL Sharing** - Content is in URL, visible to anyone with link
2. **Browser History** - URLs with content stored in browser history
3. **localStorage** - Accessible to any script on same origin
4. **Compression** - Not encryption, content can be decompressed

## Recommendations

1. Advise users not to store sensitive information
2. Consider adding encryption option for sensitive content
3. Document privacy considerations in README
