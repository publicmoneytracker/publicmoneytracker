import { Metadata } from 'next'
import SubstackCTA from '@/components/pmt/SubstackCTA'

export const metadata: Metadata = {
  title: 'Issue #2 — Technology & Telecommunications Logs Full 4/4 Influence Chain',
  description: '$1.9B in federal contracts awarded the week of March 29, 2026. Technology & Telecommunications logged a complete influence chain across donations, lobbying, legislation, and contracts.',
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
    <div class="counter-number">$211,762,201,543</div>
    <div class="counter-subline">This week added $1.9B.</div>
  </div>
  <div class="header">
    <div class="pub-name">Public Money Tracker</div>
    <div class="mission-tagline">A weekly snapshot of how federal money, lobbying, and legislation actually move &mdash; in under 5 minutes.</div>
    <div class="issue-label">Federal Money Report &mdash; Week ending March 29, 2026</div>
    <div class="tagline">No opinion. No commentary. The data speaks.</div>
  </div>
  <div class="headline-block">
    <div class="headline-number">$1.9B</div>
    <div class="headline-context">536 federal awards tracked this week totaling $1.9B &mdash; with Thundercat Technology, LLC capturing $111.0M from the Department of Veterans Affairs as the single largest contract.</div>
    <div style="font-size:14px;color:#888;font-style:italic;margin-top:8px;">down $2.3B from last week</div>
  </div>
  <div class="section-heading">This Week at a Glance</div>
  <div class="at-a-glance-box">
    <ul class="glance-list">
      <li><span class="glance-label">Biggest contract</span>Thundercat Technology, LLC, $111.0M, Department of Veterans Affairs</li>
      <li><span class="glance-label">Top bill</span>HRES1142 &mdash; Disposition of Senate amendment to consolidated appropriations bill</li>
      <li><span class="glance-label">Notable oversight</span>Inspector General &mdash; Naval Supply Systems Command inventory items with no demand in 5 years</li>
      <li><span class="glance-label">Notable oversight</span>Inspector General &mdash; Army management of Bradley Fighting Vehicle repairs flagged for audit</li>
      <li><span class="glance-label">Donor-contract overlap</span>California Institute of Technology, $5K donated, $113.0M received</li>
    </ul>
  </div>
  <div class="section-heading">Key Findings</div>
  <ul class="findings-list">
    <li style="margin-bottom:10px;line-height:1.65;">$111.0M: Thundercat Technology, LLC received this week&rsquo;s largest award from the Department of Veterans Affairs, leading all 536 tracked contracts.</li>
    <li style="margin-bottom:10px;line-height:1.65;">$400.2M: Technology &amp; Telecommunications logged a 4/4 industry influence chain score &mdash; donations, lobbying, legislative activity, and contract awards all co-occurred this week.</li>
    <li style="margin-bottom:10px;line-height:1.65;">$113.0M: California Institute of Technology received this week&rsquo;s largest donor-overlap total &mdash; the organization also appears in the political donations dataset.</li>
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
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">THUNDERCAT TECHNOLOGY, LLC</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$111.0M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">Dept. of Veterans Affairs</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">THE JOHNS HOPKINS UNIVERSITY APPLIED PHYSICS LABORATORY LLC</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$100.5M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">NASA</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">HERITAGE HEALTH SOLUTIONS, INC.</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$67.7M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">DoJ</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">EMERGENT BIOSOLUTIONS CANADA INC</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$53.7M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">HHS</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">NATIONAL GOVERNMENT SERVICES, INC.</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$52.1M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">HHS</td></tr>
    </tbody>
  </table>
  <div class="section-heading">Spotlight</div>
  <div class="spotlight-block">
    Technology &amp; Telecommunications registered a complete 4/4 industry influence chain in this week&rsquo;s observational data &mdash; meaning the sector appears simultaneously in all four tracked datasets: political donations ($4.0M), Q4 2025 lobbying filings ($29.5M), introduced legislation (one bill tracked), and federal contract awards ($400.2M). That $400.2M represents roughly 21 cents of every dollar issued across this week&rsquo;s $1.9B in total awards. The sector&rsquo;s Q4 2025 lobbying figure of $29.5M places it among the most active in the current quarterly period. No causal relationship is asserted; the 4/4 score reflects co-occurrence across datasets within a single seven-day window.
  </div>
  <div class="section-heading">This Week by the Numbers</div>
  <table class="numbers-table">
    <tbody>
      <tr>
        <td>Federal contracts &amp; grants<span class="time-ctx">(this week)</span></td>
        <td>$1.9B</td>
      </tr>
      <tr>
        <td>Awards tracked<span class="time-ctx">(this week)</span></td>
        <td>536</td>
      </tr>
      <tr>
        <td>Bills introduced<span class="time-ctx">(this week)</span></td>
        <td>42</td>
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
        <th style="text-align:right;">Donated (FEC)<span class="time-ctx">(2025&ndash;2026 cycle-to-date)</span></th>
        <th style="text-align:right;">Received (USASpending)<span class="time-ctx">(this week)</span></th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">CALIFORNIA INSTITUTE OF TECHNOLOGY</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Research and academic contractor</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$5K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$113.0M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">BOOZ ALLEN HAMILTON</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Federal management consulting firm</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$36K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$61.0M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">INTERNATIONAL BUSINESS MACHINES CORP.</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">IT services and technology provider</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$3K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$38.2M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">BATTELLE MEMORIAL INSTITUTE</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Scientific research and development organization</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$1K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$23.7M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">RAYTHEON COMPANY</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Defense systems manufacturer</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$8K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$23.3M</td></tr>
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

export default function Issue2() {
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
            Monday Report · Free · Issue #2
          </div>
          <h1 style={{ ...display, fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, marginBottom: '0.75rem' }}>
            Technology &amp; Telecommunications Logs Full 4/4 Influence Chain
          </h1>
          <div style={{ ...mono, fontSize: '9px', color: '#8b7355', marginBottom: '1.25rem' }}>
            Week ending March 29, 2026 · Published March 30, 2026
          </div>

          {/* Stat row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid #d4c5a9' }}>
            {[
              ['$1.9B', 'awarded'],
              ['536', 'contract actions'],
              ['42', 'bills introduced'],
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
            Data: USASpending.gov · FEC · Senate LDA · Congress.gov · Week ending March 29, 2026
          </div>
        </div>
      </div>
    </>
  )
}
