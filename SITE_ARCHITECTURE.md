# PMT Website Site Architecture

**Read this file before making any structural change to the website.**
**Read DESIGN_SYSTEM.md before making any visual change.**

This is the single source of truth for routes, tier gating, data flow,
component registry, and integration points. If the site structure changes,
change it here first, then update the code to match.

Last updated: April 2026

---

## Core Architecture Principle

**The website is a read-only display layer.** It does not perform analysis.
All computation happens in PMTE (Python/SQLite). The website only displays,
filters, and gates access to pre-generated output exported by PMTE.

The website must remain usable if PMTE has not generated fresh content that day.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js (App Router, TypeScript) | Deployed on Vercel, auto-deploy from `master` branch |
| Styling | Tailwind CSS | Broadsheet design system — see DESIGN_SYSTEM.md |
| Auth | Supabase Auth | JWT, row-level security |
| Database | Supabase PostgreSQL | User records, subscription status |
| Payments | Stripe | Webhook-driven tier updates |
| Data source | PMTE exports | JSON, HTML report files pushed to `website/data/` and `public/data/` |
| Caching | Upstash Redis | (Planned) |

---

## Project Structure

```
/website
  /app                          App Router pages and layouts
    /api                        Route Handlers
      /checkout/route.ts        Stripe checkout session creation
      /portal/route.ts          Stripe customer portal
      /webhook/route.ts         Stripe webhook handler
    /account                    Auth pages
      /dashboard/page.tsx       User dashboard (tier, billing)
      page.tsx                  Sign in / sign up
    /analyst                    Analyst-gated pages
      page.tsx                  Analyst tier landing + pricing
    /pro                        Professional-gated pages
      page.tsx                  Professional tier landing + pricing
    /about/page.tsx             Static
    /methodology/page.tsx       Static
    /reports                    Report pages
      /[slug]                   Static newsletter pages (e.g. /reports/march-29-2026, /reports/april-05-2026)
      /politician/[slug]        Individual PMR pages
    globals.css                 CSS variables, noise texture, component styles
    layout.tsx                  Root layout: fonts, masthead, footer
    page.tsx                    Homepage
  /components
    /ui                         UI primitives (generic)
    /pmt                        PMT-specific components
      FederalMoneyBoard.tsx     Federal Money Board (client component, setInterval)
      CheckoutButton.tsx        Stripe checkout button + disabled state
      ManageSubscriptionButton.tsx  Billing portal button (account dashboard)
      ZipLookup.tsx             ZIP-to-district lookup (client component)
      BillsThisWeek.tsx         Scrollable weekly funding bills list (client component)
      SubstackCTA.tsx           Newsletter signup CTA block
  /lib
    config.ts                   Feature flags (SUBSCRIPTIONS_OPEN, etc.)
    stripe.ts                   Stripe client initialization
    /supabase                   Supabase client helpers
  /public
    /data                       Static data files served to client
      zip_to_district.json      33,791 ZIPs → district mapping
      state_senators.json       State → senator lookup
      ticker_state.json         Federal Money Board live data
    /reports                    Report HTML/PDF files (Phase 4+)
    pmt-logo.svg
    pmt-logo-square.svg
    pmt-profile.jpg
    pmt-icon.jpg
  /styles                       (reserved for future global style overrides)
  /types                        TypeScript type definitions
  middleware.ts                  Route protection with tier inheritance
```

---

## Route Map

### Public Routes (no auth required)

| Route | Page | Content |
|-------|------|---------|
| `/` | Homepage | Federal Money Board, ZIP lookup, newsletter teaser card, funding bills scroll |
| `/about` | About | Static — mission, team, Sievela LLC |
| `/methodology` | Methodology | Static — data sources, pipeline, limitations |
| `/account` | Sign In / Sign Up | Supabase Auth |
| `/reports` | Report Archive | Reverse-chronological list of published issues |
| `/reports/[date-slug]` | Newsletter page | Static routes, e.g. `/reports/march-29-2026`, `/reports/april-05-2026` |
| `/districts` | District ROI Leaderboard | All 435 districts ranked by ROI — fully public, statically generated |

