<!-- markdownlint-disable MD025 -->
# KSSS MATHS & TECH CLUB Website — Full Project Specification (Static Folder Version KSSS--V.0.04)

This is the **complete and final README** for generating the entire **KSSS MATHS & TECH CLUB Website**, updated with a **static folder structure** for assets.  
Use this README with Copilot or any coding agent to generate the full website.

---

# 📁 Final Project File Tree (With /static)

MTC-website/
│
├── index.html
├── about.html
├── projects.html
├── team.html
├── events.html
├── resources.html
├── contact.html
│
├── static/
│ ├── css/
│ │ └── styles.css
│ │
│ ├── js/
│ │ └── script.js
│ │
│ └── images/
│ ├── team/
│ ├── events/
│ ├── projects/
│ └── logo.png
│
└── README.md

> **This is the final folder structure. The website must follow this exact organization.**

---

# 👥 Executive Team (Use in team.html)

Profile cards must include these members:

- **President:** Haja Isatou Bah  
- **Vice President:** Yusupha Jammeh  
- **Secretary:** Mariama Mboob  
- **Assistant Secretary:** John M. Samura  
- **Treasurer:** Mariama Sanneh  
- **P.R.O:** Zainab Barrow  
- **P.R.O:** Sheikh Tijan Hydara  

---

# 🎨 Design System

## **Color Palette**

| Purpose | Hex |
|--------|------|
| Primary | `#000080` |
| Secondary | `#1A1AFD` |
| Accent | `#FE3807` |
| Success | `#158916` |
| Dark Text | `#1A1A1A` |
| Background | `#F5F7FA` |
| Cards | `#FFFFFF` |

---

## **Typography**

Google Fonts:

- **Poppins** (Headings)
- **Inter** (Body)

---

## **UI Components**

- Rounded corners (12–20px)
- Light shadows
- Hover animations
- Sticky navbar
- Scroll fade-in animations
- Responsive grid layouts
- Section padding: 40–80px

---

# 📄 Pages (All Required)

## **1. Homepage (index.html)**

Includes:

- Hero banner  
- Club slogan  
- Join button  
- Sections preview  

---

## **2. About Page**

- Mission + Vision  
- What we do  
- Focus areas  

---

## **3. Projects Page**

Cards for:

- Ongoing  
- Upcoming  
- Completed  

Each has title, description, badge, image.

---

## **4. Team Page**

Uses the executive list above.  
Cards include:

- Name  
- Role  
- Image  
- Hover lift effect  

---

## **5. Events Page**

Two sections:

- Upcoming Events  
- Past Events (with gallery)  

---

## **6. Resources Page**

- Learning materials  
- Tutorials  
- Downloads (placeholders)  
- Useful external links  

---

## **7. Contact Page**

Includes:

- HTML form  
- Inputs for Name, Email, Message  
- Placeholder submit button  
- School address  

---

# 🧱 Functional Requirements

## **Navigation Bar**

- Sticky top  
- Logo  
- Page links  
- Mobile hamburger menu  

## **Footer**

- Social icons  
- Copyright  

## **Animations**

- Fade-in scroll effects  
- Hover transitions  
- Card elevation  

---

# 📦 Technical Requirements

- **HTML5**, **CSS3**, **JavaScript ES6**
- No frameworks (NO React, Tailwind, Bootstrap)
- Use `/static/css/styles.css`
- Use `/static/js/script.js`
- Images inside `/static/images/...`
- Use Flexbox + Grid
- Include media queries for:
  - Mobile (<600px)
  - Tablet (600–1024px)
  - Desktop (>1024px)

---

# 🧑‍💻 Instructions for Copilot / Coding Agent

1. Use this README as the **single source of truth**.
2. Generate all HTML files with clean code.
3. Add `styles.css` into `/static/css/`.
4. Add `script.js` into `/static/js/`.
5. Use the final file tree exactly.
6. Fill the Team Page using the executive list.
7. Add modern animations and responsive layouts.
8. Do not create any backend or server code.

---

# ✔️ Final Output

The final website must be:

- Modern  
- Professional  
- Fully responsive  
- Smooth animations  
- Clean UI  
- Organized in a **static** folder system  

A complete website for the **MTC**.

---

# 📌 End of README

Save this file as `README.md` at the root of the project.
"""

file_path = "/mnt/data/Maths_Tech_Club_FINAL_STATIC_README.md"
with open(file_path, "w") as f:
    f.write(content)

file_path
