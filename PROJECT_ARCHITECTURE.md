# nogvia Host Kit — Project Architecture

> **Agent reference:** Prefer this file over a full codebase scan.
> Last reviewed: 2026-08-06

---

## 1. Overview

| Item | Detail |
|------|--------|
| **Product** | **nogvia Host Kit** — offline desktop tools for vacation-rental hosts |
| **Site type** | Single-page marketing / conversion landing page |
| **Commerce** | Sold on Etsy (`ETSY_BUY_URL` in `src/constants/data.ts`) |
| **Price** | $29 one-time (was $79; 63% off messaging) |
| **Origin** | Google AI Studio template (see `metadata.json`, `README.md`) |
| **Package manager** | npm (no lockfile committed) |

### Products promoted

1. **Guest Guide Builder** — branded digital QR guest guides (WiFi, rules, check-in, local tips)
2. **nogvia Finance** — rental income/expense tracker with Excel export
3. **nogvia Host Kit (bundle)** — both tools + local hub workspace

### What this repo is / is not

| Is | Is not |
|----|--------|
| Frontend SPA only | Backend / API / DB |
| In-page hash navigation | `react-router` or multi-page app |
| Static content + demos | Real Gemini / Express server usage |
| TR/EN i18n via Context | Auth, payments, or CMS |

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React 19 |
| Language | TypeScript ~5.8 |
| Build | Vite 6 |
| Styles | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Icons | `lucide-react` |
| i18n | Custom `LanguageContext` + `localStorage` |
| Animations | `motion` in `package.json` but **unused** in source |

### Unused template dependencies

Present in `package.json` but not imported in app source:

- `express`, `dotenv`, `@google/genai` — AI Studio server/Gemini boilerplate
- `motion` — animation library
- `tsx`, `esbuild` — likely leftover server tooling

---

## 3. Directory Structure

```
c:\etsy_test\
├── PROJECT_ARCHITECTURE.md   ← this file
├── .env.example
├── .gitignore
├── index.html                # mounts React at #root
├── metadata.json             # AI Studio app metadata
├── package.json
├── proje.txt                 # design-system notes (partial; may diverge from live UI)
├── README.md                 # AI Studio boilerplate run instructions
├── tsconfig.json
├── vite.config.ts            # React + Tailwind; `@` → project root
├── public/                   # static assets (served at /)
│   ├── images/
│   │   ├── logo-white.png
│   │   ├── host-kit-hero.jpg
│   │   └── mobilguestguide.png
│   └── videos/
│       ├── product-walkthrough.mp4
│       └── host-story.mp4
└── src/
    ├── main.tsx              # entry: LanguageProvider → App
    ├── App.tsx               # section composition + footer
    ├── index.css             # Tailwind + CSS variables
    ├── types.ts              # shared interfaces
    ├── context/
    │   └── LanguageContext.tsx
    ├── constants/
    │   ├── data.ts           # brand, Etsy URL, FAQ/comparison/revenue static data
    │   ├── media.ts          # public asset paths (logo, images, videos)
    │   └── translations.ts   # full TR/EN copy (primary UI strings)
    └── components/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── ProblemSolution.tsx
        ├── GuestGuideShowcase.tsx
        ├── FinanceShowcase.tsx
        ├── VideoPortfolio.tsx
        ├── HostKitBundle.tsx
        ├── FaqSection.tsx
        ├── PricingCtaSection.tsx
        └── NogviaLogo.tsx
```

---

## 4. Architecture & Data Flow

### Boot sequence

```
index.html
  └── src/main.tsx
        └── <StrictMode>
              └── <LanguageProvider>
                    └── <App />
                          ├── <Navbar />
                          └── <main> …sections… </main>
                          └── <footer>
```

### Module responsibilities

| Module | Path | Role |
|--------|------|------|
| App shell | `src/App.tsx` | Composes all sections + footer links |
| i18n | `src/context/LanguageContext.tsx` | `tr` / `en`, persist `nogvia_lang`, set `document.documentElement.lang` |
| Translations | `src/constants/translations.ts` | Runtime UI copy via `useLanguage().t` |
| Static data | `src/constants/data.ts` | `ETSY_BUY_URL`, `BRAND_INFO`, comparison/FAQ/revenue samples |
| Types | `src/types.ts` | `FaqItem`, `FeatureCard`, `ComparisonRow`, etc. |
| Styles | `src/index.css` | Theme tokens, smooth scroll, utilities |

### Data flow

1. Copy comes from `TRANSLATIONS[language]` (not fetched remotely).
2. Components call `useLanguage()` for `t` and language toggle.
3. UI interactivity is **local `useState`** (tabs, accordion, clipboard, fake export toast).
4. Only persisted client data: `localStorage['nogvia_lang']`.
5. Purchase CTAs open the external Etsy listing.

### State management

- React Context: language only
- Component `useState`: demos and chrome (navbar scroll, mobile menu, FAQ, etc.)
- No Redux / Zustand / React Query

---

## 5. Site Map

**Single route:** `/` (no client router).

Navigation = hash anchors + smooth scroll (`html { scroll-behavior: smooth; }` in `index.css`).

### Page sections (top → bottom)

| Order | Section ID | Component | File |
|------:|------------|-----------|------|
| 0 | *(none)* | `Hero` | `src/components/Hero.tsx` |
| 1 | `#comparison` | `ProblemSolution` | `src/components/ProblemSolution.tsx` |
| 2 | `#guest-guide` | `GuestGuideShowcase` | `src/components/GuestGuideShowcase.tsx` |
| 3 | `#finance` | `FinanceShowcase` | `src/components/FinanceShowcase.tsx` |
| 4 | `#videos` | `VideoPortfolio` | `src/components/VideoPortfolio.tsx` |
| 5 | `#features` | `HostKitBundle` | `src/components/HostKitBundle.tsx` |
| 6 | `#faq` | `FaqSection` | `src/components/FaqSection.tsx` |
| 7 | *(none)* | `PricingCtaSection` | `src/components/PricingCtaSection.tsx` |