### Analyst-Gated Routes

Accessible by: `analyst_access`, `professional_access`, `institutional_access`

| Route | Page | Content |
|-------|------|---------|
| `/analyst` | Analyst landing | Tier description, pricing grid, subscribe CTA |
| `/analyst/districts/[slug]` | My District Dashboard | Full district scorecard (Phase 7+) |
| `/reports/politician/[slug]` | Politician Money Report | Individual PMR (Phase 4+) |

### Professional-Gated Routes

Accessible by: `professional_access`, `institutional_access`

| Route | Page | Content |
|-------|------|---------|
| `/pro` | Professional landing | Tier description, pricing grid, subscribe CTA |

### Authenticated Routes

| Route | Page | Content |
|-------|------|---------|
| `/account/dashboard` | User dashboard | Current tier, manage subscription button, billing |

---

## Subscription Tiers

### Tier Definitions (Locked)

| Tier | Code Value | Price | Audience |
|------|-----------|-------|----------|
| Free | `public_access` | $0 | Substack readers, casual visitors |
| Analyst | `analyst_access` | $12/mo or $99/yr | Journalists, researchers, engaged citizens |
| Professional | `professional_access` | $29/mo or $249/yr | Consultants, policy shops, watchdog orgs |
| Institutional | `institutional_access` | $199/mo (contact sales) | Newsrooms, law firms, think tanks |

**Naming rules:**
- Always use these exact code values in Stripe, Supabase, middleware, and UI copy
- Never use `pro`, `basic`, `premium`, or any other label
- Display names in UI: "Analyst Access", "Professional Access", "Institutional Access"

### Tier Inheritance

Higher tiers inherit access to lower-tier routes. Middleware must use `.includes()` checks:

```
/analyst/* → accessible by: ['analyst_access', 'professional_access', 'institutional_access']
/pro/*     → accessible by: ['professional_access', 'institutional_access']
```

**Never** check `tier === 'analyst'` for analyst routes. Always check array inclusion.

### Subscription Gate

`lib/config.ts` contains `SUBSCRIPTIONS_OPEN = false`.

When `false`:
- Checkout buttons show "Coming Soon" instead of Stripe flow
- Analyst and Professional pages show launch notice
- Dashboard hides "Manage Subscription" button

**Flip to `true` when ALL three conditions are met:**
1. District ROI reports live on website
2. PMR live on website (`/reports/politician/[slug]`)
3. Issue #4 of newsletter published (Issue #3 = week ending April 5, 2026 — one away)

T&C and Privacy Policy must also be published before flipping.

---

## Auth Flow

### Sign Up / Sign In
1. User visits `/account`
2. Supabase Auth handles email/password authentication
3. On first sign-up, user record created in `users` table with `tier: 'public_access'`
4. JWT token issued, stored in session

### Session Check
- Server components read session server-side via Supabase SSR helpers
- `middleware.ts` intercepts requests to protected routes
- Checks user tier against route requirements using array inclusion
- Unauthenticated users → redirect to `/account`
- Authenticated free users on paid routes → show paywall/upgrade CTA

---

## Stripe Integration

### Products
Stripe products use `metadata.tier` to drive webhook tier updates.
**No hardcoded tier mapping** — the webhook reads the tier from product metadata.

| Product | Stripe metadata.tier | Intervals |
|---------|---------------------|-----------|
| Analyst Access | `analyst_access` | Monthly ($12), Yearly ($99) |
| Professional Access | `professional_access` | Monthly ($29), Yearly ($249) |

### Checkout Flow
1. User clicks Subscribe on `/analyst` or `/pro`
2. `CheckoutButton.tsx` → POST `/api/checkout`
3. Checkout route creates Stripe session with `metadata.supabase_user_id` and `metadata.tier`
4. User completes payment on Stripe
5. Stripe sends `checkout.session.completed` webhook

