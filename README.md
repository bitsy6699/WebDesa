# Portal Potensi Desa Karamatwangi

Portal digital untuk menampilkan potensi Desa Karamatwangi — pertanian, UMKM, wisata, dan budaya di dataran tinggi Garut, Jawa Barat.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 8 + Tailwind CSS v4 (plain JS) |
| Backend | Express (ES Modules) |
| Database | PostgreSQL (local Homebrew) |
| ORM | Prisma |
| Auth | JWT |
| Motion | Framer Motion ^12.42.2 |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (via Homebrew)
- pnpm or npm

### Database

```bash
# Create database
psql -d postgres -c "CREATE DATABASE potensi_desa;"

# Run migrations
cd backend
npx prisma migrate dev

# Seed data
npx prisma db seed
```

### Backend

```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

`.env` and `.env.development` should point to `http://localhost:3001/api/v1`.

## Project Structure

```
webdesa/
├── backend/
│   └── src/
│       ├── server.js          # Entry point
│       ├── routes/
│       ├── middleware/
│       └── prisma/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── atoms/         # Reveal, Skeleton
│       │   ├── molecules/     # LazyImage, SectionHeader, FeaturedPotentialCard, LatestPotentialCard
│       │   └── organisms/     # HeroBanner, AboutSection, FeaturedPotentialsSection, etc.
│       ├── layouts/           # PublicLayout
│       ├── pages/             # Route-level pages
│       ├── lib/               # motionPresets, glassStyles, noise
│       ├── styles/            # index.css (design tokens)
│       └── hooks/             # Custom hooks
├── docs/
│   ├── design/                # DESIGN_SYSTEM.md, UI_UX_SPEC.md
│   ├── engineering/           # API_SPEC.md, DB_SCHEMA.md
│   └── development/           # MIGRATION_PLAN docs
└── README.md
```

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#184D47` | Buttons, links, active states |
| `--color-primary-dark` | `#0F3D34` | Dark variant, hero background |
| `--color-primary-light` | `#2F6B60` | Light variant |
| `--color-accent` | `#6FAE8F` | Badges, highlights |
| `--text-primary` | `#1C1917` | Headings |
| `--text-secondary` | `#292524` | Subheadings |
| `--text-body` | `#44403C` | Body text |
| `--text-muted` | `#78716C` | Secondary text |
| `--text-caption` | `#A8A29E` | Captions, timestamps |

### Typography

- **Headings**: Inter, 700-800 weight
- **Body**: Inter, 400 weight
- **Font sizes**: `clamp()` for responsive scaling

### Background Rhythm

```
Hero=#0F3D34  About=#FFF  Featured=#F3F8F5  Categories=#FFF
Map=#FFF  Latest=#FFF  Statistics=#F8FAF8  FAQ=#FFF  Contact=#FAFBFA  CTA=#184D47
```

## Motion System

All motion is defined in `lib/motionPresets.js` as the single source of truth.

### Principles

- **Spring-based transitions** — natural feel, not ease curves
- **No scale on text** — prevents subpixel rendering glitches
- **Micro-rotate** — 0.2deg for organic entrance feel
- **GPU-only** — transform + opacity only
- **Section-level parallax** — `useScroll({ target })` per section

### Presets

| Preset | Usage |
|--------|-------|
| `SECTION_REVEAL` | Section entrance (opacity + y + micro-rotate) |
| `CARD_REVEAL` | Card entrance (opacity + y) |
| `IMAGE_REVEAL` | Image entrance (opacity + y, no scale) |
| `STAGGER_CONTAINER` | Stagger children entrance |
| `SPRING_HOVER` | Button/card hover interactions |
| `PARALLAX` | Speed constants for scroll-based parallax |

### Usage

```jsx
import { SECTION_REVEAL, CARD_REVEAL, STAGGER_CONTAINER } from '@/lib/motionPresets';

// Section reveal
<motion.div
  variants={SECTION_REVEAL}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  ...
</motion.div>

// Staggered cards
<motion.div variants={STAGGER_CONTAINER} initial="hidden" whileInView="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={CARD_REVEAL}>
      <Card item={item} />
    </motion.div>
  ))}
</motion.div>
```

## Build

```bash
cd frontend
./node_modules/.bin/vite build
```

Build time: ~450ms. No TypeScript compilation required (plain JS).

## Available Scripts

### Frontend

- `npm run dev` — Start dev server (port 5173)
- `npm run build` — Production build

### Backend

- `npm run dev` — Start with nodemon (port 3001)
- `npm start` — Production start

## Sprint History

| Sprint | Description |
|--------|-------------|
| 20.1 | Editorial motion polish — spring transitions, parallax depth, text glitch fix |
| 20 | Editorial parallax system — removed pixel transitions, added motion presets |
| 19.3 | Cantor8-inspired pixel transition (removed in Sprint 20) |
| 19.2 | Design tokens, noise.js, section backgrounds |
| 19.1 | Motion presets, green text removal, decorative gradient removal |
| 11–18 | Foundation, features, and layout iterations |
