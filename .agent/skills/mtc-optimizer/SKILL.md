---
name: MTC_Production_Master_ULTIMATE
description: "Zero-compromise production refactor protocol for MTC-Website. This file contains the full, unabridged specifications provided by Yusupha."
version: "5.0-Uncompressed-Verified"
---

# MISSION

Refactor the mtc-website to a world-class production-ready state.
**CRITICAL:** You must strictly adhere to the "Visual Freeze" rule: The site must look 100% identical to the Optimized Production Baseline (Commit 249730c7650bf720dc7ec802fcf6c0ed1a6e4fa1) with 0% computed style drift.

## 0. BASELINE EVOLUTION (HISTORICAL CONTEXT)

- **Legacy Baseline (Commit 54a0e64):** The starting point for the refactor.
- **Optimized Baseline (Commit 249730c):** The new source of truth. Includes:
  - Fix for the dual-scrollbar bug.
  - Removal of all 139+ inline HTML styles into CSS utility classes.
  - Aggressive mobile/tablet whitespace optimizations (Batch 9 & 10).
  - Migration of Google Fonts to self-hosting and performance hardening.

# 1. CODE OPTIMIZATION SPECIFICATIONS

- **Minify CSS & JavaScript:** Use tools like [cssnano](https://cssnano.co/) and [UglifyJS](https://github.com/mishoo/UglifyJS) (or build tools like Webpack, Vite) to reduce file sizes.
- **Combine Files:** Merge all CSS into one file and all JS into one file to reduce HTTP requests (already done if you use a single file).
- **Remove Unused CSS:** Use PurgeCSS to eliminate styles not used in your HTML.
- **Optimize JavaScript:** Defer non‑critical scripts with the `defer` attribute; ensure no render‑blocking scripts in the `<head>`.
- **Enable Gzip / Brotli Compression:** Most hosting platforms do this automatically; verify it’s enabled.
- **Critical CSS:** Extract and inline critical CSS for each page; defer the rest. Inlining above‑the‑fold CSS can reduce render‑blocking further.
- **Build Process Documentation:** Document the exact commands used for minification/subsetting in a `BUILD.md` file to help future maintainers reproduce the build.

# 2. ASSET OPTIMIZATION SPECIFICATIONS

- **Images:** Convert to modern formats (WebP, AVIF) with fallbacks; compress images (e.g., with [ImageOptim](https://imageoptim.com/) or [Squoosh](https://squoosh.app/)); use responsive images (`srcset`, `sizes`); lazy‑load below‑the‑fold images (`loading="lazy"`).
- **Responsive Images (srcset):** Add `srcset` with multiple widths (e.g., 480w, 768w, 1200w) in the `<picture>` element to save bandwidth on mobile devices by serving appropriately sized images.
- **Fetch Priority:** Use `fetchpriority="high"` on the most important image (hero images) to hint to the browser to prioritize loading.
- **Preload Critical Assets:** Preload critical images (e.g., hero images) with `<link rel="preload">` to improve Largest Contentful Paint (LCP).
- **Favicon & Icons:** Generate a full set of favicons (16×16, 32×32, apple‑touch‑icon, etc.) and include them in `<head>`.
- **Fonts:** Self‑host fonts or use `font-display: swap` to avoid invisible text; subset fonts to include only needed characters.
- **Font Subsetting:** Reduce font file size by including only the characters your site actually uses.
- **Font Preloading:** Add `<link rel="preload" href="/assets/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>` to speed up font rendering and reduce CLS.

# 3. PERFORMANCE IMPROVEMENTS

- **Leverage Browser Caching:** Set appropriate cache headers for static assets (CSS, JS, images). CDNs often handle this.
- **Explicit Cache Headers:** In `_headers` or config, add: `/assets/* Cache-Control: public, max-age=31536000, immutable`. Without long‑lived cache headers, repeat visitors will re‑download unchanged CSS/JS/images.
- **Use a CDN:** Distribute assets via a Content Delivery Network (many hosts include this) to reduce latency.
- **Preconnect to External Domains:** Add `<link rel="preconnect">` for Google Fonts or other external resources.
- **Reduce Render‑Blocking Resources:** Inline critical CSS for above‑the‑fold content, or load CSS asynchronously.
- **Optimize the Critical Rendering Path:** Use tools like Lighthouse to identify and fix bottlenecks. Target Lighthouse scores (≥90) to provide measurable proof of performance gains.

# 4. SEO & META TAGS

- **Add Missing Meta Tags:** `description`, `keywords` (optional), `robots`; Open Graph (`og:`) and Twitter Card tags for social sharing.
- **Create a Sitemap:** Generate `sitemap.xml` and submit to Google Search Console. Place it in the root; ensure `robots.txt` references it.
- **Add robots.txt:** To guide search engine crawlers and point to the sitemap.
- **Ensure Semantic HTML:** Proper heading hierarchy (`h1`, `h2`, etc.) and landmark roles (`header`, `nav`, `main`, `footer`).
- **Structured Data:** - Add JSON‑LD for events, organization, etc.
  - Add `BreadcrumbList` structured data for enhanced search result snippets.
  - Add `HowTo` structured data for tutorial pages if applicable.

# 5. ACCESSIBILITY (a11y)

- **Add lang="en" to HTML:** (Ensure presence).
- **Ensure sufficient colour contrast:** Check with tools like WebAIM Contrast Checker.
- **Provide alt text for all images:** Ensure descriptive text for screen readers.
- **Use ARIA attributes where necessary:** e.g., `aria-expanded` on mobile menu.
- **Icon Labels:** Add `aria-label` to buttons with only icons (e.g., social media links) to improve screen reader experience.
- **Make the site fully keyboard‑navigable:** Test with Tab key; ensure focus indicators are visible for usability.
- **Add a “Skip to content” link:** Ensure it is present to allow users to bypass navigation.

# 6. SECURITY

- **Use HTTPS:** Enforced by all modern hosts; verify no mixed content.
- **Set security headers:** e.g., `X‑Content‑Type‑Options: nosniff`, `X‑Frame‑Options: DENY`.
- **Content Security Policy (CSP):** Add a full CSP with `report‑uri` or `report‑to` for monitoring. This mitigates XSS risks.
- **Keep all third‑party libraries up‑to‑date:** (Ongoing maintenance).
- **Sanitize any user inputs:** If adding server‑side forms later.

# 7. HOSTING & DEPLOYMENT CONFIGURATIONS

- **Platform Choice:** Prepare for Netlify, Vercel, or GitHub Pages.
- **Deployment Configs:** Generate `netlify.toml`, `vercel.json`, or GitHub Actions workflows. These files simplify one‑click deployment and ensure correct redirects and asset caching.
- **404 Page:** Create a custom `404.html`. A branded 404 page improves user experience and guides lost visitors back to your site.

# 8. VERIFICATION: THE "DRIFT" CHECK

- **Manual is Banned:** You must not rely on human eyes.
- **Automated Script:** Create a script named `visual-diff-checker.js` using Puppeteer.
- **Logic:**
  1. Spin up a local server for the Golden Optimized Baseline (Commit 249730c).
  2. Spin up a local server for any future development.
  3. Compare `window.getComputedStyle()` for all elements in `body`, `header`, `nav`, `main`, and `footer` at a Desktop viewport (1280x800).
  4. **Fail the build** if any computed CSS value differs (0% tolerance).
- **Broken Link Check:** Scan all `<a>` tags; fail if any return a 404.

# 9. ONGOING MAINTENANCE

- Monitor performance with Lighthouse, WebPageTest.
- Regularly check for broken links.
- Update content and dependencies as needed.
