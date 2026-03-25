import FederalMoneyBoard from '@/components/pmt/FederalMoneyBoard'
import ZipLookup from '@/components/pmt/ZipLookup'
import SubstackCTA from '@/components/pmt/SubstackCTA'

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const display: React.CSSProperties = { fontFamily: 'var(--font-display)' }
const body: React.CSSProperties = { fontFamily: 'var(--font-body)' }


// Issue #1 — week ending Mar 22, 2026
// Source: reports/newsletter/2026/03/2026-03-22/manual_uploads/substack_newsletter.html
const NEWSLETTER_CSS = `
  .newsletter-embed * { box-sizing: border-box; }
  .newsletter-embed .wrapper {
    max-width: 620px;
    margin: 0 auto;
    padding: 40px 24px;
  }
  .newsletter-embed .spending-counter {
    background: #1a1a1a;
    padding: 28px 24px;
    margin-bottom: 0;
    text-align: center;
  }
  .newsletter-embed .counter-label {
    font-family: 'IBM Plex Mono', 'Courier New', monospace;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 14px;
  }
  .newsletter-embed .counter-number {
    font-family: 'IBM Plex Mono', 'Courier New', monospace;
    font-size: 38px;
    font-weight: 700;
    color: #c0392b;
    letter-spacing: -1px;
    line-height: 1;
    word-break: break-all;
  }
  .newsletter-embed .counter-subline {
    font-family: 'Source Serif 4', Georgia, serif;
    font-style: italic;
    font-size: 13px;
    color: #ccc;
    margin-top: 12px;
  }
  .newsletter-embed .header {
    text-align: center;
    border-top: 3px solid #c0392b;
    border-bottom: 1px solid #c0392b;
    padding: 24px 0 20px;
    margin-bottom: 36px;
  }
  .newsletter-embed .pub-name {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px;
    font-weight: 900;
    letter-spacing: 1px;
    color: #1a1a1a;
    text-transform: uppercase;
  }
  .newsletter-embed .issue-label {
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #555;
    margin-top: 6px;
  }
  .newsletter-embed .mission-tagline {
    font-family: 'Source Serif 4', Georgia, serif;
    font-style: italic;
    font-size: 12px;
    color: #888;
    margin-top: 7px;
    line-height: 1.5;
  }
  .newsletter-embed .tagline {
    font-family: 'Source Serif 4', Georgia, serif;
    font-style: italic;
    font-size: 13px;
    color: #c0392b;
    margin-top: 8px;
  }
  .newsletter-embed .at-a-glance-box {
    background: #eeebe4;
    border-left: 4px solid #c0392b;
    padding: 16px 20px;
    margin-top: 8px;
    font-family: 'IBM Plex Mono', 'Courier New', monospace;
    font-size: 13px;
  }
  .newsletter-embed .glance-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .newsletter-embed .glance-list li {
    margin-bottom: 9px;
    line-height: 1.5;
  }
  .newsletter-embed .glance-list li:last-child { margin-bottom: 0; }
  .newsletter-embed .glance-label {
    display: block;
    font-size: 9px;
    font-weight: 600;
    color: #c0392b;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 1px;
  }
  .newsletter-embed .time-ctx {
    font-size: 11px;
    color: #999;
    font-style: italic;
    font-weight: 300;
    margin-left: 5px;
  }
  .newsletter-embed .headline-block {
    text-align: center;
    padding: 32px 0;
    border-bottom: 1px solid #ddd4c4;
    margin-bottom: 32px;
  }
  .newsletter-embed .headline-number {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 72px;
    font-weight: 900;
    color: #c0392b;
    line-height: 1;
    letter-spacing: -2px;
  }
  .newsletter-embed .headline-context {
    font-size: 17px;
    font-weight: 300;
    color: #333;
    margin-top: 14px;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }
  .newsletter-embed .section-heading {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    border-bottom: 2px solid #c0392b;
    padding-bottom: 6px;
    margin: 36px 0 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .newsletter-embed .findings-list {
    list-style: none;
    padding: 0;
  }
  .newsletter-embed .findings-list li::before {
    content: "• ";
    color: #c0392b;
    font-weight: 700;
  }
  .newsletter-embed .spotlight-block {
    background: #fff8ee;
    border-left: 4px solid #c0392b;
    padding: 20px 24px;
    font-size: 16px;
    line-height: 1.8;
    color: #222;
  }
  .newsletter-embed .numbers-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;
    margin-top: 8px;
  }
  .newsletter-embed .numbers-table td {
    padding: 11px 12px;
    border-bottom: 1px solid #e8e0d0;
  }
  .newsletter-embed .numbers-table td:first-child {
    color: #555;
    font-weight: 300;
    font-style: italic;
  }
  .newsletter-embed .numbers-table td:last-child {
    text-align: right;
    font-weight: 600;
    color: #1a1a1a;
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 17px;
  }
  .newsletter-embed .overlap-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    margin-top: 8px;
  }
  .newsletter-embed .overlap-table th {
    background: #1a1a1a;
    color: #f5f0e8;
    padding: 8px 12px;
    text-align: left;
    font-family: 'Source Serif 4', Georgia, serif;
    font-weight: 400;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .newsletter-embed .overlap-table th:nth-child(n+3) { text-align: right; }
  .newsletter-embed .overlap-table td { color: #333; }
  .newsletter-embed .insight-box {
    background: #1a1a1a;
    color: #f5f0e8;
    padding: 28px;
    margin: 36px 0;
  }
  .newsletter-embed .insight-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #c0392b;
    margin-bottom: 12px;
    font-family: 'Source Serif 4', Georgia, serif;
  }
  .newsletter-embed .insight-placeholder {
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic;
    font-size: 18px;
    font-weight: 400;
    color: #c8bba8;
    border: 2px dashed #c0392b;
    padding: 20px;
    text-align: center;
    letter-spacing: 0.5px;
  }
`

