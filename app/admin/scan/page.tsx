'use client'

import { useState } from 'react'
import { ScanResult, FieldScore } from '../../../types/airtable'

type ScanState = 'idle' | 'scanning' | 'done' | 'writing' | 'written' | 'error'

function scoreColor(score: FieldScore) {
  if (score === 'missing') return 'bg-amber-50 border-amber-200 text-amber-800'
  return 'bg-green-50 border-green-200 text-green-800'
}

function ScoreBadge({ score }: { score: FieldScore }) {
  const colors =
    score === 'missing'
      ? 'bg-amber-100 text-amber-700'
      : score === 'inferred'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-green-100 text-green-700'
  return (
    <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${colors}`}>
      {score}
    </span>
  )
}

interface FieldRowProps {
  label: string
  value: string | number | null
  score: FieldScore
}

function FieldRow({ label, value, score }: FieldRowProps) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded border ${scoreColor(score)}`}>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-0.5">{label}</p>
        <p className="text-sm break-words">{value ?? '—'}</p>
      </div>
      <ScoreBadge score={score} />
    </div>
  )
}

function flattenResult(result: ScanResult): { populated: FieldRowProps[]; missing: FieldRowProps[] } {
  const populated: FieldRowProps[] = []
  const missing: FieldRowProps[] = []

  function add(label: string, value: string | number | null, score: FieldScore) {
    const row = { label, value, score }
    score === 'missing' ? missing.push(row) : populated.push(row)
  }

  add('Slug', result.client.slug.value, result.client.slug.score)
  add('Campaign Name', result.client.campaignName.value, result.client.campaignName.score)
  add('Company Name', result.client.companyName.value, result.client.companyName.score)
  add('Website URL', result.client.websiteUrl.value, result.client.websiteUrl.score)
  add('Headline', result.copy.headline.value, result.copy.headline.score)
  add('Subheadline', result.copy.subheadline.value, result.copy.subheadline.score)
  add('CTA Text', result.copy.ctaText.value, result.copy.ctaText.score)
  add('Problem Statement', result.copy.problemStatement.value, result.copy.problemStatement.score)
  add('Outcome Statement', result.copy.outcomeStatement.value, result.copy.outcomeStatement.score)

  result.services.forEach((s, i) => {
    add(`Service ${i + 1} Title`, s.title.value, s.title.score)
    add(`Service ${i + 1} Description`, s.description.value, s.description.score)
  })
  result.processSteps.forEach((s, i) => {
    add(`Step ${i + 1} Title`, s.stepTitle.value, s.stepTitle.score)
    add(`Step ${i + 1} Description`, s.stepDescription.value, s.stepDescription.score)
  })
  result.testimonials.forEach((t, i) => {
    add(`Testimonial ${i + 1} Quote`, t.quote.value, t.quote.score)
    add(`Testimonial ${i + 1} Name`, t.name.value, t.name.score)
    add(`Testimonial ${i + 1} Job Title`, t.jobTitle.value, t.jobTitle.score)
    add(`Testimonial ${i + 1} Company`, t.company.value, t.company.score)
  })
  result.caseStudies.forEach((cs, i) => {
    add(`Case Study ${i + 1} Label`, cs.clientLabel.value, cs.clientLabel.score)
    add(`Case Study ${i + 1} Key Stat`, cs.keyStat.value, cs.keyStat.score)
    add(`Case Study ${i + 1} Description`, cs.description.value, cs.description.score)
  })
  result.faqs.forEach((f, i) => {
    add(`FAQ ${i + 1} Question`, f.question.value, f.question.score)
    add(`FAQ ${i + 1} Answer`, f.answer.value, f.answer.score)
  })

  return { populated, missing }
}

export default function AdminScanPage() {
  const [url, setUrl] = useState('')
  const [state, setState] = useState<ScanState>('idle')
  const [result, setResult] = useState<ScanResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleScan(e: React.FormEvent) {
    e.preventDefault()
    setState('scanning')
    setResult(null)
    setErrorMsg('')
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Scan failed')
      setResult(data.result)
      setState('done')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error')
      setState('error')
    }
  }

  async function handleWrite() {
    if (!result) return
    setState('writing')
    setErrorMsg('')
    try {
      const res = await fetch('/api/scan/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Write failed')
      setState('written')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error')
      setState('error')
    }
  }

  const { populated, missing } = result ? flattenResult(result) : { populated: [], missing: [] }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Landing Page Scanner</h1>
          <p className="text-sm text-gray-500 mt-1">
            Scrape a URL and extract structured data for Airtable.
          </p>
        </div>

        <form onSubmit={handleScan} className="flex gap-3">
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={state === 'scanning' || state === 'writing'}
            className="bg-blue-600 text-white rounded px-5 py-2 text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {state === 'scanning' ? 'Scanning…' : 'Scan'}
          </button>
        </form>

        {state === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded p-4 text-sm">
            {errorMsg}
          </div>
        )}

        {state === 'written' && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded p-4 text-sm font-medium">
            ✓ Written to Airtable successfully.
          </div>
        )}

        {result && state !== 'written' && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <span className="text-green-700 font-semibold">{populated.length} populated</span>
                {' · '}
                <span className="text-amber-700 font-semibold">{missing.length} missing</span>
              </p>
              <button
                onClick={handleWrite}
                disabled={state === 'writing'}
                className="bg-emerald-600 text-white rounded px-5 py-2 text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50"
              >
                {state === 'writing' ? 'Writing…' : 'Write to Airtable'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h2 className="text-sm font-bold text-green-800 uppercase tracking-wide">
                  Populated ({populated.length})
                </h2>
                {populated.map((f, i) => (
                  <FieldRow key={i} {...f} />
                ))}
              </div>
              <div className="space-y-2">
                <h2 className="text-sm font-bold text-amber-800 uppercase tracking-wide">
                  Missing ({missing.length})
                </h2>
                {missing.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No missing fields.</p>
                ) : (
                  missing.map((f, i) => <FieldRow key={i} {...f} />)
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
