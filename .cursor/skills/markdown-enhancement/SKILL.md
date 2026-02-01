---
name: markdown-enhancement
description: Add or improve Markdown parsing and rendering in kheMessage. Use when adding new Markdown syntax support, fixing formatting issues, or enhancing the text editor.
---

# Markdown Enhancement Skill

Extend or improve the Markdown parsing and rendering in kheMessage.

## When to Use

- Adding new Markdown syntax support (tables, checkboxes, etc.)
- Fixing Markdown rendering issues
- Improving the text editor experience
- Adding syntax highlighting

## Current Implementation

The `parseMarkdown` function in `index.html` handles Markdown rendering:

```javascript
function parseMarkdown(element) {
  const input = element.textContent
  const frag = document.createDocumentFragment()
  
  const matchers = [
    {name: 'md-codeblock', re: /```[^\n]*\n[\s\S]*?\n```/y},
    {name: 'md-h1', re: /^#[ \t]+[^\n]*$/my},
    // ... more matchers
  ]
  // ...
}
```

## Supported Syntax

Currently supported:
- Headers (# to ######)
- Code blocks (``` and ~~~)
- Inline code (`)
- Bold (**text** and __text__)
- Italic (*text* and _text_)
- Strikethrough (~~text~~)
- URLs (auto-linked)

## Adding New Syntax

1. Add a CSS class in the `<style>` block:
   ```css
   .md-new-syntax {
     /* styling */
   }
   ```

2. Add a regex matcher to the `matchers` array:
   ```javascript
   {name: 'md-new-syntax', re: /pattern/y}
   ```

3. Handle special rendering in the loop if needed

## Testing

- Test with various Markdown content
- Verify performance with large documents
- Check that existing syntax still works
- Test in both light and dark themes
