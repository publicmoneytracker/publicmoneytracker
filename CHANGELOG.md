# PMT Website Changelog

Structural and design changes only. Code-level detail lives in git history.
One entry per session. Update this file when DESIGN_SYSTEM.md or SITE_ARCHITECTURE.md changes.

---

## [2026-04-06b] — Content gating rules + gap study additions

### SITE_ARCHITECTURE changes
- Added Content Gating Rules section (per-report public vs. gated visibility tables)
- Added `/districts` to public Route Map
- Added WAB (`/pro/reports/anomaly/[date-slug]`), EWD (`/pro/reports/election/[slug]`),
  and VLB (`/vendors`, `/vendors/[slug]`) to Report Types table
- Added WAB, EWD, VLB, SMR, DRI, SRC, IIC gating tables to Content Gating Rules
- Added Crawler/AI Search Policy to Content Gating Rules
- Added PMR sample reports strategy (5–10 ungated high-profile members)

---

## [2026-04-06] — Issue #3 + reference docs

### Added
- `app/reports/april-05-2026/page.tsx` — Issue #3 newsletter page (week ending April 5)
- `website/DESIGN_SYSTEM.md` — design token and component reference (new)
- `website/SITE_ARCHITECTURE.md` — route, tier, and data flow reference (new)
- `website/CHANGELOG.md` — this file (new)

### Changed
- `app/page.tsx` — homepage featured report updated from Issue #2 → Issue #3
- `app/reports/page.tsx` — Issue #3 card added above Issue #2 (reverse chronological)
- `components/pmt/BillsThisWeek.tsx` — recess note added to footer bar:
  "Congress was in recess the week of March 31 – April 4 for the spring holiday."

### SITE_ARCHITECTURE corrections (vs. earlier draft)
- Component registry: `BudgetBoard.tsx` corrected to `FederalMoneyBoard.tsx`
- Component registry: `BillsThisWeek.tsx` and `SubstackCTA.tsx` added
- Component registry: `ManageSubscriptionButton.tsx` added
- Route pattern: `/reports/newsletter/[slug]` → `/reports/[date-slug]` (static, not dynamic)
- FMR report status updated to Live
- SUBSCRIPTIONS_OPEN flip condition annotated: Issue #3 is live, Issue #4 triggers flip

### DESIGN_SYSTEM corrections (vs. earlier draft)
- Newsletter issue label format: documented as two separate `<div class="issue-label">` lines
  (was incorrectly shown as a single combined line)

---

## [2026-03-30] — Issue #2

### Added
- `app/reports/march-29-2026/page.tsx` — Issue #2 newsletter page (week ending March 29)

### Changed
- `app/page.tsx` — homepage featured report updated from Issue #1 → Issue #2
- `app/reports/page.tsx` — Issue #2 card added above Issue #1

---

## [2026-03-23] — Issue #1 + Phase 4 launch

### Added
- `app/reports/march-23-2026/page.tsx` — Issue #1 newsletter page (week ending March 22)
- `app/reports/page.tsx` — report archive page
- `components/pmt/SubstackCTA.tsx` — newsletter signup CTA component
- `components/pmt/BillsThisWeek.tsx` — weekly bills component
