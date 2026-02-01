# Code Review Checklist

Review code changes for kheMessage quality and consistency.

## Architecture

- [ ] Changes fit the single-file architecture
- [ ] No unnecessary dependencies added
- [ ] Backwards compatible with existing URLs
- [ ] PWA functionality maintained

## Code Quality

- [ ] Uses existing utility functions
- [ ] Follows naming conventions
- [ ] Proper error handling with try/catch
- [ ] No hardcoded values (use constants)
- [ ] Comments for complex logic

## CSS

- [ ] Uses CSS custom properties for colors
- [ ] Works in light and dark themes
- [ ] Responsive design maintained
- [ ] Transitions are smooth
- [ ] Custom cursors work correctly

## JavaScript

- [ ] Uses async/await appropriately
- [ ] localStorage wrapped in try/catch
- [ ] Debouncing for frequent events
- [ ] requestIdleCallback for non-critical work
- [ ] No memory leaks

## Accessibility

- [ ] Semantic HTML elements
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader compatible

## Performance

- [ ] No unnecessary DOM manipulation
- [ ] Efficient event handlers
- [ ] Version history pruned correctly
- [ ] Compression/decompression efficient

## Testing

- [ ] Tested in Chrome, Firefox, Safari
- [ ] Tested on mobile devices
- [ ] Tested offline (PWA)
- [ ] Tested with long content
- [ ] Tested with special characters
