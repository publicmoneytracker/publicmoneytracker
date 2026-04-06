import { Metadata } from 'next'
import SubstackCTA from '@/components/pmt/SubstackCTA'

export const metadata: Metadata = {
  title: 'Issue #3 — General Atomics Leads $4.6B Week; Student Loan Servicers Capture $493.3M in Education Awards',
  description: '$4.6B in federal contracts tracked the week of April 5, 2026. General Atomics captured $265.5M from DHS as three student loan servicers totaling $493.3M appeared among the top five Education awards.',
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
    <div class="counter-number">$222,584,763,339</div>
    <div class="counter-subline">This week added $4.6B.</div>
  </div>

  <div class="header">
    <div class="pub-name">Public Money Tracker</div>
    <div class="mission-tagline">A weekly snapshot of how federal money, lobbying, and legislation actually move &mdash; in under 5 minutes.</div>
    <div class="issue-label">Federal Money Report &mdash; Week ending April 5, 2026</div>
    <div class="tagline">No opinion. No commentary. The data speaks.</div>
  </div>

  <div class="headline-block">
    <div class="headline-number">$4.6B</div>
    <div class="headline-context">1,000+ federal awards tracked the week of March 30, 2026 &mdash; with three of the top five contracts flowing to student loan servicers under the Department of Education, and a single drone manufacturer capturing $265.5M from the Department of Homeland Security.</div>
    <div style="font-size:14px;color:#888;font-style:italic;margin-top:8px;">up $720.6M from last week</div>
  </div>

  <div class="section-heading">This Week at a Glance</div>
  <div class="at-a-glance-box">
    <ul class="glance-list">
      <li><span class="glance-label">Biggest contract</span>General Atomics Aeronautical Systems, Inc., $265.5M, Department of Homeland Security</li>
      <li><span class="glance-label">Top bill</span>Top area: Energy &amp; Environment</li>
      <li><span class="glance-label">Notable oversight</span>DoD OIG &mdash; Audit of defensive cyberspace operations, U.S. European Command, classified</li>
      <li><span class="glance-label">Notable oversight</span>DOT OIG &mdash; Significant single audit findings impacting DOT programs reviewed</li>
      <li><span class="glance-label">Donor-contract overlap</span>Triad National Security LLC, $30 donated, $159.1M received</li>
    </ul>
  </div>

  <div class="section-heading">Key Findings</div>
  <ul class="findings-list">
    <li style="margin-bottom:10px;line-height:1.65;">$265.5M: General Atomics Aeronautical Systems received the week&rsquo;s largest award from the Department of Homeland Security, leading all 1,000 tracked contracts.</li>
    <li style="margin-bottom:10px;line-height:1.65;">$493.3M: Three Department of Education awards to Nelnet Servicing, Maximus Education, and Missouri Higher Education Loan Authority co-occurred in this week&rsquo;s top-five contracts.</li>
    <li style="margin-bottom:10px;line-height:1.65;">$536.5M: The Energy &amp; Environment sector logged this week&rsquo;s highest sectoral contract total, alongside $449K in tracked donations &mdash; a 2/4 industry influence chain score.</li>
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
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">GENERAL ATOMICS AERONAUTICAL SYSTEMS, INC.</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$265.5M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">DHS</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">NELNET SERVICING LLC</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$200.3M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">Department of Education</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">MAXIMUS EDUCATION LLC</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$164.8M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">Department of Education</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">NATIONAL TECHNOLOGY &amp; ENGINEERING SOLUTIONS OF SANDIA, LLC</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$147.8M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">Dept. of Energy</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">MISSOURI HIGHER EDUCATION LOAN AUTHORITY</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;font-weight:600;">$128.2M</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;">Department of Education</td></tr>
    </tbody>
  </table>

  <div class="section-heading">Spotlight</div>
  <div class="spotlight-block">
    The week&rsquo;s single most concrete data point is the $265.5M award to General Atomics Aeronautical Systems, Inc., a California-based firm, from the Department of Homeland Security. That one contract equals roughly six cents of every dollar spent across all 1,000 awards tracked this week. General Atomics also appears in the donor-overlap dataset, meaning the organization registered both political donations and federal contract receipts within the same tracked window. Separately, three of this week&rsquo;s top five awards &mdash; totaling $493.3M &mdash; flowed to student loan servicers under a single agency, the Department of Education, a sectoral concentration pattern logged in this week&rsquo;s observational data. Full breakdown at publicmoneytracker.com
  </div>

  <div class="section-heading">This Week by the Numbers</div>
  <table class="numbers-table">
    <tr>
      <td>Federal contracts &amp; grants<span class="time-ctx">(this week)</span></td>
      <td>$4.6B</td>
    </tr>
    <tr>
      <td>Awards tracked<span class="time-ctx">(this week)</span></td>
      <td>1,000+</td>
    </tr>
    <tr>
      <td>Bills introduced<span class="time-ctx">(this week)</span></td>
      <td>0</td>
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
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">TRIAD NATIONAL SECURITY LLC</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Nuclear security laboratory operator</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$30</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$159.1M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">THE BOEING COMPANY</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Defense and aerospace manufacturer</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$21K</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$103.6M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">LAWRENCE LIVERMORE NATIONAL SECURITY,</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Nuclear national laboratory contractor</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$100</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$62.6M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">ACCENTURE FEDERAL SERVICES</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Federal IT services provider</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$79</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$56.6M</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">SAVANNAH RIVER NUCLEAR SOLUTIONS, LLC</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;color:#666;font-style:italic;">Nuclear waste management contractor</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$299</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">$52.6M</td></tr>
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

export default function Issue3() {
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
            Monday Report · Free · Issue #3
          </div>
          <h1 style={{ ...display, fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, marginBottom: '0.75rem' }}>
            General Atomics Leads $4.6B Week; Student Loan Servicers Capture $493.3M in Education Awards
          </h1>
          <div style={{ ...mono, fontSize: '9px', color: '#8b7355', marginBottom: '1.25rem' }}>
            Week ending April 5, 2026 · Published April 6, 2026
          </div>

          {/* Stat row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid #d4c5a9' }}>
            {[
              ['$4.6B', 'awarded'],
              ['1,000+', 'contract actions'],
              ['0', 'bills introduced'],
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
            Data: USASpending.gov · FEC · Senate LDA · Congress.gov · Week ending April 5, 2026
          </div>
        </div>
      </div>
    </>
  )
}