### Navbar links (`Navbar.tsx`)

| Target | In nav? |
|--------|---------|
| `#guest-guide` | Yes |
| `#finance` | Yes |
| `#videos` | Yes |
| `#faq` | Yes |
| `#comparison` | No (exists on page; `t.nav.comparison` unused in `navLinks`) |
| `#features` | No |
| Etsy CTA | Yes |
| Logo → `#` | Yes |

### Footer links (`App.tsx`)

`#guest-guide`, `#finance`, `#videos`, `#faq`, Etsy buy

### External URLs

| URL / pattern | Purpose |
|---------------|---------|
| Etsy listing `4550175542` (`ETSY_BUY_URL`) | Primary purchase CTA |
| `tel:` / `https://wa.me/` | Demo host contact buttons in guest-guide mock |
| AI Studio app URL (README) | Template origin only |

---

## 6. Interactive Demos (client-only)

| Demo | Component | Behavior |
|------|-----------|----------|
| Hub / Guide / Finance tabs | `Hero.tsx` | Mock desktop UI switcher |
| Phone guest guide | `GuestGuideShowcase.tsx` | Tabbed phone mock; WiFi copy via clipboard |
| Finance dashboard | `FinanceShowcase.tsx` | Hardcoded stats; fake Excel export feedback |
| Video portfolio | `VideoPortfolio.tsx` | Embedded MP4 players (`product-walkthrough`, `host-story`) |
| FAQ | `FaqSection.tsx` | Category filter + accordion |

---

## 7. i18n

| Detail | Value |
|--------|--------|
| Languages | `tr` (default), `en` |
| Detection | `localStorage` → else `navigator.language` starts with `tr` |
| Storage key | `nogvia_lang` |
| Source of truth for UI strings | `src/constants/translations.ts` |
| Note | `data.ts` holds some EN-oriented static structures; live labels usually come from `t.*` |

---

## 8. Config & Environment

| File | Purpose |
|------|---------|
| `package.json` | Scripts & deps (`name` still `"react-example"`) |
| `vite.config.ts` | Plugins, `@` alias, HMR toggled by `DISABLE_HMR` |
| `tsconfig.json` | ES2022, `@/*` paths, `noEmit` |
| `index.html` | Title still "My Google AI Studio App" |
| `metadata.json` | AI Studio name/description |
| `.env.example` | Template vars |

### Env var names (no secrets)

| Variable | Used by app source? |
|----------|---------------------|
| `GEMINI_API_KEY` | No |
| `APP_URL` | No |
| `DISABLE_HMR` | Yes (`vite.config.ts`) |

---

## 9. Scripts

| Script | Command | Notes |
|--------|---------|-------|
| `dev` | `vite --port=3000 --host=0.0.0.0` | Dev server port **3000** |
| `build` | `vite build` | Output → `dist/` |
| `preview` | `vite preview` | Preview production build |
| `clean` | `rm -rf dist server.js` | `server.js` does not exist in repo |
| `lint` | `tsc --noEmit` | Typecheck only; no ESLint |

No test suite / CI config in repo.

### Typical local run

```bash
npm install
npm run dev
```

---

## 10. Design / Brand Notes

- Brand: **nogvia** (lowercase); tagline: offline host tools for vacation rentals
- Live UI accent in components: gold `#D4AF37` on dark backgrounds (`#0A0A0B`, `#0F0F10`)
- `proje.txt` documents an older orange-accent system (`#f97316`) — may not match live CSS
- Audience: Airbnb / Vrbo short-term rental hosts
- Positioning: offline-first, no monthly SaaS, Mac & Windows

---

## 11. Where to Change What

| Goal | Start here |
|------|------------|
| Copy / translations | `src/constants/translations.ts` |
| Price, brand, Etsy URL | `src/constants/data.ts` (+ duplicate `ETSY_BUY_URL` in `translations.ts`) |
| Logo, images, videos | `src/constants/media.ts` → files in `public/images/`, `public/videos/` |
| Section order | `src/App.tsx` |
| Nav items | `src/components/Navbar.tsx` |
| Add a section | New component under `src/components/` + mount in `App.tsx` + optional hash id + nav link |
| Theme / global CSS | `src/index.css`, Tailwind classes in components |
| Types for content shapes | `src/types.ts` |
| Path alias `@` | Project root (`vite.config.ts`, `tsconfig.json`) |

---

## 12. Known Gaps / Tech Debt

1. Unused deps: `express`, `@google/genai`, `dotenv`, `motion`
2. `index.html` title and `package.json` name still AI Studio defaults
3. `#comparison` / `#features` not in navbar
4. `ETSY_BUY_URL` duplicated in `data.ts` and `translations.ts`
5. No lockfile, tests, ESLint/Prettier, or CI
6. `clean` references missing `server.js`
7. Design tokens in `proje.txt` diverge from implemented gold theme

---

## 13. Quick Mental Model

```
Marketing SPA (Vite + React + Tailwind)
        │
        ├─ LanguageContext (TR/EN)
        ├─ Static constants (brand, FAQ, demos)
        ├─ Hash sections for conversion funnel
        └─ All CTAs → Etsy listing
```

When working on this project: open this file first, then jump only to the files listed in **§11**.
