import Link from 'next/link'
import data from '@/public/data/district_roi_top10.json'

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }

// Normalise party field — DB stores both 'R'/'D' and 'Republican'/'Democratic'
function partyInitial(raw: string): string {
  if (!raw) return ''
  const u = raw.trim().toUpperCase()
  if (u === 'R' || u === 'REPUBLICAN') return 'R'
  if (u === 'D' || u === 'DEMOCRAT' || u === 'DEMOCRATIC') return 'D'
  if (u === 'I' || u === 'INDEPENDENT') return 'I'
  return raw.charAt(0).toUpperCase()
}

// ROI: ≥10 → one decimal, <10 → two decimals
function fmtROI(n: number): string {
  return n >= 10 ? `${n.toFixed(1)}x` : `${n.toFixed(2)}x`
}

// Net balance with proper minus sign (U+2212) and colour
function fmtNet(n: number): { label: string; color: string } {
  const abs = Math.abs(n)
  let s: string
  if (abs >= 1e12) s = `$${(abs / 1e12).toFixed(1)}T`
  else if (abs >= 1e9) s = `$${(abs / 1e9).toFixed(1)}B`
  else if (abs >= 1e6) s = `$${(abs / 1e6).toFixed(1)}M`
  else s = `$${abs.toLocaleString('en-US')}`
  return {
    label: n >= 0 ? `+${s}` : `\u2212${s}`,
    color: n >= 0 ? '#2a7a2a' : '#c0392b',
  }
}

// Header columns — must match row grid-template-columns exactly
const COLS = '2.5rem 5rem 1fr 5.5rem 7.5rem'

const thStyle: React.CSSProperties = {
  ...mono,
  background: '#1a1a1a',
  color: '#f5f0e8',
  fontSize: '8px',
  letterSpacing: '2px',
  fontWeight: 500,
  textTransform: 'uppercase',
  padding: '5px 8px',
}

export default function DistrictROILeaderboard() {
  const entries = data.top_10

  // Replace ASCII hyphen-minus in "FY2021-FY2026" with en-dash for display
  const windowLabel = data.data_window.replace('-', '\u2013')

  return (
    <div style={{ overflowX: 'auto' }}>
      <style>{`
        .roi-row { display: grid; grid-template-columns: ${COLS}; text-decoration: none; color: inherit; border-bottom: 1px solid #d4c5a9; min-width: 560px; }
        .roi-row:hover { background: #ede8df !important; }
        .roi-cell { padding: 7px 8px; font-size: 10px; display: flex; align-items: center; overflow: hidden; }
        .roi-cell-r { justify-content: flex-end; }
      `}</style>

      {/* ── Dark section header ── */}
      <div style={{
        background: '#1a1a1a',
        padding: '8px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ ...mono, fontSize: '9px', color: '#f5f0e8', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 500 }}>
          Top 10 Districts by Federal ROI
        </span>
        <span style={{ ...mono, fontSize: '9px', color: '#8b7355', letterSpacing: '2px' }}>
          {windowLabel}
        </span>
      </div>

      {/* ── Column header row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: COLS, borderBottom: '1px solid #d4c5a9', minWidth: '560px' }}>
        <div style={{ ...thStyle, textAlign: 'left' }}>#</div>
        <div style={{ ...thStyle, textAlign: 'left' }}>District</div>
        <div style={{ ...thStyle, textAlign: 'left' }}>Representative</div>
        <div style={{ ...thStyle, textAlign: 'right' }}>ROI</div>
        <div style={{ ...thStyle, textAlign: 'right' }}>Net Balance</div>
      </div>

      {/* ── Data rows — each row is a full-width Link ── */}
      {entries.map((d, i) => {
        const isVacant = d.representative === 'Vacant'
        const slug = d.district.toLowerCase()        // e.g. "tx-33"
        const party = partyInitial(d.party)
        const repLabel = isVacant
          ? 'Vacant'
          : `${d.representative}${party ? ` (${party})` : ''}`
        const net = fmtNet(d.net_balance)
        const evenBg = i % 2 === 1 ? 'rgba(0,0,0,0.02)' : undefined

        return (
          <Link
            key={d.district}
            href={`/districts/${slug}`}
            className="roi-row"
            style={{ background: evenBg }}
          >
            {/* Rank */}
            <div className="roi-cell" style={{ ...mono, color: '#8b7355', fontSize: '9px' }}>
              {d.rank}
            </div>

            {/* District label */}
            <div className="roi-cell" style={{ ...mono, fontWeight: 600, fontSize: '11px', color: '#1a1a1a' }}>
              {d.district}
            </div>

            {/* Representative */}
            <div
              className="roi-cell"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                color: isVacant ? '#8b7355' : '#1a1a1a',
                fontStyle: isVacant ? 'italic' : 'normal',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {repLabel}
            </div>

            {/* ROI ratio */}
            <div className="roi-cell roi-cell-r" style={{ ...mono, fontWeight: 600, fontSize: '11px', color: '#1a1a1a' }}>
              {fmtROI(d.roi_ratio)}
            </div>

            {/* Net balance */}
            <div className="roi-cell roi-cell-r" style={{ ...mono, fontWeight: 600, fontSize: '11px', color: net.color }}>
              {net.label}
            </div>
          </Link>
        )
      })}

      {/* ── Source attribution ── */}
      <div style={{
        ...mono,
        fontSize: '0.7rem',
        color: '#8b7355',
        marginTop: '0.6rem',
        letterSpacing: '0.04em',
      }}>
        Source: USASpending.gov &middot; IRS Statistics of Income &middot; Census ACS &mdash;{' '}
        <a
          href="/methodology"
          style={{ color: '#8b7355', textDecoration: 'underline', textDecorationColor: '#d4c5a9' }}
        >
          publicmoneytracker.com/methodology
        </a>
      </div>
    </div>
  )
}