### Webhook Handler (`/api/webhook/route.ts`)

Handles three events:

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Read `metadata.tier` and `metadata.supabase_user_id` → update `users.tier` |
| `customer.subscription.deleted` | Downgrade user to `public_access` |
| `invoice.payment_failed` | Downgrade user to `public_access` |

**Protected accounts:** Before any downgrade, the webhook checks `protected_accounts` table.
If the user's email is in that table, the downgrade is skipped and logged.

### Customer Portal
POST `/api/portal` → creates Stripe billing portal session → user manages/cancels subscription.

---

## Protected Accounts

Supabase table: `protected_accounts` (email TEXT PRIMARY KEY)

- Tim's account is in this table with `institutional_access` tier
- Webhook downgrades are blocked for any email in this table
- Prevents accidental owner lockout from webhook misfires

---

## Data Flow

### PMTE → Website Pipeline

```
PMTE (Python/SQLite)
    ↓ generates reports
reports/ folder (local)
    ↓ site_exporter.py routes files
website/public/data/        ← static JSON (ticker, ZIP lookup, senators)
website/public/reports/     ← report HTML/PDF files
    ↓ git push
Vercel auto-deploys from master
    ↓
publicmoneytracker.com serves content
```

### Key Data Files

| File | Source | Updates | Used By |
|------|--------|---------|---------|
| `public/data/ticker_state.json` | PMTE Friday refresh | Weekly | FederalMoneyBoard.tsx |
| `public/data/zip_to_district.json` | Census ZCTA crosswalk | Annually (redistricting) | ZipLookup.tsx |
| `public/data/state_senators.json` | Congress.gov | After elections | ZipLookup.tsx |
| `public/data/index.json` | site_exporter.py | Weekly | Report archive, homepage |
| `public/reports/newsletter/` | PMTE newsletter HTML | Weekly | Newsletter pages |
| `public/reports/politician/` | PMTE PMR HTML | Batch generated | PMR pages |

### index.json Structure
Master manifest of all published reports. The website reads this to populate:
- Report archive at `/reports`
- Homepage latest report cards
- Report navigation (next/previous)

---

## Component Registry

### PMT Components (`/components/pmt/`)

| Component | Type | Dependencies | Used On |
|-----------|------|-------------|---------|
| `FederalMoneyBoard.tsx` | Client | `ticker_state.json`, setInterval | Homepage |
| `ZipLookup.tsx` | Client | `zip_to_district.json`, `state_senators.json` | Homepage |
| `CheckoutButton.tsx` | Client | `/api/checkout`, `lib/config.ts` | `/analyst`, `/pro` |
| `ManageSubscriptionButton.tsx` | Client | `/api/portal` | `/account/dashboard` |
| `BillsThisWeek.tsx` | Client | `bills_this_week.json` | Homepage |
| `SubstackCTA.tsx` | Server | — | Report pages, homepage |

### Future Components

| Component | Purpose | Tier |
|-----------|---------|------|
| PMRPage | Politician Money Report renderer | Analyst |
| DistrictDashboard | My District Dashboard | Analyst |

---

## Report Types and Routes

| Report | Code | Route | Tier | Status |
|--------|------|-------|------|--------|
| Federal Money Report (newsletter) | FMR | `/reports/[date-slug]` (static) | Public | Live |
| Politician Money Report | PMR | `/reports/politician/[slug]` | Analyst | Phase 4 |
| State Money Report | SMR | `/analyst/reports/state/[slug]` | Analyst | Future |
| District ROI Index | DRI | `/analyst/districts/[slug]` | Analyst | Future |
| Influence Chain | IIC | `/pro/reports/influence/[slug]` | Professional | Future |
| Stock Reconciliation | SRC | `/analyst/reports/stocks/[slug]` | Analyst | Future |
| Weekly Anomaly Briefing | WAB | `/pro/reports/anomaly/[date-slug]` | Professional | June 2026 |
| Election Watch Dossier | EWD | `/pro/reports/election/[slug]` | Professional | August 2026 |
| Vendor Leaderboard | VLB | `/vendors` (full detail: `/vendors/[slug]`) | Public (top 20) / Analyst (full) | Future |

