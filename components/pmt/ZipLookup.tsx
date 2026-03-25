'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { hasAnalystAccess } from '@/lib/tier'
import type { Tier } from '@/lib/tier'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SingleZipEntry {
  district: string
  state: string
  state_name: string
  rep_name: string | null
  rep_party: string | null
  multi: false
}

interface MultiZipDistrict {
  district: string
  state: string
  state_name: string
  rep_name: string | null
  rep_party: string | null
}

interface MultiZipEntry {
  multi: true
  districts: MultiZipDistrict[]
}

type ZipEntry = SingleZipEntry | MultiZipEntry

interface Senator {
  name: string
  party: string | null
  title: string
  since: number | null
  bioguide: string | null
}

interface StateEntry {
  state_name: string
  senators: Senator[]
}

interface StockTrade {
  date: string
  ticker: string
  amount_range: string
  transaction: string
}

interface DistrictStats {
  total_obligated: number | null
  per_capita: number | null
  national_rank: number | null
  yoy_change: number | null
  roi_ratio: number | null
  top_contractor: string | null
  top_contractor_amount: number | null
  latest_stock_trade: StockTrade | null
  weekly_contracts: number | null
}

interface ResolvedDistrict {
  district: string
  state: string
  state_name: string
  rep_name: string | null
  rep_party: string | null
}

// ─── Module-level JSON cache (loaded once per session) ────────────────────────

let zipCache: Record<string, ZipEntry> | null = null
let senCache: Record<string, StateEntry> | null = null
let statsCache: Record<string, DistrictStats> | null = null

async function getZipData(): Promise<Record<string, ZipEntry>> {
  if (!zipCache) {
    const r = await fetch('/data/zip_to_district.json')
    if (!r.ok) throw new Error('zip_fetch_failed')
    zipCache = (await r.json()) as Record<string, ZipEntry>
  }
  return zipCache
}

async function getSenData(): Promise<Record<string, StateEntry>> {
  if (!senCache) {
    const r = await fetch('/data/state_senators.json')
    if (!r.ok) throw new Error('sen_fetch_failed')
    senCache = (await r.json()) as Record<string, StateEntry>
  }
  return senCache
}

async function getStatsData(): Promise<Record<string, DistrictStats>> {
  if (!statsCache) {
    const r = await fetch('/data/district_stats.json')
    if (!r.ok) throw new Error('stats_fetch_failed')
    statsCache = (await r.json()) as Record<string, DistrictStats>
  }
  return statsCache
}

// ─── Formatters ───────────────────────────────────────────────────────────────

function fmtMoney(n: number | null | undefined): string {
  if (n === null || n === undefined) return '—'
  if (n >= 1e12) return '$' + (n / 1e12).toFixed(1) + 'T'
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(0) + 'M'
  return '$' + Math.round(n).toLocaleString('en-US')
}

function fmtPerCap(n: number | null | undefined): string {
  if (n === null || n === undefined) return '—'
  return '$' + Math.round(n).toLocaleString('en-US')
}

function fmtYoy(n: number | null): { text: string; color: string } {
  if (n === null || n === undefined) return { text: '—', color: '#8b7355' }
  return {
    text: (n >= 0 ? '+' : '') + n.toFixed(1) + '%',
    color: n >= 0 ? '#2a7a3a' : '#c0392b',
  }
}

function partyColor(party: string | null | undefined): string {
  if (!party) return '#1a1a1a'
  const p = party.trim().toUpperCase()
  if (p === 'R') return '#c0392b'
  if (p === 'D') return '#2a5aaa'
  return '#1a1a1a'
}

function partyLabel(party: string | null | undefined): string {
  if (!party) return '—'
  const p = party.trim().toUpperCase()
  if (p === 'R') return 'Republican'
  if (p === 'D') return 'Democrat'
  if (p === 'I') return 'Independent'
  return party
}

