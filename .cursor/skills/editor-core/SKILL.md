---
name: editor-core
description: Work with the contenteditable editor implementation. Use when modifying text input behavior, cursor handling, or undo/redo functionality.
---

# Editor Core Skill

Work with the contenteditable editor in kheMessage.

## When to Use

- Modifying text input behavior
- Fixing cursor/selection issues
- Enhancing undo/redo functionality
- Adding keyboard shortcuts

## Editor Implementation

The `Editor` class manages the contenteditable element:

```javascript
function Editor(element, highlight) {
  const listeners = []
  const history = []
  let at = -1, prev

  // Debounced highlighting
  const debounceHighlight = debounce(30, () => {
    const pos = save()
    highlight(element)
    restore(pos)
  })

  // Event handlers
  on('keydown', event => { /* ... */ })
  on('keyup', event => { /* ... */ })
  on('paste', () => setTimeout(recordHistory, 10))
  on('cut', () => setTimeout(recordHistory, 10))

  return {
    set(content) { /* ... */ },
    undo() { /* ... */ },
    redo() { /* ... */ },
    destroy() { /* ... */ }
  }
}
```

## Key Functions

### save() / restore()
Saves and restores cursor position across DOM changes:
- Handles text nodes and element nodes
- Preserves selection direction
- Works with normalized DOM

### recordHistory()
Records editor state for undo/redo:
- Stores HTML and cursor position
- Debounced to avoid excessive entries
- Limited to 10,000 entries

### highlight()
Applies Markdown formatting:
- Called via `parseMarkdown` function
- Replaces text nodes with styled spans
- Preserves cursor position

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Z | Undo |
| Ctrl+Y / Ctrl+Shift+Z | Redo |
| Ctrl+S | Save |
| Ctrl+N | New note |
| Ctrl+O | Import file |

## ContentEditable Quirks

- Use `plaintext-only` mode to avoid HTML injection
- Normalize DOM after changes
- Handle composition events for IME
- Watch for `beforeinput` events

## Adding Features

When extending the editor:
1. Add event listener via `on()`
2. Save position before DOM changes
3. Restore position after changes
4. Record history for undoable actions
