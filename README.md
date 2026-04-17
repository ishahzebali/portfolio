# Shahzeb Ali — Cybersecurity Portfolio

> Personal portfolio of **Shahzeb Ali**, SOC Analyst (Level 1), Penetration Tester, and Purple Team Specialist based in Abu Dhabi, UAE.

🔗 **Live Site:** [shahsmen.com](https://shahsmen.com)

---

## 👤 About

This is a fully custom, premium cybersecurity portfolio built to showcase technical skills, professional experience, security research, and threat intelligence blog posts. It features a rich dark/light mode toggle, animated sections, and an interactive SOC challenge widget.

---

## ✨ Features

- **Day / Night Mode** — Persistent theme toggle (defaults to Dark Mode) with smooth transitions
- **Animated Hero Section** — Full-name reveal with floating skill badges and a parallax profile image
- **Technical Arsenal** — Visual skill grid covering SIEM, threat intelligence, offensive security, and more
- **Combat Experience** — Animated timeline of professional roles at CureMD and Arwen Tech
- **Simulations & Operations** — Detailed security project showcase (ELK Stack SIEM, AD Red/Blue lab, phishing investigation)
- **Interactive SOC Terminal** — A live CTF-style scenario where visitors decode a Base64-encoded PowerShell payload and identify a C2 IP
- **Threat Intelligence Blog** — Searchable, filterable blog with posts on bug bounty, CVEs, red team, and blue team topics
- **Responsive Design** — Fully mobile-optimised across all screen sizes
- **SEO Optimised** — Meta tags, canonical URLs, and semantic HTML throughout

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 (with `darkMode: 'class'`) |
| Animations | Framer Motion |
| Icons | Lucide React + Font Awesome |
| Fonts | Outfit, Inter (Google Fonts) |
| Routing | React Router DOM |
| Deployment | GitHub Pages / Custom Domain |

---

## 🗂️ Project Structure

```
src/
├── App.jsx              # Main app shell, routing, global nav & footer
├── index.css            # Tailwind directives + font import
├── main.jsx             # React entry point
├── components/
│   └── home/            # Section components (Hero, Expertise, Projects…)
├── data/
│   └── blogData.js      # All blog post content
├── hooks/
│   └── useRipple.js     # Custom ripple hook
└── pages/
    ├── Blog.jsx          # Blog listing page
    └── BlogPost.jsx      # Individual blog post page
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📬 Contact

| Channel | Details |
|---|---|
| Email | shahzeb@shahsmen.com |
| LinkedIn | [linkedin.com/in/ishahzebali](https://linkedin.com/in/ishahzebali) |
| Website | [shahsmen.com](https://shahsmen.com) |
| Location | Abu Dhabi, UAE |

---

© 2026 Shahzeb Ali. All rights reserved.
