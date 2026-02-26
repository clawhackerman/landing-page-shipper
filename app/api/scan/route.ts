import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import Anthropic from '@anthropic-ai/sdk'
import { ScanResult } from '../../../types/airtable'

const client = new Anthropic()

async function scrape(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LandingPageScanner/1.0)' },
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const html = await res.text()
  const $ = cheerio.load(html)
  $('script, style, noscript, svg, img').remove()
  return $('body').text().replace(/\s+/g, ' ').trim().slice(0, 12000)
}

const SYSTEM_PROMPT = `You are a landing page data extractor. Given page text, extract structured data for a CRM.
Return ONLY valid JSON matching the schema below. Score each field:
- "found": clearly present verbatim on the page
- "inferred": present but required interpretation
- "missing": not found on the page (set value to null)

Schema:
{
  "client": {
    "slug": { "value": "url-slug-derived-from-domain", "score": "found|inferred|missing" },
    "campaignName": { "value": "Campaign or page name", "score": "..." },
    "companyName": { "value": "Company name", "score": "..." },
    "websiteUrl": { "value": "https://...", "score": "..." }
  },
  "copy": {
    "headline": { "value": "...", "score": "..." },
    "subheadline": { "value": "...", "score": "..." },
    "ctaText": { "value": "...", "score": "..." },
    "problemStatement": { "value": "Core problem the product solves", "score": "..." },
    "outcomeStatement": { "value": "Key outcome or result promised", "score": "..." }
  },
  "services": [
    { "title": { "value": "...", "score": "..." }, "description": { "value": "...", "score": "..." }, "orderNumber": { "value": 1, "score": "found" } }
  ],
  "processSteps": [
    { "stepTitle": { "value": "...", "score": "..." }, "stepDescription": { "value": "...", "score": "..." }, "orderNumber": { "value": 1, "score": "found" } }
  ],
  "testimonials": [
    { "quote": { "value": "...", "score": "..." }, "name": { "value": "...", "score": "..." }, "jobTitle": { "value": "...", "score": "..." }, "company": { "value": "...", "score": "..." } }
  ],
  "caseStudies": [
    { "clientLabel": { "value": "...", "score": "..." }, "keyStat": { "value": "...", "score": "..." }, "description": { "value": "...", "score": "..." } }
  ],
  "faqs": [
    { "question": { "value": "...", "score": "..." }, "answer": { "value": "...", "score": "..." }, "orderNumber": { "value": 1, "score": "found" } }
  ]
}`

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'url is required' }, { status: 400 })
    }

    const pageText = await scrape(url)

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `URL: ${url}\n\nPage content:\n${pageText}`,
        },
      ],
    })

    const raw = message.content[0].type === 'text' ? message.content[0].text : ''
    const json = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
    const result: ScanResult = JSON.parse(json)

    return NextResponse.json({ result })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
