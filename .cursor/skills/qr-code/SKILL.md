---
name: qr-code
description: Work with QR code generation and display. Use when modifying QR functionality, fixing QR rendering, or adding QR features.
---

# QR Code Skill

Work with QR code generation and display in kheMessage.

## When to Use

- Modifying QR code appearance
- Fixing QR code rendering issues
- Adding QR code features
- Optimizing QR code size

## QR Code Pages

1. **Bottom-right panel** - Small QR in main editor
2. **Full-page QR** - `/qr` or `qr.html`

## Implementation

Uses `qrcode.js` library:

```javascript
function updateQR() {
  const el = document.getElementById('qrcode')
  if (!el || typeof qrcode !== 'function') return
  const url = location.href
  try {
    const qr = qrcode(0, 'L')  // Type 0, Error correction L
    qr.addData(url)
    qr.make()
    el.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0 })
  } catch (e) {
    el.innerHTML = ''
  }
}
```

## Error Correction Levels

- `L` (7%) - Currently used, smallest size
- `M` (15%) - Medium
- `Q` (25%) - Higher reliability
- `H` (30%) - Highest reliability

## Theme Support

QR colors adapt to theme:

```css
html.dark #qrcode svg rect {
  fill: #292524;  /* Background */
}
html.dark #qrcode svg path {
  fill: #fafaf9;  /* Modules */
}
```

## QR Size Limits

- QR codes have capacity limits based on version and error correction
- Very long URLs may fail to generate
- Consider using URL shortener for extremely long content

## Styling

The QR container has consistent styling:

```css
#qrcode-wrap {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
}
```
