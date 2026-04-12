import { Metadata } from 'next'
import SubstackCTA from '@/components/pmt/SubstackCTA'

export const metadata: Metadata = {
  title: 'Issue #4 — Healthcare & Pharmaceuticals Logs Complete 4/4 Influence Chain',
  description: '$2.8B in federal contracts tracked the week of April 12, 2026. Healthcare & Pharmaceuticals logged a complete 4/4 industry influence chain — donations, lobbying, legislation, and contracts all co-occurring in a single week.',
}

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const display: React.CSSProperties = { fontFamily: 'var(--font-display)' }

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
  .newsletter-embed .footer-disclaimer {
    font-size: 11px;
    color: #888;
    font-style: italic;
    line-height: 1.6;
  }
`

const NEWSLETTER_HTML = `
<div class="wrapper">

  <div class="spending-counter">
    <div class="counter-label">Federal Contract Spending &mdash; FY2026</div>
    <div class="counter-number">$233,220,761,939</div>
    <div class="counter-subline">This week added $2.8B.</div>
  </div>

  <div class="header">
    <div class="pub-name">Public Money Tracker</div>
    <div class="mission-tagline">A weekly snapshot of how federal money, lobbying, and legislation actually move &mdash; in under 5 minutes.</div>
    <div class="issue-label">Federal Money Report &mdash; Week ending April 12, 2026</div>
    <div class="issue-label">Issue #4</div>
    <div class="tagline">No opinion. No commentary. The data speaks.</div>
  </div>

  <div class="headline-block">
    <div class="headline-number">$2.8B</div>
    <div class="headline-context">954 federal awards tracked the week of April 6, 2026 &mdash; with Idaho Environmental Coalition LLC capturing the top slot at $196.2M and Healthcare &amp; Pharmaceuticals logging a complete 4/4 industry influence chain score.</div>
    <div style="font-size:14px;color:#888;font-style:italic;margin-top:8px;">down $1.8B from last week</div>
  </div>

  <div class="section-heading">This Week at a Glance</div>
  <div class="at-a-glance-box">
    <ul class="glance-list">
      <li><span class="glance-label">Biggest contract</span>Idaho Environmental Coalition LLC, $196.2M, Department of Energy</li>
      <li><span class="glance-label">Top bill</span>HR8242 &mdash; Health Coverage Tax Credit Reauthorization Act of 2026</li>
      <li><span class="glance-label">Notable oversight</span>DoD OIG &mdash; Audit of defensive cyberspace operations, U.S. European Command, classified</li>
      <li><span class="glance-label">Notable oversight</span>DOT OIG &mdash; Significant single audit findings impacting DOT programs reviewed</li>
      <li><span class="glance-label">Donor-contract overlap</span>Booz Allen Hamilton, $3K donated, $271.6M received</li>
    </ul>
  </div>

  <div class="section-heading">Key Findings</div>
  <ul class="findings-list">
    <li style="margin-bottom:10px;line-height:1.65;">$196.2M: Idaho Environmental Coalition LLC received the week&rsquo;s largest single award from the Department of Energy, leading all 954 tracked contracts.</li>
    <li style="margin-bottom:10px;line-height:1.65;">$235.3M: Healthcare &amp; Pharmaceuticals captured this week&rsquo;s contracts total while also registering $882K in donations, $17.5M in Q1 2026 lobbying, and 2 active bills &mdash; a complete 4/4 chain score.</li>
    <li style="margin-bottom:10px;line-height:1.65;">$271.6M: Booz Allen Hamilton logged this week&rsquo;s highest combined contract receipts across tracked awards, against $3K in recorded donations appearing in both datasets.</li>
  </ul>

  <div class="section-heading">Top 5 Awards This Week</div>
  <table class="overlap-table">
    <thead>
      <tr>
        <th>Recipient</th>
        <th style="text-align:right;">Amount</th>
        <th>Agency</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">IDAHO ENVIRONMENTAL COALITION LLC</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$196.2M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">Dept. of Energy</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">BOOZ ALLEN HAMILTON INC</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$165.0M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">General Services Administration</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">BECHTEL NATIONAL, INC.</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$120.0M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">Dept. of Energy</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">SHIONOGI INC</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$119.2M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">HHS</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">BRASFIELD &amp; GORRIE LLC</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$95.5M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">DHS</td></tr>
    </tbody>
  </table>

  <div class="section-heading">Spotlight</div>
  <div class="spotlight-block">
    Healthcare &amp; Pharmaceuticals registered a complete 4/4 industry influence chain in this week&rsquo;s observational data &mdash; meaning the sector appears in all four tracked datasets simultaneously. Donations ($882K), lobbying filings ($17.5M in Q1 2026), legislative activity (2 bills), and contract awards ($235.3M) all co-occurred in the same sector within the same seven-day window. Shionogi Inc, a New Jersey-based firm, posted the sector&rsquo;s largest single award at $119.2M from the Department of Health and Human Services. That one contract represents roughly 51 cents of every dollar tracked within the sector this week. The co-occurrence of donor activity, active lobbying filings, introduced legislation, and contract awards in a single sector within a single reporting window is the pattern this publication tracks. Full breakdown at publicmoneytracker.com
  </div>

  <div class="section-heading">This Week by the Numbers</div>
  <table class="numbers-table">
    <tr>
      <td>Federal contracts &amp; grants<span class="time-ctx">(this week)</span></td>
      <td>$2.8B</td>
    </tr>
    <tr>
      <td>Awards tracked<span class="time-ctx">(this week)</span></td>
      <td>954</td>
    </tr>
    <tr>
      <td>Bills introduced<span class="time-ctx">(this week)</span></td>
      <td>16</td>
    </tr>
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
        <th style="text-align:right;">Donated (FEC)<span class="time-ctx">(2025&ndash;2026 cycle-to-date)</span></th>
        <th style="text-align:right;">Received (USASpending)<span class="time-ctx">(this week)</span></th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">BOOZ ALLEN HAMILTON</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Federal IT and management consultant</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$3K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$271.6M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">BRASFIELD &amp; GORRIE, LLC</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Commercial construction contractor</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$1K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$96.9M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">PERATON</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Federal defense IT contractor</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$150</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$50.0M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">LEIDOS INC</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Defense and intelligence systems integrator</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$20K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$45.5M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">SCIENCE APPLICATIONS INTL CORP</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Federal defense technology contractor</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$1K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$44.4M</td></tr>
    </tbody>
  </table>

  <div class="cta-block">
    <div class="cta-primary"><strong>Read the full report at publicmoneytracker.com</strong></div>
    <div class="cta-subtext">
      Includes complete award tables, sector breakdown,<br>
      congressional activity, and oversight findings.
    </div>
  </div>

  <div class="footer">
    <p class="footer-disclaimer">Data sourced from USASpending, FEC, LDA (SOPR), Congress.gov, oversight.gov.
      All co-occurrences are observational. No causal relationship
      between donations, lobbying activity, and federal awards is
      established or implied.</p>
    <p style="margin-top:8px;">
      <a href="https://publicmoneytracker.com" style="color:#888;text-decoration:none;">publicmoneytracker.com</a>
    </p>
  </div>
</div>
`

export default function Issue4() {
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
            Monday Report · Free · Issue #4
          </div>
          <h1 style={{ ...display, fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, marginBottom: '0.75rem' }}>
            Healthcare &amp; Pharmaceuticals Logs Complete 4/4 Influence Chain
          </h1>
          <div style={{ ...mono, fontSize: '9px', color: '#8b7355', marginBottom: '1.25rem' }}>
            Week ending April 12, 2026 · Published April 13, 2026
          </div>

          {/* Stat row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid #d4c5a9' }}>
            {[
              ['$2.8B', 'awarded'],
              ['954', 'contract actions'],
              ['16', 'bills introduced'],
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
            Data: USASpending.gov · FEC · Senate LDA · Congress.gov · Week ending April 12, 2026
          </div>
        </div>
      </div>
    </>
  )
}