const NEWSLETTER_HTML = `
<div class="wrapper">
  <div class="spending-counter">
    <div class="counter-label">Federal Contract Spending &mdash; FY2026</div>
    <div class="counter-number">$202,308,662,098</div>
    <div class="counter-subline">This week added $4.3B.</div>
  </div>
  <div class="header">
    <div class="pub-name">Public Money Tracker</div>
    <div class="mission-tagline">A weekly snapshot of how federal money, lobbying, and legislation actually move &mdash; in under 5 minutes.</div>
    <div class="issue-label">Federal Money Report &mdash; Week of March 16, 2026</div>
    <div class="tagline">No opinion. No commentary. The data speaks.</div>
  </div>
  <div class="headline-block">
    <div class="headline-number">$4.3B</div>
    <div class="headline-context">in federal contracts awarded across 1,000 actions the week of March 16, 2026 &mdash; with one Texas firm capturing more than a quarter of the total.</div>
  </div>
  <div class="section-heading">This Week at a Glance</div>
  <div class="at-a-glance-box">
    <ul class="glance-list">
      <li><span class="glance-label">Biggest contract</span>SPENCER CONSTRUCTION LLC, $1.1B, Department of Homeland Security</li>
      <li><span class="glance-label">Top bill</span>Armed Forces and National Security &mdash; 1 bill tracked in current period</li>
      <li><span class="glance-label">Notable oversight</span>Single audit findings impacting DOT programs &mdash; Inspector General summary</li>
      <li><span class="glance-label">Donor-contract overlap</span>LEIDOS INC., $191K donated, $59.9M received</li>
    </ul>
  </div>
  <div class="section-heading">Key Findings</div>
  <ul class="findings-list">
    <li style="margin-bottom:10px;line-height:1.65;">SPENCER CONSTRUCTION LLC, based in Texas, received a single $1.1B award from the Department of Homeland Security &mdash; the largest contract of the week and equivalent to roughly 26% of this week&#39;s $4.3B in total contract spending.</li>
    <li style="margin-bottom:10px;line-height:1.65;">Q4 2025 lobbying disclosures show $179.5M in total reported spend. Healthcare &amp; Pharmaceuticals accounted for $19.5M of that, with Eli Lilly and Company alone filing $2.2M in lobbying activity during the same period. One anomalous filing excluded from named clients.</li>
    <li style="margin-bottom:10px;line-height:1.65;">Defense &amp; Aerospace logged a full 4/4 industry influence chain this week: $3.1M in donations, $71.1M in Q4 2025 lobbying spend, activity across 4 tracked bills, and $456.0M in contract awards &mdash; all appearing in the same dataset.</li>
    <li style="margin-bottom:10px;line-height:1.65;">Twenty oversight reports are active in the current reporting window. Inspector General findings include a summary of significant single audit findings impacting Department of Transportation programs and a safety-and-soundness review of a failed bank.</li>
  </ul>
  <div class="section-heading">Spotlight</div>
  <div class="spotlight-block">
    Defense &amp; Aerospace presents the most complete influence chain in this week&#39;s data. The sector shows $3.1M in political donations, $71.1M in Q4 2025 lobbying expenditures, lobbying activity touching 4 tracked bills, and $456.0M in federal contract awards &mdash; all appearing in the same observational dataset. This 4/4 chain score is the highest rating tracked by this publication. No causal link is established; the data reflects a co-occurrence pattern across four distinct federal disclosure systems. Among the individual organizations appearing in both donor and contract datasets, Leidos Inc. donated $191K while receiving $59.9M in awards, and California Institute of Technology donated $107K while receiving $163.0M. These figures are drawn entirely from public filings. Full breakdown at publicmoneytracker.com
  </div>
  <div class="section-heading">This Week by the Numbers</div>
  <table class="numbers-table">
    <tbody>
      <tr>
        <td>Federal contracts &amp; grants<span class="time-ctx">(this week)</span></td>
        <td>$4.3B</td>
      </tr>
      <tr>
        <td>Lobbying spend<span class="time-ctx">(Q4 2025, latest)</span></td>
        <td>$179.5M</td>
      </tr>
      <tr>
        <td>Bills introduced<span class="time-ctx">(this week)</span></td>
        <td>30</td>
      </tr>
      <tr>
        <td>IG reports<span class="time-ctx">(this week)</span></td>
        <td>20</td>
      </tr>
    </tbody>
  </table>
  <div class="section-heading">Donor&ndash;Recipient Overlap</div>
  <p style="font-size:12px;color:#888;margin-bottom:10px;font-style:italic;">
    Organizations listed appear in both FEC contribution and USASpending award data.
    Co-occurrence is observational only and does not imply a causal relationship or misconduct.
  </p>
  <table class="overlap-table">
    <thead>
      <tr>
        <th>Organization</th>
        <th>What they do</th>
        <th style="text-align:right;">Donated (FEC)</th>
        <th style="text-align:right;">Received (USASpending)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">AUSTAL USA</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Shipbuilding and maritime defense contractor</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$88</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$175.3M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">CALIFORNIA INSTITUTE OF TECHNOLOGY</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Federally funded aerospace research university</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$107K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$163.0M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">CGI FEDERAL</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Federal IT and government services provider</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$9K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$74.2M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">VERTEX AEROSPACE</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Aerospace maintenance and logistics contractor</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$700</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$68.3M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">LEIDOS INC.</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Defense and government technology contractor</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$191K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$59.9M</td></tr>
    </tbody>
  </table>
  <div class="insight-box">
    <div class="insight-label">&#9998;&nbsp; Editor&rsquo;s Key Insight</div>
    <p style="font-family:'Source Serif 4',Georgia,serif;font-style:italic;font-size:16px;font-weight:300;color:#f5f0e8;line-height:1.75;margin:0;">A single contract accounted for over 25% of all federal contract dollars awarded this week &mdash; a reminder that weekly totals can be driven by a small number of large awards. Contract spending tracked here represents procurement activity only; total federal outlays run roughly $600 billion per week across all programs.</p>
  </div>
</div>
`

