<!-- markdownlint-disable MD033 MD041 -->
<div align="center">

# 🎓 Maths & Tech Club (MTC) Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-badge-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%25-success)](https://developers.google.com/web/tools/lighthouse)

**Empowering students through mathematics and technology at KSSS.**

[View Live Site](https://www.mtc.gm/) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📖 About the Project

The official website for the **KSSS Maths & Tech Club (MTC)**. This platform serves as the central hub for our students, showcasing ongoing projects, upcoming events, club resources, and the executive team driving innovation within the school.

This repository contains the highly-optimized, production-ready static assets and HTML pages for the website. The site has been rigorously hardened to achieve perfect Lighthouse scores, utilizing strict Content Security Policies (CSP), optimized assets, and zero-drift CSS generation.

### ✨ Key Features

- **Blazing Fast Performance:** Preloaded fonts, minified CSS/JS, and WebP images.
- **Robust Security:** Full `netlify.toml` / `vercel.json` / `.htaccess` hardening (HSTS, CSP, XSS blocking).
- **SEO & A11y Optimized:** Comprehensive meta tags, Open Graph data, schema.org JSON-LD, and total ARIA compliance.
- **Progressive Web App Ready:** Includes `site.webmanifest` and high-res Android/Apple touch icons.
- **Automated Verification:** Custom Puppeteer script to enforce 0% visual style drift across deployments.

---

## 🛠️ Built With

This project avoids heavy frameworks to maximize rendering speed and minimize bundle sizes.

- **HTML5** (Semantic & Accessible)
- **Vanilla CSS3** (Flexbox/Grid, CSS Variables)
- **Vanilla JavaScript** (ES6+)

---

## 🗂️ Project Structure

The repository follows a clean, static structure. Working source files are kept in `/static`, while the minified, production-ready files served to users live in `/assets`.

```text
MTC-website/
├── *.html                 # Core website pages (index, about, contact, etc.)
├── 404.html               # Custom error page
├── assets/                # 🚀 PRODUCTION ASSETS
│   ├── css/               # Minified stylesheets (main.min.css)
│   ├── js/                # Minified scripts (main.min.js)
│   ├── images/            # Optimized WebP/PNG formats + favicons
│   └── fonts/             # Self-hosted woff2 optimized fonts
├── static/                # 🛠️ SOURCE ASSETS (Dev only)
│   ├── css/               # Raw, unminified CSS
│   ├── js/                # Raw, unminified JS
│   └── images/            # Original source images
├── .htaccess              # Apache configuration (Security & Caching)
├── netlify.toml           # Netlify deployment configuration
├── vercel.json            # Vercel deployment configuration
├── site.webmanifest       # PWA manifest
├── visual-diff-checker.js # Puppeteer visual regression script
└── BUILD.md               # Instructions for reproducing minified assets
```

---

## 🚀 Local Development

To run the project locally and view the site:

### Prerequisites

You only need a simple local HTTP server. We recommend Node.js and `http-server`.

```bash
# Verify Node.js is installed
node -v
```

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/mtc-website.git
   cd mtc-website
   ```

2. **Start the local development server**

   ```bash
   npx http-server . -p 3000
   ```

3. **View in browser**
   Open exactly `http://localhost:3000`

---

## 🧪 Testing & Verification

We enforce a **Visual Freeze** policy. Commit changes must result in 0% style drift for structural elements.

To run the automated drift checker:

1. Ensure the local server is running on port 3000.
2. Install Puppeteer (if not already installed).
   ```bash
   npm install puppeteer
   ```
3. Run the checker.
   ```bash
   node visual-diff-checker.js
   ```
   _The script will fail with an exit code of `1` if any structural CSS regressions or broken internal links are found._

---

## 🏗️ Building Assets

If you need to edit CSS or JS, edit the files in the `static/` folder, and then minify them into the `assets/` folder.

Detailed instructions on how to use `cssnano`, `uglifyjs`, and font subsetters can be found in the **[BUILD.md](./BUILD.md)** file.

---

## 👥 Meet the Executive Team

- **Haja Isatou Bah** — President
- **Yusupha Jammeh** — Vice President
- **Mariama Mboob** — Secretary
- **John M. Samura** — Assistant Secretary
- **Mariama Sanneh** — Treasurer
- **Zainab Barrow** — P.R.O
- **Sheikh Tijan Hydara** — P.R.O

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Verify changes using `visual-diff-checker.js`
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact

Maths & Tech Club - [insert-email@ksss.edu.gm]

Project Link: [https://github.com/your-username/mtc-website](https://github.com/your-username/mtc-website)
