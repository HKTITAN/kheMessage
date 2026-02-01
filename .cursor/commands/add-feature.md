# Add Feature to kheMessage

When adding a new feature to kheMessage, follow these steps:

## Pre-Implementation Checklist

1. **Check existing code** - Review `index.html` to understand current patterns
2. **Plan the UI** - Sketch where the feature fits in the navbar or panel
3. **Consider accessibility** - Plan ARIA labels and keyboard support
4. **Theme support** - Ensure light/dark mode compatibility

## Implementation Steps

1. **Add HTML structure** - Use semantic elements, add to appropriate section
2. **Add CSS styles** - Use CSS custom properties, add theme variants
3. **Add JavaScript logic** - Follow async/await patterns, handle errors gracefully
4. **Update service worker** - Cache any new assets if needed
5. **Test both themes** - Verify appearance in light and dark modes
6. **Test offline** - Verify PWA functionality still works

## Code Quality

- Keep the single-file architecture
- Use existing utility functions (debounce, compress, etc.)
- Follow the established naming conventions
- Add appropriate error handling
- Maintain backwards compatibility with existing URLs

## Documentation

- Update README.md with new feature
- Add to the Features section
- Include usage instructions in the Usage table