export default function Home() {
  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <FederalMoneyBoard />

      <ZipLookup />

      {/* ── SECTION A: Latest Monday Reports ── */}
      <div style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ ...mono, fontSize: '0.7rem', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Latest Monday Reports
          </span>
          <a href="/reports" style={{ ...mono, fontSize: '0.7rem', color: '#8b7355', textDecoration: 'none', letterSpacing: '0.06em' }}>
            View all reports →
          </a>
        </div>

        <div style={{ border: '1px solid #d4c5a9', background: '#f5f0e8', padding: '1.25rem' }}>
          <div style={{ ...mono, fontSize: '8px', color: '#c0392b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
            Monday Report · Free
          </div>
          <div style={{ ...display, fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.35, marginBottom: '0.6rem' }}>
            Defense &amp; Aerospace Logs Full 4/4 Influence Chain
          </div>
          <div style={{ ...mono, fontSize: '9px', color: '#8b7355', marginBottom: '0.35rem' }}>
            March 23, 2026 · Week of March 16
          </div>
          <div style={{ ...mono, fontSize: '10px', color: '#1a1a1a', marginBottom: '0.6rem' }}>
            $4.3B awarded · 1,000 contract actions
          </div>
          <a href="#issue-1" style={{ ...mono, fontSize: '10px', color: '#c0392b', textDecoration: 'none' }}>
            Read full report ↓
          </a>
        </div>
      </div>

      {/* ── SECTION B: Newsletter embed — Issue #1 ── */}
      <div style={{ marginTop: '3rem' }}>
        {/* Section header */}
        <div id="issue-1" style={{
          borderTop: '2px solid #1a1a1a',
          borderBottom: '1px solid #d4c5a9',
          padding: '1rem 0',
          marginBottom: 0,
        }}>
          <div style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.35rem' }}>
            Latest Issue
          </div>
          <div style={{ ...display, fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3 }}>
            Issue #1 — March 23, 2026 · The Federal Money Report
          </div>
        </div>

        {/* Scoped newsletter styles */}
        <style>{NEWSLETTER_CSS}</style>

        {/* Newsletter content */}
        <div className="newsletter-embed" dangerouslySetInnerHTML={{ __html: NEWSLETTER_HTML }} />
      </div>

      {/* ── SECTION C: Download ── */}
      <div style={{
        maxWidth: '620px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        borderTop: '2px solid #1a1a1a',
      }}>
        <div style={{ ...mono, fontSize: '9px', color: '#c0392b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
          Free Download
        </div>
        <div style={{ ...display, fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.75rem', lineHeight: 1.25 }}>
          Want the full data edition?
        </div>
        <p style={{ ...body, fontSize: '0.95rem', color: '#2c2c2c', lineHeight: 1.75, marginBottom: '1.25rem' }}>
          The complete Monday Report includes extended award tables, full sector breakdown, and source citations.
        </p>
        <a
          href="/reports/monday-2026-03-22.docx"
          style={{
            display: 'inline-block',
            background: '#c0392b',
            color: '#ffffff',
            ...mono,
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '0.85rem 2rem',
            textDecoration: 'none',
            marginBottom: '0.75rem',
          }}
        >
          Download Full Report (Free this week)
        </a>
        <div style={{ ...mono, fontSize: '9px', color: '#8b7355' }}>
          Free during launch week. Analyst Access subscription coming soon.
        </div>
      </div>

      {/* ── SECTION D: Substack CTA ── */}
      <div style={{ marginTop: '3rem' }}>
        <SubstackCTA />
      </div>
    </div>
  )
}
