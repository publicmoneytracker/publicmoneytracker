# PMT Website Design System

**Read this file before making any visual change to the website.**

This is the single source of truth for the Public Money Tracker broadsheet aesthetic.
If a design token, component pattern, or visual rule needs to change, change it here first,
then update the code to match.

Last updated: April 2026

---

## Aesthetic Identity

The website uses a **broadsheet newspaper** aesthetic — restrained, authoritative, data-dense.
Think Financial Times or Wall Street Journal print edition, not a SaaS dashboard.

**Core principles:**
- Dense information, generous whitespace between sections
- Horizontal rules divide content — never card shadows or heavy borders
- Typography does the heavy lifting — color is used sparingly
- Red (#c0392b) is the only accent color — used for emphasis, not decoration
- Everything feels printed on paper, not rendered on a screen

---

## Color Tokens

| Token | Hex | Tailwind | CSS Variable | Usage |
|-------|-----|----------|-------------|-------|
| Paper | `#f5f0e8` | `paper` | `--bg` | Page background, card backgrounds |
| Ink | `#1a1a1a` | `ink` | `--ink` | Primary text, dark headers, section bars |
| Ink Light | `#2c2c2c` | `ink-light` | — | Secondary text, body paragraphs |
| Red | `#c0392b` | `red` | `--red` | Accent only: CTAs, badges, live dots, alerts |
| Red Dark | `#a93226` | `red-dark` | — | Hover state for red elements |
| Muted | `#8b7355` | `muted` | `--muted` | Tertiary text: timestamps, footer, labels |
| Border | `#d4c5a9` | `border` | `--border` | Horizontal rules, table borders, dividers |
| Card | `#ede8df` | `card` | — | Subtle card/row backgrounds, alternating rows |

**Color rules:**
- Never introduce new colors without updating this file
- No gradients anywhere on the site
- No colored backgrounds except `ink` (for dark header bars) and `card` (for subtle alternation)
- Red is never used for large background areas — only small badges, dots, borders, and text accents
- Party colors: Republican `#c0392b`, Democrat `#2a5aaa` — used only in political context (ZIP lookup, PMR)

---

## Typography

### Font Families

| Font | Tailwind | CSS Variable | Usage |
|------|----------|-------------|-------|
| Playfair Display | `font-display` | `--font-display` | Headlines, masthead, page titles, section names |
| Source Serif 4 | `font-body` | `--font-body` | Body text, paragraphs, descriptions, issue labels |
| IBM Plex Mono | `font-mono` | `--font-mono` | Data labels, footer, badges, timestamps, nav items, CTAs |

**Loading:** All three loaded via `next/font/google` in `app/layout.tsx` with `display: 'swap'`.

### Type Scale

| Context | Font | Size | Weight | Spacing | Transform |
|---------|------|------|--------|---------|-----------|
| Masthead title | Playfair Display | 1.6rem | 700 | -0.02em | None |
| Page headline | Playfair Display | 1.5rem | 700 | -0.01em | None |
| Section header (dark bar) | IBM Plex Mono | 9px | 500 | 3px | Uppercase |
| Section header (light) | IBM Plex Mono | 9px | 400 | 3px | Uppercase |
| Body text | Source Serif 4 | 16px (1rem) | 400 | Normal | None |
| Data/stat number | IBM Plex Mono | Varies | 600 | 0.06em | None |
| Label/caption | IBM Plex Mono | 0.7–0.8rem | 400 | 0.08–0.12em | Uppercase |
| Footer | IBM Plex Mono | 0.75rem | 400 | 0.06em | None |
| Badge | IBM Plex Mono | 8px | 400 | 1px | Uppercase |
| Nav links | IBM Plex Mono | 0.75rem | 400 | 0.06em | Uppercase |
| Newsletter issue label | Source Serif 4 | 13px | 300 | Normal | Uppercase |

---

## Layout Primitives

### Page Background
Paper (`#f5f0e8`) with a subtle fractal noise texture overlay:
- SVG-based `feTurbulence` filter
- Applied via `body::before` pseudo-element
- `opacity: 0.04` — barely visible, adds paper texture
- `position: fixed`, `pointer-events: none`, `z-index: 0`

### Masthead
- PMT logo left, full nav right
- Nav items: Reports | Districts | Analyst Access | Professional Access | About | Methodology | Sign In
- Double-rule border below (two `1px solid` borders stacked)
- **Do not add or restructure nav links without updating this file**

### Footer
- `Public Money Tracker · A Sievela LLC publication · publicmoneytracker.com`
- Source attribution line: `Data: USASpending.gov · FEC · Senate LDA · Congress.gov`
- IBM Plex Mono, muted color (`#8b7355`)

### Content Width
- Max width: `860px` for content areas
- Centered with auto margins

### Section Dividers
- Horizontal rules only: `1px solid #d4c5a9`
- Never use card shadows, heavy borders, or box-shadow

---

## Component Patterns

### Section Header (Dark)
```
Background: #1a1a1a (ink)
Text: #f5f0e8 (paper)
Font: IBM Plex Mono, 9px, weight 500, letter-spacing 3px, uppercase
Padding: 8px 24px
Layout: flex, space-between
```
Used for: Table headers, section banners, Federal Money Board header, ticker bars.

### Section Header (Light)
```
Border-bottom: 1px solid #d4c5a9
Font: IBM Plex Mono, 9px, letter-spacing 3px, uppercase
Color: #8b7355 (muted)
Padding: 6px 24px
Layout: flex, space-between
```
Used for: Sub-section labels, report section dividers.

### Data Tables
```
Width: 100%
Border-collapse: collapse
Font-size: 10px

TH: ink background, paper text, 8px font, 2px letter-spacing, weight 500
TD: 6px 10px padding, bottom border #d4c5a9
Even rows: rgba(0,0,0,0.02) background
.num class: weight 600, ink color
.pos class: #2a7a2a (green positive)
.neg class: #c0392b (red negative)
```

### Badges
```
Display: inline-block
Border: 1px solid #c0392b
Color: #c0392b
Font: IBM Plex Mono, 8px, letter-spacing 1px, uppercase
Padding: 1px 6px
```
Lock variant: border and text use `#d4c5a9` / `#8b7355` instead of red.

### Bar Charts (Newsletter)
```
Container: flex, align-items flex-end, gap 4px, height 60px
Bars: ink background, flex 1
Opacity levels: .hi = 0.7, .md = 0.4, default = 0.15
Red highlight: red background, opacity 0.8
```

### Gated Content Overlay
```
Container: position relative
Blur mask: absolute bottom, 80px height, gradient from transparent to paper
CTA button: red background, white text, 9px, uppercase, 2px letter-spacing
Blurred content: filter blur(3px), opacity 0.5, pointer-events none
```

### Scorecard Grid
```
Display: grid
Columns: repeat(3, 1fr)
```
Used for stat rows in newsletter and dashboard summaries.

### CTA Buttons
```
Background: #c0392b (red)
Color: white
Font: IBM Plex Mono
Size: 0.8rem or 9px
Letter-spacing: 0.08em or 2px
Text-transform: uppercase
Padding: varies by context (6px 16px for small, 0.85rem 2rem for large)
Hover: #a93226 (red-dark)
```

### "Coming Soon" Disabled State
```
Background: #ede8df (card)
Border: 1px solid #d4c5a9
Font: IBM Plex Mono, 0.8rem, uppercase, 0.08em spacing
Color: #8b7355 (muted)
Text-align: center
```

---

## Newsletter-Specific Rules

The newsletter HTML follows the same broadsheet aesthetic with these additions:

- **Issue label format:** Two separate `<div class="issue-label">` lines:
  - Line 1: `Federal Money Report — Week ending [date]`
  - Line 2: `Issue #N`
  - Both styled as Source Serif 4, 13px, light weight, uppercase, `#555`
- **Stat row:** 3-column scorecard grid at top
- **Charts:** Bar charts + tables, 3–4 per issue
- **Key Insight Box:** Dark background (`ink`), paper text — **Tim-written only, never AI-generated**
- **Paid callout:** CTA to publicmoneytracker.com
- **Word count:** 600–900 words
- **Headline number:** Always a dollar figure formatted as `$X.XB` — never a count

---

## Do-Nots (Guardrails)

These are things Claude Code must never introduce:

- **No rounded corners** on cards, tables, or containers (sharp corners only — broadsheet aesthetic)
- **No box-shadow** on any element
- **No gradients** anywhere
- **No new colors** without updating this file first
- **No emoji** in any UI text
- **No sans-serif body text** — body is always Source Serif 4
- **No heavy card styling** — sections are divided by rules, not boxes
- **No animations or transitions** except the Federal Money Board ticker (subtle only)
- **No political framing** in UI copy — language is always observational, never accusatory
  - Correct: "federal spending analysis", "economic analysis", "spending data"
  - Incorrect: "political watchdog", "follow the money", "expose waste"
- **No fabricated data** — all mock data must be clearly labeled as mock

---

## File Map

Where each design element lives in code:

| Element | File |
|---------|------|
| Color tokens + font families | `tailwind.config.ts` |
| CSS variables + noise texture + component CSS | `app/globals.css` |
| Google Font loading + root layout | `app/layout.tsx` |
| Federal Money Board | `components/pmt/FederalMoneyBoard.tsx` |
| ZIP Lookup widget | `components/pmt/ZipLookup.tsx` |
| Checkout button + disabled state | `components/pmt/CheckoutButton.tsx` |
| Subscription gate flag | `lib/config.ts` (`SUBSCRIPTIONS_OPEN`) |
| Stripe client | `lib/stripe.ts` |
| Supabase client | `lib/supabase/` |
| Route protection | `middleware.ts` |
| Static data files | `public/data/` (zip_to_district.json, state_senators.json, ticker_state.json) |
