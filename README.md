# Anupam Thackar – iOS Developer Portfolio

A modern, animated personal portfolio built with **React**, **TypeScript**, **Vite**, and **Framer Motion**. Features a dark/light theme, 3D tilt cards, liquid cursor, scroll-driven animations, and full SEO optimization.

🌐 **Live:** [anupamthackar.in](https://anupamthackar.in)

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** – build tooling & dev server
- **Tailwind CSS** – utility-first styling
- **Framer Motion** – animations & transitions
- **Lucide React** – icons

---

## Features

- 🌗 Dark / Light theme toggle
- 🖱️ Liquid cursor with trail (desktop only)
- ✨ Floating particles background (desktop only)
- 🃏 3D tilt cards with glare effect
- 🔤 Text scramble animation
- 🧲 Magnetic buttons
- 📜 Scroll-progress sidebar navigation
- 📱 Fully responsive (mobile-first)
- 🔍 SEO optimized – meta tags, Open Graph, JSON-LD schema

---

## Getting Started

### Prerequisites

- Node.js `>= 18`
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone https://github.com/anupamthackar/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder. Deploy the contents of `dist/` to any static host (GitHub Pages, Vercel, Netlify, etc.).

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
portfolio/
├── public/
│   ├── profile-hero.png      # Profile photo
│   ├── og-image.jpg          # Social share image (1200×630px)
│   ├── sitemap.xml           # SEO sitemap
│   └── robots.txt            # Crawler rules
├── src/
│   ├── App.tsx               # Main component (all sections)
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles + Tailwind directives
├── index.html                # HTML entry – meta tags & JSON-LD schema
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.app.json
```

---

## SEO Setup

The portfolio is optimized for the following searches:

- `iOS developer for hire`
- `Swift developer portfolio`
- `SwiftUI developer India`
- `watchOS developer`
- `hire iOS developer remote`

Key SEO files to keep updated:

| File | Purpose |
|---|---|
| `index.html` | Title, meta description, OG tags, JSON-LD |
| `public/og-image.jpg` | Social share preview (1200×630px) |
| `public/sitemap.xml` | Submitted to Google Search Console |
| `public/robots.txt` | Crawler directives |

---

## Deployment

The `dist/` folder is also committed to the `docs/` directory for **GitHub Pages** deployment.

To rebuild and update `docs/`:

```bash
npm run build
cp -r dist/* docs/
```

---

## ESLint Configuration

For production apps, enable type-aware lint rules in `eslint.config.js`:

```js
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

Optionally add React-specific lint rules:

```bash
npm install -D eslint-plugin-react-x eslint-plugin-react-dom
```

```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

---

## License

© 2025 Anupam Thackar. All rights reserved.