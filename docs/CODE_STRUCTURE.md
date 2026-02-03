# kheMessage Code Structure

A line-by-line map of the main application file and key functions.

## index.html Section Map

| Lines | Section | Description |
|-------|---------|-------------|
| 1–10 | Meta | DOCTYPE, charset, viewport, theme-color, manifest, preconnect, fonts, title |
| 11–~800 | CSS | Reset, themes, layout, block styles, modals, responsive |
| ~800–1800 | HTML | header, main, aside, blocks container, modals |
| ~1800–5100 | Script | All JavaScript logic |

## JavaScript Section Map

| Lines | Section | Key exports/globals |
|-------|---------|---------------------|
| ~2179–2240 | Block model constants | `BLOCK_TYPES`, `TYPE_NAMES`, `VERSION_KEY`, `MAX_VERSIONS` |
| ~2240–2310 | Block data model | `blocks`, `createBlock`, `getBlockDepth`, `setBlockDepth` |
| ~2310–2459 | Binary serialization | `serializeBlocks`, `deserializeBlocks` |
| ~2459–2525 | Base85 encoding | `encodeBase85`, `decodeBase85`, `looksLikeBase85` |
| ~2525–2585 | Compression | `compressBlocks`, `decompressToBlocks` |
| ~2585–2781 | Encryption | `encryptBlocks`, `decryptToBlocks`, AES-GCM, PBKDF2 |
| ~2781–3030 | Block rendering | `renderBlocks`, `blocksToDOM`, `domToBlocks` |
| ~3030–3382 | Block operations | `insertBlock`, `deleteBlock`, `moveBlock`, `setBlockType` |
| ~3382–3471 | Slash menu | Slash command handling, type selection |
| ~3471–3501 | Multi-select | Shift+click range selection |
| ~3501–3597 | Drag and drop | Block reordering, indent level on drop |
| ~3597–3720 | URL metrics + limit | `buildShareUrl`, URL size caching, 8KB enforcement |
| ~3720–3840 | Status bar | URL size display, size warnings |
| ~3840–4030 | Save/load | `save`, `load`, `setFromHash`, URL updates |
| ~4030–4125 | Theme | Light/dark toggle, URL param, system preference |
| ~4125–4685 | Version history | `pushLocalVersion`, `versionUndo`, `versionRedo`, `enterPreview`, `exitPreview` |
| ~4685–4760 | UI helpers | `setSaveStatus`, `notify`, `updateQR` |
| ~4588–4727 | Export | `downloadTXT`, `downloadHTML`, `downloadMD` |
| ~4727–5100 | Initialization | DOM ready, hash load, event listeners, Editor setup |

## Key Functions

### Save/Load

| Function | Description |
|----------|-------------|
| `save()` | Gets blocks → compresses → updates URL hash + localStorage, pushes version |
| `load()` | Resolves hash from URL/localStorage → renders blocks |
| `setFromHash(hash)` | Async load; handles encrypted content |
| `getShortestHash(blocks)` | Computes best hash encoding (binary vs compact) |
| `buildShareUrl(hash)` | Builds share URL for size/QR/copy |

### Version History

| Function | Description |
|----------|-------------|
| `pushLocalVersion(hash, parents)` | Appends version entry; trims to MAX_VERSIONS |
| `versionUndo()` | Moves head to parent, pushes current to redo stack |
| `versionRedo()` | Pops from redo stack, sets as head |
| `enterPreview(hash)` | Loads version read-only, shows preview banner |
| `exitPreview()` | Returns to current head, editable |
| `clearVersionHistory()` | Clears all history (Reset) |

### URL Size + Share Metrics

| Function | Description |
|----------|-------------|
| `refreshUrlMetrics()` | Computes cached share URL + byte size |
| `syncUrlMetricsToLocation()` | Syncs metrics to `location.href` (preview/lock) |
| `isAtInputLimit()` | Enforces danger threshold (8 KB) based on share URL size |

### Block Types (BLOCK_TYPES)

| Value | Type | Description |
|-------|------|-------------|
| 0 | P | Paragraph |
| 1–6 | H1–H6 | Headings |
| 7 | BULLET | Bullet list |
| 8 | NUMBER | Numbered list |
| 9 | TODO | Todo checkbox |
| 10 | CODE | Code block |
| 11 | QUOTE | Quote |
| 12 | CALLOUT | Callout |
| 13 | DIVIDER | Divider |
| 14 | TOGGLE | Toggle section |

## Format Versions (Compression)

| Constant | Value | Encoding | Compression |
|----------|-------|----------|-------------|
| FMT_DEFLATE_B64 | 0x01 | base64url | deflate-raw |
| FMT_DEFLATE_B85 | 0x02 | base85 | deflate-raw |
| FMT_ENCRYPTED | 0x03 | base85 | AES-GCM encrypted |
| FMT_BROTLI_B85 | 0x04 | base85 | brotli |

## Compact Property Keys (Serialization)

When serializing blocks, property keys are shortened:

| Full key | Short key |
|----------|-----------|
| `lang` | `l` |
| `checked` | `c` |
| `start` | `s` |
| `emoji` | `e` |
| `depth` | `d` |