**Adding a new report type requires touches in 3 places:**
1. **PMTE** — generator produces HTML + payload.json
2. **site_exporter.py** — routes the output to the correct `website/public/reports/` subfolder
3. **Website** — new route page that reads and renders the HTML

---

## Content Gating Rules

**Core principle:** Public pages show enough to demonstrate value and earn AI citations.
Full depth is behind the paywall for everyone — humans and crawlers alike.
Crawlers see exactly what free-tier humans see. No cloaking, no differential serving.

### FMR — Federal Money Report (newsletter) · `/reports/[date-slug]`

| Element | Visibility |
|---------|-----------|
| Full newsletter HTML | Public |

The weekly newsletter is always free. Top-of-funnel acquisition tool.
Distributed via website + Substack (manual upload, free distribution only).

---

### PMR — Politician Money Report · `/reports/politician/[slug]`

| Element | Visibility | Notes |
|---------|-----------|-------|
| Member name, party, state, district | Public | Page identity |
| Total federal dollars received | Public | Single headline number |
| District ROI number | Public | e.g. "+$2,847 per person net federal inflow" |
| Top 3 contracts (name, amount, agency) | Public | Teaser — proves the data is real |
| Election badge (IMMINENT / SAFE / etc.) | Public | |
| Full contract list | Analyst | All awards, sortable |
| Full grant breakdown | Analyst | By category and agency |
| Lobbying connections | Analyst | LDA cross-reference |
| FAC accountability data | Analyst | Single audit findings |
| Influence chain summary | Analyst | Chain scorecard |
| Stock trade disclosures | Analyst | Pending §105(c) legal review |

**Paywall behavior:** First ~20% of content visible. Remaining content uses blur/fade overlay
with inline upgrade CTA. Not a modal. Price and inclusions clearly stated before payment.

**Sample reports (ungated):** 5–10 high-profile members (Speaker, minority leaders, committee
chairs) left fully public as proof of quality. These are the pages most likely to receive
inbound links from news articles and Reddit threads. Every free sample PMR is a door to the
paywall for the other ~396 reports.

---

### SMR — State Money Report · `/analyst/reports/state/[slug]`

| Element | Visibility | Notes |
|---------|-----------|-------|
| State name, total federal dollars, per capita | Public | Landing page / preview |
| District rankings leaderboard (all districts, ROI ratio) | Analyst | |
| Spending by category breakdown | Analyst | |
| Top vendors in state | Analyst | |
| Lobbying cross-reference | Analyst | |

---

### DRI — District ROI Index · `/analyst/districts/[slug]`

| Element | Visibility | Notes |
|---------|-----------|-------|
| District name, representative, total spend | Public | |
| ROI ratio (single number) | Public | Shareable, searchable |
| Full scorecard (spend vs. taxes, by category) | Analyst | |
| Year-over-year trend | Analyst | |
| Peer district comparison | Analyst | |

**`/districts` public page:** All 435 districts ranked by ROI, sortable/filterable, statically
generated. Fully public and indexable. Links to paid detail pages.

---

### IIC — Influence Chain Report · `/pro/reports/influence/[slug]`

| Element | Visibility | Notes |
|---------|-----------|-------|
| Industry/entity name, chain count | Public | Teaser only |
| Chain score (e.g. 3/4 legs confirmed) | Public | |
| Full chain detail (lobbying → bill → award links) | Professional | |
| Timeline visualization | Professional | |
| Dollar amounts per leg | Professional | |

~20 industry-level reports at launch. Professional tier — #1 differentiator product.

---

### SRC — Stock Reconciliation Report · `/analyst/reports/stocks/[slug]`

