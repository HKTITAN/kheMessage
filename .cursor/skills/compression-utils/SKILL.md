---
name: compression-utils
description: Work with the URL compression system in kheMessage. Use when modifying how content is stored in URLs, debugging encoding issues, or optimizing compression.
---

# Compression Utilities Skill

Work with the URL-based storage and compression system.

## When to Use

- Debugging URL encoding issues
- Optimizing compression performance
- Extending the storage format
- Handling special characters

## Compression Pipeline

```
blocks → serializeBlocks (binary + compact props) → CompressionStream (deflate or brotli) → format byte + Base85 → URL hash
```

## Format Versions

| Format byte | Encoding | Compression |
|-------------|----------|-------------|
| (legacy) | base64url | deflate-raw |
| 0x01 | base64url | deflate-raw |
| 0x02 | base85 | deflate-raw |
| 0x03 | base85 | encrypted (AES-GCM) |
| 0x04 | base85 | brotli |

Format detection: if hash contains chars outside base64url (A-Za-z0-9_-), it's base85. Otherwise legacy base64url.

## Compact Property Keys

Block properties use short keys when serialized:
- `lang` → `l`
- `checked` → `c`
- `start` → `s`
- `emoji` → `e`
- `depth` → `d`

## Encryption (Format 0x03)

AES-GCM-256 with PBKDF2 key derivation (120k iterations). Payload: salt(12) + IV(12) + ciphertext+tag(16). Triggered via "Lock with password" in Share menu.

## URL Structure

```
https://example.com/?theme=dark#base85EncodedContent
```

## Limitations

- URL length limits (~2000 chars safe, ~8000 max in modern browsers)
- Base85 adds ~25% overhead (vs base64 ~33%)
- Brotli supported in Safari 18.4+, Firefox 147+; deflate used as fallback

## Debugging Tips

1. Check browser console for compression errors
2. Test with content containing special characters
3. Verify URL doesn't exceed limits
4. Use DevTools Network tab to check actual URL
5. For encrypted content: ensure Web Crypto API is available
