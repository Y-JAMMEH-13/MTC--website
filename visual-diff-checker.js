#!/usr/bin/env node
/**
 * visual-diff-checker.js
 * MTC Website — Automated Visual Regression & Broken Link Checker
 *
 * USAGE:
 *   node visual-diff-checker.js
 *
 * REQUIRES:
 *   npm install puppeteer
 *
 * WHAT IT DOES:
 *   1. Opens each page on the local dev server (default: http://localhost:3000)
 *   2. Compares computed styles for key structural elements vs a baseline snapshot
 *   3. Scans all <a href> links for 404s
 *   4. Fails with a detailed diff report if any style or link check fails
 */

const puppeteer = require("puppeteer");

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const PAGES = [
  "index.html",
  "about.html",
  "projects.html",
  "team.html",
  "events.html",
  "resources.html",
  "contact.html",
  "404.html",
];

// CSS properties to compare for drift detection
const STYLE_KEYS = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "color",
  "backgroundColor",
  "display",
  "flexDirection",
  "alignItems",
  "justifyContent",
  "borderRadius",
  "boxShadow",
  "lineHeight",
  "letterSpacing",
];

// Selectors to check for style drift
// Pages to skip from structural style comparison (intentionally minimal markup)
const STYLE_SKIP_PAGES = ["404.html"];
const SELECTORS = [
  "body",
  "header",
  "nav",
  "main",
  "footer",
  ".navbar",
  ".hero-section",
];

// ─── HELPER: Get computed styles ────────────────────────────────────────────
async function getComputedStyles(page, selectors, styleKeys) {
  return page.evaluate(
    ({ selectors, styleKeys }) => {
      const result = {};
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (!el) {
          result[sel] = null;
          continue;
        }
        const cs = window.getComputedStyle(el);
        result[sel] = {};
        for (const key of styleKeys) {
          result[sel][key] = cs[key];
        }
      }
      return result;
    },
    { selectors, styleKeys },
  );
}

// ─── HELPER: Collect all page links ─────────────────────────────────────────
async function collectLinks(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll("a[href]")]
      .map((a) => a.href)
      .filter(
        (h) =>
          h &&
          !h.startsWith("javascript:") &&
          !h.startsWith("mailto:") &&
          !h.startsWith("tel:"),
      ),
  );
}

// ─── MAIN ───────────────────────────────────────────────────────────────────
(async () => {
  let passed = true;
  const driftReport = [];
  const brokenLinks = [];
  const checkedLinks = new Set();

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // ── Step 1: Capture baseline styles from first page load ──────────────────
  console.log("\n📸 Capturing baseline styles...");
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle2" });
  const baselineStyles = await getComputedStyles(page, SELECTORS, STYLE_KEYS);
  console.log(
    "   Baseline captured for:",
    Object.keys(baselineStyles).filter((k) => baselineStyles[k] !== null),
  );

  // ── Step 2: Check each page for style drift ───────────────────────────────
  console.log("\n🔍 Checking pages for style drift...");
  for (const pagePath of PAGES) {
    const url = `${BASE_URL}/${pagePath}`;
    try {
      const response = await page.goto(url, { waitUntil: "networkidle2" });
      const status = response ? response.status() : 0;

      if (status >= 400) {
        driftReport.push({
          page: pagePath,
          type: "PAGE_ERROR",
          detail: `HTTP ${status}`,
        });
        passed = false;
        continue;
      }

      // Check structural element styles
      if (STYLE_SKIP_PAGES.includes(pagePath)) {
        console.log(
          `   ⏭  ${pagePath} — skipped structural check (minimal layout)`,
        );
      } else {
        const currentStyles = await getComputedStyles(
          page,
          SELECTORS,
          STYLE_KEYS,
        );
        for (const sel of SELECTORS) {
          if (!baselineStyles[sel] || !currentStyles[sel]) continue;
          for (const key of STYLE_KEYS) {
            const expected = baselineStyles[sel][key];
            const actual = currentStyles[sel][key];
            if (expected !== actual) {
              driftReport.push({
                page: pagePath,
                selector: sel,
                property: key,
                expected,
                actual,
              });
              passed = false;
            }
          }
        }
      }
      console.log(`   ✓ ${pagePath} — style check complete`);

      // Collect links for broken link scan
      const links = await collectLinks(page);
      for (const link of links) {
        if (!checkedLinks.has(link) && link.startsWith(BASE_URL)) {
          checkedLinks.add(link);
        }
      }
    } catch (err) {
      driftReport.push({ page: pagePath, type: "ERROR", detail: err.message });
      passed = false;
    }
  }

  // ── Step 3: Broken link check ─────────────────────────────────────────────
  console.log(`\n🔗 Checking ${checkedLinks.size} internal links...`);
  for (const link of checkedLinks) {
    try {
      const response = await page.goto(link, {
        waitUntil: "domcontentloaded",
        timeout: 8000,
      });
      const status = response ? response.status() : 0;
      if (status === 404) {
        brokenLinks.push(link);
        passed = false;
      }
    } catch (err) {
      brokenLinks.push(`${link} (ERROR: ${err.message})`);
      passed = false;
    }
  }

  await browser.close();

  // ── Step 4: Report ────────────────────────────────────────────────────────
  console.log("\n" + "═".repeat(60));
  if (driftReport.length > 0) {
    console.error("\n❌ STYLE DRIFT DETECTED:");
    for (const entry of driftReport) {
      if (entry.type) {
        console.error(`   [${entry.page}] ${entry.type}: ${entry.detail}`);
      } else {
        console.error(
          `   [${entry.page}] ${entry.selector} > ${entry.property}`,
        );
        console.error(`      expected: ${entry.expected}`);
        console.error(`      actual:   ${entry.actual}`);
      }
    }
  }

  if (brokenLinks.length > 0) {
    console.error("\n❌ BROKEN LINKS FOUND:");
    for (const link of brokenLinks) {
      console.error(`   ${link}`);
    }
  }

  if (passed) {
    console.log("\n✅ No drift detected. All links valid.");
    process.exit(0);
  } else {
    console.error(
      `\n💥 Checks failed: ${driftReport.length} drift issue(s), ${brokenLinks.length} broken link(s).`,
    );
    process.exit(1);
  }
})();