| Element | Visibility | Notes |
|---------|-----------|-------|
| Report exists (title, date range) | Public | |
| Full trade timing analysis | Analyst | Pending §105(c) legal review for website display |

---

### WAB — Weekly Anomaly Briefing · `/pro/reports/anomaly/[date-slug]`

| Element | Visibility | Notes |
|---------|-----------|-------|
| "X anomalies detected this week" (count only) | Public | Teaser |
| Top 10 anomaly details | Professional | |

Wednesday cadence. Starts June 2026.

---

### EWD — Election Watch Dossier · `/pro/reports/election/[slug]`

| Element | Visibility | Notes |
|---------|-----------|-------|
| Race name, candidates | Public | |
| Competitiveness rating | Public | |
| Full dossier (spending patterns, chains, district ROI, integrity scores) | Professional | |

30–50 competitive races from 467 IMMINENT politicians. **Hard deadline: August 1, 2026** —
90-day pre-election window.

---

### VLB — Vendor Leaderboard · `/vendors` and `/vendors/[slug]`

| Element | Visibility | Notes |
|---------|-----------|-------|
| Top 20 vendors by contract dollars (name, total, rank) | Public | SEO / AI citation target |
| Full vendor detail (agency breakdown, contract history, SAM.gov profile) | Analyst | |

New content type from gap analysis. Route and component TBD when built.

---

### Methodology · `/methodology`

Fully public. Always. This is the page that makes PMT citable as a primary source.
Explains every data source, update frequency, and methodology limitation.

---

### Crawler / AI Search Policy

- Crawlers see exactly what free-tier humans see — preview content only
- Full report content is behind the paywall for everyone (no cloaking, no differential serving)
- JSON-LD schema markup on every report page (`Article`, `Dataset`, or `GovernmentOrganization`)
- Meta descriptions use high-engagement language from content gap analysis
- Every page includes `last_updated` in metadata for freshness signals
- The methodology page is the authority anchor — always fully public and indexable

---

## Feature Flags

All feature flags live in `lib/config.ts`:

| Flag | Current | Controls |
|------|---------|----------|
| `SUBSCRIPTIONS_OPEN` | `false` | Stripe checkout buttons, pricing notices |

Future flags (add here before implementing):
- Stock trades display (pending legal review of Ethics in Government Act §105(c))
- Floor votes section (deferred — no data source available)

---

## Environment Variables

### Required in Vercel

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin (webhooks only) |
| `NEXT_PUBLIC_SITE_URL` | `https://publicmoneytracker.com` |
| `STRIPE_SECRET_KEY` | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` from Stripe dashboard |

### Local Development

All variables in `website/.env.local` (gitignored).

---

## Non-Negotiable Rules

1. **Website never runs PMTE analysis** — read-only display layer only
2. **Never fabricate real-looking data** — all mock data clearly labeled
3. **Stripe tier derived from webhook + product metadata** — no hardcoded mapping
4. **Tier inheritance uses array `.includes()`** — never `===` single tier check
5. **App Router only** — no Pages Router patterns
6. **All report content comes from PMTE exports** — website never generates reports
7. **Platform framing is observational** — never political, never accusatory
8. **`master` branch = production** — Vercel auto-deploys every push
9. **HTML is single source of truth** for newsletter — DOCX derives from HTML
10. **Protected accounts table guards owner** — always check before any downgrade

---

## Build Phase Status

| Phase | Description | Status |
|-------|-------------|--------|
| Phase 1 | Scaffold + design system | ✅ Live |
| Phase 2 | Supabase auth + ZIP lookup (33,791 ZIPs) + route protection | ✅ Live |
| Phase 3 | Stripe checkout + webhooks + tier updates | ✅ Live (test mode) |
| Phase 4 | Report pipeline + live data + newsletter/PMR pages | 🔲 In progress |
| Phase 5+ | Additional report types, SEO, District Dashboard, scale | 🔲 Future |
