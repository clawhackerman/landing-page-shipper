import { NextRequest, NextResponse } from 'next/server'
import { ScanResult } from '../../../../types/airtable'

// AIRTABLE_BASE_ID may be "appXXX/tblXXX" — use only the base ID part
const baseId = (process.env.AIRTABLE_BASE_ID ?? '').split('/')[0]
const AIRTABLE_BASE = `https://api.airtable.com/v0/${baseId}`

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  }
}

async function airtablePost(table: string, fields: Record<string, unknown>) {
  const res = await fetch(`${AIRTABLE_BASE}/${encodeURIComponent(table)}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ fields }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Airtable error (${table}): ${err}`)
  }
  return res.json() as Promise<{ id: string }>
}

export async function POST(request: NextRequest) {
  try {
    const { result }: { result: ScanResult } = await request.json()

    // 1. Create Client record first — all other tables link to it
    const clientRecord = await airtablePost('Clients', {
      FieldTypeSlug: result.client.slug.value,
      'Campaign Name': result.client.campaignName.value,
      'Company Name': result.client.companyName.value,
      'Website URL': result.client.websiteUrl.value,
    })
    const clientId = clientRecord.id

    // 2. Copy
    await airtablePost('Copy', {
      Client: [clientId],
      Headline: result.copy.headline.value,
      Subheadline: result.copy.subheadline.value,
      'CTA Text': result.copy.ctaText.value,
      'Problem Statement': result.copy.problemStatement.value,
      'Outcome Statement': result.copy.outcomeStatement.value,
    })

    // 3. Services
    for (const svc of result.services) {
      await airtablePost('Services', {
        Client: [clientId],
        Title: svc.title.value,
        Description: svc.description.value,
        OrderNumber: svc.orderNumber.value,
      })
    }

    // 4. Process Steps
    for (const step of result.processSteps) {
      await airtablePost('Process Steps', {
        Client: [clientId],
        'Step Title': step.stepTitle.value,
        'Step Description': step.stepDescription.value,
        OrderNumber: step.orderNumber.value,
      })
    }

    // 5. Testimonials
    for (const t of result.testimonials) {
      await airtablePost('Testimonials', {
        Client: [clientId],
        Quote: t.quote.value,
        Name: t.name.value,
        'Job Title': t.jobTitle.value,
        Company: t.company.value,
      })
    }

    // 6. Case Studies
    for (const cs of result.caseStudies) {
      await airtablePost('Case Studies', {
        Client: [clientId],
        'Client Label': cs.clientLabel.value,
        'Key Stat': cs.keyStat.value,
        Description: cs.description.value,
      })
    }

    // 7. FAQs
    for (const faq of result.faqs) {
      await airtablePost('FAQs', {
        Client: [clientId],
        Question: faq.question.value,
        Answer: faq.answer.value,
        OrderNumber: faq.orderNumber.value,
      })
    }

    return NextResponse.json({ ok: true, clientId })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
