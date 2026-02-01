# Fix Bug in kheMessage

When fixing a bug, follow this systematic approach:

## Investigation

1. **Reproduce the bug** - Identify exact steps to trigger the issue
2. **Check browser console** - Look for errors or warnings
3. **Test in multiple browsers** - Chrome, Firefox, Safari, Edge
4. **Test both themes** - Light and dark mode
5. **Test offline mode** - PWA functionality

## Common Bug Areas

### URL/Hash Issues
- Check `compress()` and `decompress()` functions
- Verify `buildUrl()` constructs URLs correctly
- Test with special characters in content

### localStorage Issues
- Wrap in try/catch
- Check storage quota
- Verify VERSION_KEY operations

### Theme Issues
- Check CSS custom properties
- Verify media queries for system preference
- Test theme toggle button

### Version History Issues
- Check `pushLocalVersion()` function
- Verify parent chain integrity
- Test undo/redo stack

## Fix Implementation

1. **Write minimal fix** - Don't refactor unrelated code
2. **Test fix thoroughly** - All edge cases
3. **Verify no regressions** - Test related features
4. **Update tests if needed** - Add test case for the bug

## Documentation

- Document the root cause
- Explain the fix approach
- Note any breaking changes
