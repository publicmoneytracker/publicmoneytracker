export const metadata = {
  title: 'Methodology',
  description:
    'How Public Money Tracker sources, verifies, and publishes federal spending data. Every figure traces to a primary public source.',
}

const mono:    React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const display: React.CSSProperties = { fontFamily: 'var(--font-display)' }
const body:    React.CSSProperties = { fontFamily: 'var(--font-body)' }

const hr: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid #d4c5a9',
  margin: '2.5rem 0 0',
}

const sectionLabel: React.CSSProperties = {
  ...mono,
  fontSize: '9px',
  color: '#8b7355',
  textTransform: 'uppercase',
  letterSpacing: '3px',
  display: 'block',
  padding: '6px 0',
  borderBottom: '1px solid #d4c5a9',
  marginBottom: '1.25rem',
}

const h2Style: React.CSSProperties = {
  ...display,
  fontSize: '1.35rem',
  fontWeight: 700,
  color: '#1a1a1a',
  marginBottom: '1rem',
  lineHeight: 1.25,
}

const p: React.CSSProperties = {
  ...body,
  fontSize: '1rem',
  color: '#2c2c2c',
  lineHeight: 1.8,
  marginBottom: '1.25rem',
}

const thStyle: React.CSSProperties = {
  ...mono,
  background: '#1a1a1a',
  color: '#f5f0e8',
  fontSize: '8px',
  letterSpacing: '2px',
  fontWeight: 500,
  textTransform: 'uppercase',
  padding: '6px 10px',
  textAlign: 'left',
}

const tdStyle: React.CSSProperties = {
  ...body,
  fontSize: '0.875rem',
  color: '#2c2c2c',
  padding: '6px 10px',
  borderBottom: '1px solid #d4c5a9',
  verticalAlign: 'top',
}

const tdMono: React.CSSProperties = {
  ...mono,
  fontSize: '0.8rem',
  color: '#1a1a1a',
  padding: '6px 10px',
  borderBottom: '1px solid #d4c5a9',
  verticalAlign: 'top',
}

const SOURCES = [
  { source: 'Federal Contracts & Grants', provider: 'USASpending.gov',           coverage: 'FY2020–present',                              freq: 'Weekly' },
  { source: 'Lobbying Disclosures',        provider: 'Senate LDA',                coverage: '2009–present',                                freq: 'Quarterly bulk' },
  { source: 'Registered Federal Vendors',  provider: 'SAM.gov',                   coverage: 'Hundreds of thousands of active registrations', freq: 'Weekly delta' },
  { source: 'Congressional Activity',      provider: 'Congress.gov API v3',       coverage: 'Current congressional session',               freq: 'Weekly' },
  { source: 'Inspector General Reports',   provider: 'Oversight.gov',             coverage: 'Multi-agency',                                freq: 'Weekly' },
  { source: 'GAO Audit Findings',          provider: 'GAO.gov',                   coverage: 'Multi-agency',                                freq: 'Weekly' },
  { source: 'Federal Audit Clearinghouse', provider: 'FAC.gov',                   coverage: 'Single audit findings',                       freq: 'Weekly' },
  { source: 'Congressional Stock Trades',  provider: 'Senate disclosures',        coverage: 'Senators, as filed',                          freq: 'As filed' },
  { source: 'Tax Contribution Estimates',  provider: 'IRS Statistics of Income',  coverage: 'ZIP code level, most recent available vintage', freq: 'Annual' },
  { source: 'District Demographics',       provider: 'U.S. Census Bureau ACS',    coverage: '5-year estimates, most recent available vintage', freq: 'Annual' },
  { source: 'Campaign Finance',            provider: 'FEC bulk data',             coverage: 'Current cycle',                               freq: 'Weekly' },
]