function toSlug(district: string): string {
  return district.toLowerCase()
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ZipLookup() {
  const [zip, setZip] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [zipEntry, setZipEntry] = useState<ZipEntry | null>(null)
  const [resolved, setResolved] = useState<ResolvedDistrict | null>(null)
  const [stateEntry, setStateEntry] = useState<StateEntry | null>(null)
  const [stats, setStats] = useState<DistrictStats | null>(null)
  const [tier, setTier] = useState<Tier>('public_access')

  // Detect auth tier — cast defensively; Supabase projection inference
  // can resolve `data` to `never` when RLS blocks the row.
  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('users')
      .select('tier')
      .single()
      .then(({ data }) => {
        const row = data as { tier?: string } | null
        setTier((row?.tier as Tier | undefined) ?? 'public_access')
      })
  }, [])

  const isAnalyst = hasAnalystAccess(tier)

  // Resolve a district after ZIP lookup (also called from multi-select)
  const resolveDistrict = useCallback(async (d: ResolvedDistrict) => {
    try {
      const [senData, statsData] = await Promise.all([getSenData(), getStatsData()])
      setResolved(d)
      setStateEntry(senData[d.state] ?? null)
      setStats(statsData[d.district] ?? null)
    } catch {
      setError('Lookup unavailable. Please try again.')
    }
  }, [])

  const doLookup = useCallback(async () => {
    if (zip.length !== 5) return
    setLoading(true)
    setError(null)
    setZipEntry(null)
    setResolved(null)
    setStateEntry(null)
    setStats(null)

    try {
      // Load all three files concurrently; cached after first call
      const [zipData, senData, statsData] = await Promise.all([
        getZipData(),
        getSenData(),
        getStatsData(),
      ])

      const entry = zipData[zip]
      if (!entry || typeof entry !== 'object' || !('district' in entry || 'districts' in entry)) {
        setError('ZIP code not found in our database.')
        return
      }

      setZipEntry(entry)

      if (!entry.multi) {
        const d: ResolvedDistrict = {
          district:   entry.district,
          state:      entry.state,
          state_name: entry.state_name,
          rep_name:   entry.rep_name,
          rep_party:  entry.rep_party,
        }
        setResolved(d)
        setStateEntry(senData[entry.state] ?? null)
        setStats(statsData[entry.district] ?? null)
      }
    } catch {
      setError('Lookup unavailable. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [zip])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') doLookup()
  }

  const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
  const gridGap: React.CSSProperties = { display: 'grid', gap: '1px', background: '#d4c5a9' }

  const showResult = resolved !== null
  const showMultiSelect = zipEntry?.multi === true && resolved === null

  return (
    <div style={{
      border: '2px solid #1a1a1a',
      background: '#f5f0e8',
      maxWidth: '860px',
      margin: '2rem auto 0',
      overflow: 'hidden',
    }}>

      {/* ── HEADER BAR ─────────────────────────────────────────────────────── */}
      <div style={{
        background: '#1a1a1a',
        padding: '0.6rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.4rem',
      }}>
        <span style={{ ...mono, fontSize: '0.7rem', letterSpacing: '0.12em', color: '#f5f0e8', textTransform: 'uppercase' }}>
          Find Your Federal Money
        </span>
        <span style={{ ...mono, fontSize: '0.62rem', color: '#8b7355', letterSpacing: '0.06em' }}>
          ZIP code → your district → your representatives
        </span>
      </div>

      {/* ── INPUT ROW ──────────────────────────────────────────────────────── */}
      <div style={{
        padding: '0.9rem 1rem',
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center',
        background: '#f5f0e8',
        borderBottom: '1px solid #d4c5a9',
        flexWrap: 'wrap',
      }}>
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="Enter ZIP"
          value={zip}
          onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
          onKeyDown={handleKeyDown}
          style={{
            ...mono,
            fontSize: '1.1rem',
            letterSpacing: '0.15em',
            border: '1.5px solid #1a1a1a',
            padding: '0.5rem 0.75rem',
            background: '#ffffff',
            outline: 'none',
            width: '160px',
            color: '#1a1a1a',
          }}
        />
        <button
          onClick={doLookup}
          disabled={zip.length !== 5 || loading}
          style={{
            ...mono,
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.55rem 1.25rem',
            border: 'none',
            cursor: zip.length === 5 && !loading ? 'pointer' : 'default',
            background: zip.length === 5 && !loading ? '#c0392b' : '#d4c5a9',
            color: zip.length === 5 && !loading ? '#ffffff' : '#8b7355',
            transition: 'background 0.15s, color 0.15s',
          }}
        >
          {loading ? 'Looking Up…' : 'Look Up'}
        </button>
      </div>

      {/* ── ERROR ──────────────────────────────────────────────────────────── */}
      {error && (
        <div style={{
          ...mono,
          fontSize: '0.72rem',
          color: '#c0392b',
          padding: '0.6rem 1rem',
          letterSpacing: '0.04em',
          borderBottom: '1px solid #d4c5a9',
          background: '#f5f0e8',
        }}>
          {error}
        </div>
      )}

      {/* ── MULTI-DISTRICT SELECTION ────────────────────────────────────────── */}
      {showMultiSelect && zipEntry?.multi && (
        <div style={{ padding: '0.9rem 1rem', background: '#f5f0e8', borderBottom: '1px solid #d4c5a9' }}>
          <div style={{ ...mono, fontSize: '0.7rem', color: '#8b7355', letterSpacing: '0.08em', marginBottom: '0.65rem' }}>
            Your ZIP spans two districts — select yours:
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {zipEntry.districts.map(d => (
              <button
                key={d.district}
                onClick={() => resolveDistrict(d)}
                style={{
                  ...mono,
                  padding: '0.65rem 1rem',
                  border: '1.5px solid #1a1a1a',
                  background: '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#1a1a1a',
                  minWidth: '160px',
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.15rem' }}>{d.district}</div>
                <div style={{ fontSize: '0.65rem', color: '#8b7355' }}>{d.state_name}</div>
                {d.rep_name && (
                  <div style={{ fontSize: '0.65rem', color: partyColor(d.rep_party), marginTop: '0.2rem' }}>
                    {d.rep_name}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── RESULT PANE ─────────────────────────────────────────────────────── */}
      {showResult && resolved && (
        <>

          {/* ROW 1: District | Representative */}
          <div style={{ ...gridGap, gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #d4c5a9' }}>

            {/* District cell */}
            <div style={{ background: '#f5f0e8', padding: '0.85rem 1rem' }}>
              <div style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
                Your District
              </div>
              <div style={{ ...mono, fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.1, marginBottom: '0.25rem' }}>
                {resolved.district}
              </div>
              <div style={{ ...mono, fontSize: '0.7rem', color: '#8b7355' }}>
                {resolved.state_name}
              </div>
            </div>

            {/* Rep cell */}
            <div style={{ background: '#f5f0e8', padding: '0.85rem 1rem' }}>
              <div style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
                Your Representative
              </div>
              {resolved.rep_name ? (
                <>
                  <div style={{ ...mono, fontSize: '0.88rem', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.25, marginBottom: '0.2rem' }}>
                    {resolved.rep_name}
                  </div>
                  <div style={{ ...mono, fontSize: '0.72rem', fontWeight: 700, color: partyColor(resolved.rep_party), letterSpacing: '0.06em' }}>
                    {partyLabel(resolved.rep_party)}
                  </div>
                </>
              ) : (
                <div style={{ ...mono, fontSize: '0.72rem', color: '#8b7355', marginTop: '0.2rem' }}>
                  Data not available
                </div>
              )}
            </div>
          </div>

          {/* ROW 2: Senators */}
          {stateEntry && stateEntry.senators.length > 0 ? (
            <div style={{
              ...gridGap,
              gridTemplateColumns: stateEntry.senators.length === 1 ? '1fr' : '1fr 1fr',
            }}>
              {stateEntry.senators.slice(0, 2).map((sen, idx) => (
                <div key={sen.bioguide ?? `sen-${idx}`} style={{ background: '#ede8df', padding: '0.85rem 1rem' }}>
                  <div style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
                    {idx === 0 ? 'Senior Senator' : 'Junior Senator'}
                  </div>
                  <div style={{ ...mono, fontSize: '0.88rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.2rem' }}>
                    {sen.title} {sen.name}
                  </div>
                  <div style={{ ...mono, fontSize: '0.72rem', fontWeight: 700, color: partyColor(sen.party), letterSpacing: '0.06em', marginBottom: '0.15rem' }}>
                    {partyLabel(sen.party)}
                  </div>
                  {sen.since && (
                    <div style={{ ...mono, fontSize: '9px', color: '#8b7355' }}>
                      Since {sen.since}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: '#ede8df', padding: '0.75rem 1rem', borderTop: '1px solid #d4c5a9' }}>
              <div style={{ ...mono, fontSize: '0.7rem', color: '#8b7355' }}>
                Senator data not available for this state.
              </div>
            </div>
          )}

          {/* ROWS 3–4: ANALYST TIER ONLY ─────────────────────────────────── */}
          {isAnalyst && stats && (
            <>

              {/* ROW 3: 2×2 stats grid */}
              <div style={{ ...gridGap, gridTemplateColumns: '1fr 1fr' }}>

                {/* Total Obligated */}
                <div style={{ background: '#f5f0e8', padding: '0.75rem 1rem' }}>
                  <div style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                    Total Obligated FY2025
                  </div>
                  <div style={{ ...mono, fontSize: '15px', color: '#1a1a1a', fontWeight: 500 }}>
                    {fmtMoney(stats.total_obligated)}
                  </div>
                </div>

                {/* National Rank */}
                <div style={{ background: '#f5f0e8', padding: '0.75rem 1rem' }}>
                  <div style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                    National Rank
                  </div>
                  <div style={{ ...mono, fontSize: '15px', color: '#1a1a1a', fontWeight: 500 }}>
                    {stats.national_rank !== null ? `#${stats.national_rank} of 441` : '—'}
                  </div>
                </div>

                {/* Per Capita */}
                <div style={{ background: '#f5f0e8', padding: '0.75rem 1rem' }}>
                  <div style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                    Per Capita
                  </div>
                  <div style={{ ...mono, fontSize: '15px', color: '#1a1a1a', fontWeight: 500 }}>
                    {fmtPerCap(stats.per_capita)}
                  </div>
                </div>

                {/* ROI Ratio + YoY */}
                <div style={{ background: '#f5f0e8', padding: '0.75rem 1rem' }}>
                  <div style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                    ROI Ratio
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <div style={{ ...mono, fontSize: '15px', color: '#1a1a1a', fontWeight: 500 }}>
                      {stats.roi_ratio !== null ? `${stats.roi_ratio.toFixed(2)}x` : '—'}
                    </div>
                    {stats.yoy_change !== null && (
                      <div style={{ ...mono, fontSize: '11px', color: fmtYoy(stats.yoy_change).color }}>
                        YoY {fmtYoy(stats.yoy_change).text}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ROW 4a: Top Contractor */}
              <div style={{ background: '#f5f0e8', padding: '0.75rem 1rem', borderTop: '1px solid #d4c5a9' }}>
                <div style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                  Top Contractor (Latest Week)
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.35rem' }}>
                  <div style={{ ...mono, fontSize: '0.82rem', color: '#1a1a1a', fontWeight: 500 }}>
                    {stats.top_contractor
                      ? stats.top_contractor.charAt(0) + stats.top_contractor.slice(1).toLowerCase()
                      : '—'}
                  </div>
                  <div style={{ ...mono, fontSize: '0.82rem', color: '#1a1a1a' }}>
                    {fmtMoney(stats.top_contractor_amount)}
                  </div>
                </div>
              </div>

              {/* ROW 4b: Latest Stock Trade */}
              <div style={{ background: '#ede8df', padding: '0.75rem 1rem', borderTop: '1px solid #d4c5a9' }}>
                <div style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                  Latest Senator Stock Trade (State)
                </div>
                {stats.latest_stock_trade ? (
                  <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ ...mono, fontSize: '0.72rem', color: '#8b7355' }}>
                      {stats.latest_stock_trade.date}
                    </span>
                    <span style={{ ...mono, fontSize: '0.82rem', color: '#1a1a1a', fontWeight: 600 }}>
                      {stats.latest_stock_trade.ticker !== '--' ? stats.latest_stock_trade.ticker : '—'}
                    </span>
                    <span style={{ ...mono, fontSize: '0.75rem', color: '#1a1a1a' }}>
                      {stats.latest_stock_trade.amount_range}
                    </span>
                    <span style={{ ...mono, fontSize: '0.7rem', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {stats.latest_stock_trade.transaction}
                    </span>
                  </div>
                ) : (
                  <div style={{ ...mono, fontSize: '0.75rem', color: '#8b7355' }}>
                    No recent data
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── CTA ROW ────────────────────────────────────────────────────── */}
          <div style={{ borderTop: '1px solid #d4c5a9' }}>
            {isAnalyst ? (
              <a
                href="/analyst"
                style={{
                  display: 'block',
                  ...mono,
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.9rem 1rem',
                  background: '#1a1a1a',
                  color: '#f5f0e8',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                View Full Dashboard →
              </a>
            ) : (
              <div style={{ display: 'flex', gap: '1px', background: '#d4c5a9' }}>
                <a
                  href={`/analyst/districts/${toSlug(resolved.district)}`}
                  style={{
                    flex: 1,
                    display: 'block',
                    ...mono,
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.9rem 1rem',
                    background: '#1a1a1a',
                    color: '#f5f0e8',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  District Scorecard →
                </a>
                <a
                  href="/account"
                  style={{
                    flex: 1,
                    display: 'block',
                    ...mono,
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.9rem 1rem',
                    background: '#c0392b',
                    color: '#ffffff',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  Get Analyst Access →
                </a>
              </div>
            )}
          </div>

          {/* ── ATTRIBUTION ────────────────────────────────────────────────── */}
          <div style={{
            ...mono,
            fontSize: '9px',
            color: '#8b7355',
            padding: '0.5rem 1rem',
            letterSpacing: '0.04em',
            borderTop: '1px solid #d4c5a9',
            background: '#f5f0e8',
          }}>
            ZIP-to-district: Census Bureau ZCTA · 119th Congress · Data: USASpending.gov
          </div>

        </>
      )}

    </div>
  )
}
