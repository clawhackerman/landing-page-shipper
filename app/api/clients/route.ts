import { NextResponse } from 'next/server'
import { fetchAllClients, fetchAllCopy, AirtableClientFields } from '../../../lib/airtable'

export interface ClientSummary {
  id: string
  slug: string
  companyName: string
  status: string
  completion: number
  missing: string[]
  copyRecordId: string | null
}

function scoreClient(
  fields: AirtableClientFields,
  copyFields: Record<string, string | undefined> | null
): { completion: number; missing: string[] } {
  const checks: Array<[string, boolean]> = [
    ['Slug', !!fields.FieldTypeSlug],
    ['Company Name', !!fields['Company Name']],
    ['Primary Color', !!fields['Primary Color']],
    ['Font Preference', !!fields['Font Preference']],
    ['Headline', !!copyFields?.Headline],
    ['Subheadline', !!copyFields?.Subheadline],
    ['CTA Text', !!copyFields?.['CTA Text']],
    ['Problem Statement', !!copyFields?.['Problem Statement']],
    ['Outcome Statement', !!copyFields?.['Outcome Statement']],
    ['≥1 Service', (fields.Services?.length ?? 0) >= 1],
    ['≥2 Process Steps', (fields['Process Steps']?.length ?? 0) >= 2],
    ['≥1 Testimonial', (fields.Testimonials?.length ?? 0) >= 1],
    ['≥1 FAQ', (fields.FAQs?.length ?? 0) >= 1],
  ]

  const passed = checks.filter(([, ok]) => ok).length
  const missing = checks.filter(([, ok]) => !ok).map(([label]) => label)
  return { completion: Math.round((passed / checks.length) * 100), missing }
}

export async function GET() {
  try {
    const [clients, allCopy] = await Promise.all([fetchAllClients(), fetchAllCopy()])

    // Index copy records by their Airtable record ID
    const copyById = Object.fromEntries(allCopy.map(r => [r.id, r.fields]))

    const summaries: ClientSummary[] = clients.map(client => {
      const copyRecordId = client.fields.Copy?.[0] ?? null
      const copyFields = copyRecordId ? (copyById[copyRecordId] as Record<string, string | undefined>) : null
      const { completion, missing } = scoreClient(client.fields, copyFields)

      return {
        id: client.id,
        slug: client.fields.FieldTypeSlug ?? '',
        companyName: client.fields['Company Name'] ?? client.fields.FieldTypeSlug ?? client.id,
        status: client.fields.Status ?? '',
        completion,
        missing,
        copyRecordId,
      }
    })

    // Sort by completion descending
    summaries.sort((a, b) => b.completion - a.completion)

    return NextResponse.json({ clients: summaries })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