const UPDATE_SCHEDULE = [
  { data: 'Federal contracts & grants',   cadence: 'Weekly (Friday)' },
  { data: 'District ROI rankings',        cadence: 'Weekly (Friday)' },
  { data: 'Lobbying disclosures',         cadence: 'Quarterly' },
  { data: 'Newsletter (Federal Money Report)', cadence: 'Weekly (Monday)' },
  { data: 'Politician Money Reports',     cadence: 'Monthly' },
  { data: 'Census & IRS data',            cadence: 'Annual (when new vintages release)' },
]

export default function Methodology() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>

      <style>{`
        .meth-sources tbody tr:nth-child(even) td { background: rgba(0,0,0,0.02); }
        .meth-schedule tbody tr:nth-child(even) td { background: rgba(0,0,0,0.02); }
      `}</style>

      {/* ── Page header ── */}
      <div style={{ ...mono, fontSize: '0.65rem', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
        Public Money Tracker
      </div>
      <h1 style={{ ...display, fontSize: '2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem', lineHeight: 1.15 }}>
        Methodology
      </h1>
      <p style={{ ...body, fontSize: '1rem', color: '#8b7355', lineHeight: 1.6, marginBottom: '0', fontStyle: 'italic' }}>
        How Public Money Tracker sources, processes, and publishes federal spending data.
      </p>

      {/* ── Section 1: Mission ── */}
      <hr style={hr} />
      <div style={{ marginTop: '1.5rem' }}>
        <span style={sectionLabel}>Mission</span>
        <h2 style={h2Style}>The federal dollar, from appropriation to award.</h2>
        <p style={p}>
          Public Money Tracker follows the federal dollar from congressional appropriation to individual contract
          or grant award. Every figure published on this platform traces to a primary federal data source — a
          government-operated database, a statutory disclosure filing, or an agency bulk file — and every record
          entering the database carries source provenance metadata: the URL or endpoint it was retrieved from and
          the date of retrieval. PMT does not aggregate secondary sources, does not license data from commercial
          vendors, and does not infer figures from proxies when direct data is available.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          The platform is non-partisan and observational. Public Money Tracker does not assert causal relationships,
          assign institutional blame, or editorialize about the significance of any individual transaction or
          pattern. The data is presented as reported by federal agencies. Where estimation methods are applied —
          for tax contribution projections, district demographic attribution, or place-of-performance mapping —
          those methods are described at a high level in this document and in the sources file attached to
          published analytical reports.
        </p>
      </div>

      {/* ── Section 2: Primary Data Sources ── */}
      <hr style={hr} />
      <div style={{ marginTop: '1.5rem' }}>
        <span style={sectionLabel}>Primary Data Sources</span>
        <h2 style={h2Style}>Eleven primary public sources. No aggregators.</h2>

        <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
          <table className="meth-sources" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Source</th>
                <th style={thStyle}>Provider</th>
                <th style={thStyle}>Coverage</th>
                <th style={thStyle}>Update Frequency</th>
              </tr>
            </thead>
            <tbody>
              {SOURCES.map((s) => (
                <tr key={s.source}>
                  <td style={{ ...tdStyle, fontWeight: 500, color: '#1a1a1a' }}>{s.source}</td>
                  <td style={tdMono}>{s.provider}</td>
                  <td style={tdStyle}>{s.coverage}</td>
                  <td style={tdMono}>{s.freq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ ...p, marginBottom: 0 }}>
          Public Money Tracker does not use OpenSecrets, ProPublica, or any secondary aggregator as a primary
          data source. When those organizations are referenced for context in reporting, it is noted explicitly
          alongside the citation.
        </p>
      </div>

      {/* ── Section 3: How the Pipeline Works ── */}
      <hr style={hr} />
      <div style={{ marginTop: '1.5rem' }}>
        <span style={sectionLabel}>How the Pipeline Works</span>
        <h2 style={h2Style}>Collection, processing, and validation on a weekly cycle.</h2>

        <h3 style={{ ...display, fontSize: '1.05rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.6rem' }}>
          Collection
        </h3>
        <p style={p}>
          Automated collectors query federal APIs and download bulk data files on a weekly schedule, running
          each Friday. Every record is stored alongside its source URL, the API endpoint or file path it
          originated from, and a retrieval timestamp. No figure enters the database without provenance metadata.
        </p>
        <p style={p}>
          The collection layer is intentionally narrow in scope: it pulls exactly the fields required for
          analysis and discards fields that are not used. This keeps the pipeline auditable — a reviewer
          can trace any published figure back to a specific row in a specific source file retrieved on a
          specific date.
        </p>

        <h3 style={{ ...display, fontSize: '1.05rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.6rem' }}>
          Processing
        </h3>
        <p style={p}>
          Federal data is inconsistent across agencies. Vendor names vary between SAM.gov registrations and
          USASpending award records. Congressional district assignments shift after redistricting. Dollar figures
          posted to USASpending can be revised months after an award is initially reported, as agencies submit
          modifications to existing contracts. The processing layer normalizes these fields — standardizing
          entity names against SAM.gov canonical registrations, resolving duplicate records created by agency
          re-submissions, and mapping awards to current congressional district boundaries.
        </p>
        <p style={p}>
          Where a direct match is not available — for example, when a ZIP code straddles two congressional
          districts — the processing layer applies a documented attribution rule and records the method used.
          Reports generated from estimated or partially-attributed data include explicit notation in their
          sources file.
        </p>

        <h3 style={{ ...display, fontSize: '1.05rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.6rem' }}>
          Validation
        </h3>
        <p style={{ ...p, marginBottom: 0 }}>
          Before data appears in any published report, automated checks flag records that fall outside expected
          ranges — spending figures that represent a substantial departure from a vendor&apos;s or district&apos;s
          historical baseline, vendor names that do not resolve to an active SAM.gov registration, and
          district assignments that conflict between two data sources covering the same award. Flagged records
          are held for additional review or excluded from published output until the discrepancy is resolved.
        </p>
      </div>

      {/* ── Section 4: District ROI Methodology ── */}
      <hr style={hr} />
      <div style={{ marginTop: '1.5rem' }}>
        <span style={sectionLabel}>District ROI Methodology</span>
        <h2 style={h2Style}>Federal spending received versus federal taxes contributed.</h2>
        <p style={p}>
          The District Return on Investment (ROI) metric compares federal spending received by a congressional
          district against the estimated federal tax contributions originating from that district. The spending
          figure draws from USASpending.gov district-level obligation totals — the same data the federal
          government uses for public accountability reporting — covering contracts and grants with a
          place-of-performance address in the district. The tax contribution figure draws from the IRS
          Statistics of Income ZIP code data, which reports individual income tax liability at the ZIP level,
          mapped to congressional districts using Census Bureau boundary files.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          The ROI ratio is a comparative indicator, not a measure of fiscal efficiency or political performance.
          It is a single-number summary: federal dollars received per dollar contributed in individual income
          taxes. A ratio above 1.0 indicates the district receives more in federal obligations than its
          residents contribute in individual income tax. A ratio below 1.0 indicates the reverse. The ranking is refreshed weekly as USASpending.gov posts new obligation data. The
          tax and demographic figures are updated annually when new IRS and Census vintages are released.
          The specific fiscal years and tax years used in any published ranking are disclosed in the
          accompanying data file at{' '}
          <a href="/districts" style={{ color: '#1a1a1a', textDecoration: 'underline', textDecorationColor: '#d4c5a9' }}>
            publicmoneytracker.com/districts
          </a>.
        </p>
      </div>

      {/* ── Section 5: Known Limitations ── */}
      <hr style={hr} />
      <div style={{ marginTop: '1.5rem' }}>
        <span style={sectionLabel}>Known Limitations</span>
        <h2 style={h2Style}>What this data does not capture.</h2>
        <p style={p}>
          Federal spending data is broad but not comprehensive. The limitations below reflect deliberate
          scope decisions, not gaps to be filled — each is a consequence of how federal agencies collect
          and publish their own data.
        </p>
        <p style={p}>
          Spending and tax figures cover different time windows. USASpending records obligations by federal
          fiscal year (October 1 through September 30). IRS Statistics of Income data is reported by calendar
          tax year. The two figures are not directly comparable on an annual basis; multi-year aggregation
          reduces but does not eliminate this mismatch. The data window used in any specific analysis is
          disclosed in that report.
        </p>
        <p style={p}>
          ZIP-to-district mapping is imprecise at district boundary ZIP codes where a single ZIP code straddles
          two congressional districts. In those cases, PMT applies a consistent geographic attribution rule,
          which introduces a modest margin of error in districts with many boundary ZIPs.
        </p>
        <p style={p}>
          USASpending.gov tracks discretionary federal spending — contracts, grants, direct payments, and
          loans. Mandatory programs including Social Security, Medicare, and Medicaid disbursements are not
          reflected in the spending figures. The ROI metric therefore captures the discretionary portion of
          the federal budget only; mandatory transfer payments flow through separate agency reporting systems
          and are not included in the current pipeline.
        </p>
        <p style={p}>
          The IRS Statistics of Income captures individual income tax liability. It does not include corporate
          income tax, payroll taxes, excise taxes, or estate taxes. The tax contribution figure used in District
          ROI calculations represents individual income tax only.
        </p>
        <p style={p}>
          Place-of-performance attribution means a contract performed at a federal facility — a military
          installation, a research laboratory, or a federal building — is credited to the district where that
          facility is located, not to the district where the contractor&apos;s workforce resides or where the
          contractor is headquartered. Districts with large federal facilities will show higher obligation totals
          than districts where the economic activity from those contracts actually occurs.
        </p>
        <p style={p}>
          FY2026 spending data is partial year-to-date and will continue to increase as agencies post
          additional obligation records through September 30, 2026. Rankings that include FY2026 will shift
          with each weekly refresh.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          Lobbying disclosure data is reported quarterly to the Senate Office of Public Records under the
          Lobbying Disclosure Act. There is an inherent lag between lobbying activity and its appearance in
          the database. Individual contacts, meetings, and communications are not itemized in LDA filings;
          only aggregate semi-annual spending and general issue areas are reported.
        </p>
      </div>

      {/* ── Section 6: Update Schedule ── */}
      <hr style={hr} />
      <div style={{ marginTop: '1.5rem' }}>
        <span style={sectionLabel}>Update Schedule</span>
        <h2 style={h2Style}>When each dataset refreshes.</h2>

        <div style={{ overflowX: 'auto' }}>
          <table className="meth-schedule" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: '60%' }}>Data</th>
                <th style={thStyle}>Refresh Cadence</th>
              </tr>
            </thead>
            <tbody>
              {UPDATE_SCHEDULE.map((row) => (
                <tr key={row.data}>
                  <td style={{ ...tdStyle, color: '#1a1a1a' }}>{row.data}</td>
                  <td style={tdMono}>{row.cadence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 7: Citation ── */}
      <hr style={hr} />
      <div style={{ marginTop: '1.5rem' }}>
        <span style={sectionLabel}>Citation</span>
        <h2 style={h2Style}>How to cite this data.</h2>
        <p style={{ ...p, marginBottom: 0 }}>
          Public Money Tracker is a publication of Sievela LLC. When citing PMT data in research, journalism,
          or policy analysis, please reference{' '}
          <a href="https://publicmoneytracker.com/methodology" style={{ color: '#1a1a1a', textDecoration: 'underline', textDecorationColor: '#d4c5a9' }}>
            publicmoneytracker.com/methodology
          </a>{' '}
          and the specific report or data page from which the figure was drawn. A machine-readable sources
          file accompanies published analytical reports. It lists, for each figure: the exact primary public
          source, the time period covered, the estimation method applied if any, and the value as stored in the
          PMT database at time of publication. PMT is designed to preserve the provenance chain from source
          record to published figure.
        </p>
      </div>

    </div>
  )
}
