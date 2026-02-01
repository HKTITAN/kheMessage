---
name: theme-customization
description: Customize or extend the theming system in kheMessage. Use when adding new themes, modifying colors, or enhancing theme switching.
---

# Theme Customization Skill

Customize the theming system in kheMessage.

## When to Use

- Adding new color themes
- Modifying existing theme colors
- Enhancing theme switching behavior
- Adding theme persistence
- Creating custom cursor themes

## Current Theme System

Themes are defined using CSS custom properties:

```css
html, html.light {
  --bg: #fafaf9;
  --text: #1c1917;
  --border: rgba(28, 25, 23, 0.1);
  /* ... */
}

html.dark {
  --bg: #1c1917;
  --text: #fafaf9;
  /* ... */
}
```

## Theme Variables

| Variable | Purpose |
|----------|---------|
| `--bg` | Background color |
| `--bg-elevated` | Elevated surface (cards, dropdowns) |
| `--text` | Primary text color |
| `--text-muted` | Secondary text color |
| `--border` | Border color |
| `--link` | Link color |
| `--link-hover` | Link hover color |
| `--code-bg` | Code block background |
| `--hover` | Hover state background |
| `--cursor-*` | Custom cursor URLs |

## Theme Switching

Theme is controlled via:
1. URL parameter: `?theme=light` or `?theme=dark`
2. System preference: `prefers-color-scheme`
3. Toggle button: `#theme-toggle`

## Adding a New Theme

1. Define CSS variables:
   ```css
   html.new-theme {
     --bg: #newcolor;
     /* ... all variables */
   }
   ```

2. Update theme toggle logic in JavaScript
3. Add cursor files if needed
4. Test all UI elements

## Custom Cursors

Cursors are loaded from:
```
windows_11_cursors_concept_by_jepricreations_densjkc/
├── light/
│   ├── arrow.cur
│   └── ...
└── dark/
    ├── arrow.cur
    └── ...
```
