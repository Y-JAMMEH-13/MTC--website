# MTC Website — Build Documentation

This document records the exact tools and commands used to build and optimize the MTC website assets. Future maintainers should follow these steps to reproduce any minified/processed output.

---

## Prerequisites

Install Node.js (v18+) and the following global/local packages:

```bash
npm install --save-dev cssnano postcss postcss-cli uglify-js
```

---

## 1. CSS Minification

**Source:** `static/css/styles.refactored.css` → **Output:** `assets/css/main.min.css`

```bash
npx postcss static/css/styles.refactored.css \
  --use cssnano \
  --output assets/css/main.min.css
```

**Tool:** [cssnano](https://cssnano.co/) via PostCSS CLI
**Options:** Default preset (removes comments, collapses whitespace, shortens values)

---

## 2. JavaScript Minification

**Source:** `static/js/script.js` → **Output:** `assets/js/main.min.js`

```bash
npx uglifyjs static/js/script.js \
  --compress \
  --mangle \
  --output assets/js/main.min.js
```

**Tool:** [UglifyJS](https://github.com/mishoo/UglifyJS)

---

## 3. Font Subsetting

Fonts are self-hosted in `assets/fonts/`. The main Inter woff2 was downloaded from Google Fonts.
If subsetting is needed (to reduce file size to only characters used on the site):

```bash
pip install fonttools brotli
pyftsubset assets/fonts/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2 \
  --unicodes="U+0020-007E,U+00A0-00FF" \
  --flavor=woff2 \
  --output-file=assets/fonts/inter-subset.woff2
```

**Tool:** [fonttools / pyftsubset](https://github.com/fonttools/fonttools)

---

## 4. Image Conversion

Logo and team images converted to WebP for modern browsers with PNG fallback via `<picture>`:

```bash
# Using cwebp (install via libwebp)
cwebp -q 85 static/images/MTC_LOGO.png -o assets/images/MTC_LOGO.webp

# Or using Squoosh CLI
npx @squoosh/cli --webp '{}' static/images/MTC_LOGO.png
```

**Tool:** [cwebp](https://developers.google.com/speed/webp/docs/cwebp) or [Squoosh CLI](https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli)

---

## 5. Favicon Generation

Favicons generated from the original SVG/PNG logo using [RealFaviconGenerator](https://realfavicongenerator.net/) or:

```bash
npx favicons-cli assets/images/MTC_LOGO.webp --output assets/images/
```

Generated files are: `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`

---

## 6. Verification

After any build changes, run the visual drift checker to ensure zero style regression:

```bash
node visual-diff-checker.js
```

See [visual-diff-checker.js](./visual-diff-checker.js) for full documentation.
