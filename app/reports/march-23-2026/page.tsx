import { Metadata } from 'next'
import Link from 'next/link'
import SubstackCTA from '@/components/pmt/SubstackCTA'

export const metadata: Metadata = {
  title: 'Issue #1 — Defense & Aerospace Logs Full 4/4 Influence Chain',
  description: '$4.3B in federal contracts awarded the week of March 22, 2026. Defense & Aerospace logged a complete influence chain across donations, lobbying, legislation, and contracts.',
}

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const display: React.CSSProperties = { fontFamily: 'var(--font-display)' }
const body: React.CSSProperties = { fontFamily: 'var(--font-body)' }

const NEWSLETTER_CSS = `
  .newsletter-embed * { box-sizing: border-box; }
  .newsletter-embed .wrapper {
    max-width: 620px;
    margin: 0 auto;
    padding: 40px 0;
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
  .newsletter-embed .cta-block {
    text-align: center;
    padding: 32px 0;
    border-top: 1px solid #ddd4c4;
    border-bottom: 1px solid #ddd4c4;
    margin: 36px 0;
  }
  .newsletter-embed .footer {
    font-size: 11px;
    color: #888;
    text-align: center;
    line-height: 1.8;
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
    <div class="headline-context">The federal government issued $4.3B across 1,000 contracts the week of March 16, 2026 &mdash; with a single Texas construction firm capturing more than one dollar in four.</div>
  </div>
  <div class="section-heading">This Week at a Glance</div>
  <div class="at-a-glance-box">
    <ul class="glance-list">
      <li><span class="glance-label">Biggest contract</span>SPENCER CONSTRUCTION LLC, $1.1B, Department of Homeland Security</li>
      <li><span class="glance-label">Top bill</span>No top bills filed &mdash; 26 introduced bills fall under broad &lsquo;Other&rsquo; policy area</li>
      <li><span class="glance-label">Notable oversight</span>IG flags failed bank safety review and DOT single audit findings</li>
      <li><span class="glance-label">Donor-contract overlap</span>LEIDOS INC., $228K donated, $59.9M received</li>
    </ul>
  </div>
  <div class="section-heading">Key Findings</div>
  <ul class="findings-list">
    <li style="margin-bottom:10px;line-height:1.65;">SPENCER CONSTRUCTION LLC received $1.1B from the Department of Homeland Security this week &mdash; a single award representing roughly 26% of all $4.3B in contracts tracked across 1,000 awards.</li>
    <li style="margin-bottom:10px;line-height:1.65;">The Defense and Aerospace sector logged a full 4/4 influence chain score in Q4 2025: $3.8M in donations, $71.1M in lobbying spend, activity across 2 bills, and $456.0M in contract awards all appear in the same dataset.</li>
    <li style="margin-bottom:10px;line-height:1.65;">Healthcare and Pharmaceuticals ranked second in Q4 2025 lobbying spend at $19.5M, with Eli Lilly alone filing $2.2M &mdash; as drug pricing legislation remains an active area on Capitol Hill. One anomalous filing excluded from named clients.</li>
    <li style="margin-bottom:10px;line-height:1.65;">Inspectors General flagged 20 oversight findings this week, including a limited review of a failed bank and a quality control review of the Surface Transportation Board&rsquo;s audited financials &mdash; spanning financial safety and transportation programs.</li>
  </ul>
  <div class="section-heading">Spotlight</div>
  <div class="spotlight-block">
    The week&rsquo;s single most striking data point is the $1.1B award to Spencer Construction LLC, a Texas firm, from the Department of Homeland Security. That one contract equals roughly 26 cents of every dollar spent across all 1,000 awards tracked this week. For context, the next four largest recipients &mdash; Austal USA ($175.3M), California Institute of Technology ($134.3M), Salus Worldwide Solutions Corp. ($124.9M), and New York State Office of Temporary and Disability Assistance ($122.1M) &mdash; would need to be combined and still fall short. Observational data shows Austal USA appears in both the contract and donor datasets, having received $175.3M while donating $88 to federal candidates. No causal link is drawn &mdash; these are co-occurrences in public records.
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
        <td>26</td>
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
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">AUSTAL USA</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Defense shipbuilding contractor</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$88</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$175.3M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">CALIFORNIA INSTITUTE OF TECHNOLOGY</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Federal research and space sciences institution</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$108K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$163.0M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">CGI FEDERAL</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Federal IT services provider</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$9K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$74.2M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">VERTEX AEROSPACE</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Aerospace and defense services firm</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$2K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$68.3M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">LEIDOS INC.</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Defense and intelligence systems contractor</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$228K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$59.9M</td></tr>
    </tbody>
  </table>
  <div class="insight-box">
    <div class="insight-label">&#9998;&nbsp; Editor&rsquo;s Key Insight</div>
    <p style="font-family:'Source Serif 4',Georgia,serif;font-style:italic;font-size:16px;font-weight:300;color:#f5f0e8;line-height:1.75;margin:0;">A single contract accounted for over 25% of all federal contract dollars awarded this week &mdash; a reminder that weekly totals can be driven by a small number of large awards. Contract spending tracked here represents procurement activity only; total federal outlays run roughly $600 billion per week across all programs.</p>
  </div>
</div>
`

export default function Issue1() {
  return (
    <>
      <style>{NEWSLETTER_CSS}</style>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '1.5rem' }}>
          <a href="/reports" style={{ ...mono, fontSize: '9px', color: '#8b7355', textDecoration: 'none', letterSpacing: '0.06em' }}>
            ← All Reports
          </a>
        </div>

        {/* Page header */}
        <div style={{ borderBottom: '2px solid #1a1a1a', marginBottom: '2rem', paddingBottom: '1.5rem' }}>
          <div style={{ ...mono, fontSize: '9px', color: '#c0392b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
            Monday Report · Free · Issue #1
          </div>
          <h1 style={{ ...display, fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, marginBottom: '0.75rem' }}>
            Defense &amp; Aerospace Logs Full 4/4 Influence Chain
          </h1>
          <div style={{ ...mono, fontSize: '9px', color: '#8b7355', marginBottom: '1.25rem' }}>
            Week ending March 22, 2026 · Published March 23, 2026
          </div>

          {/* Stat row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #d4c5a9' }}>
            {[
              ['$4.3B', 'awarded'],
              ['536', 'actions'],
              ['42', 'bills introduced'],
              ['20', 'IG reports'],
            ].map(([val, label]) => (
              <div
                key={label}
                style={{
                  padding: '0.75rem',
                  borderRight: '1px solid #d4c5a9',
                  textAlign: 'center',
                }}
              >
                <div style={{ ...display, fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>
                  {val}
                </div>
                <div style={{ ...mono, fontSize: '8px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.25rem' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter content */}
        <div className="newsletter-embed" dangerouslySetInnerHTML={{ __html: NEWSLETTER_HTML }} />

        {/* Footer */}
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #d4c5a9' }}>
          <SubstackCTA />
          <div style={{ ...mono, fontSize: '9px', color: '#8b7355', marginTop: '1.5rem' }}>
            Data: USASpending.gov · FEC · Senate LDA · Congress.gov · Week ending March 22, 2026
          </div>
        </div>
      </div>
    </>
  )
}
