const BASE_ID = (process.env.AIRTABLE_BASE_ID ?? '').split('/')[0]
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`

function headers() {
  return {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  }
}

export interface AirtableRecord<T = Record<string, unknown>> {
  id: string
  fields: T
}

export interface AirtableListResponse<T> {
  records: AirtableRecord<T>[]
  offset?: string
}

export type AirtableClientFields = {
  FieldTypeSlug?: string
  'Campaign Name'?: string
  'Company Name'?: string
  'Website URL'?: string
  'Primary Color'?: string
  'Secondary Color'?: string
  'Font Preference'?: string
  'Tone of Voice'?: string
  'Target Keywords'?: string
  Status?: string
  Notes?: string
  Copy?: string[]
  Services?: string[]
  'Process Steps'?: string[]
  Testimonials?: string[]
  'Case Studies'?: string[]
  FAQs?: string[]
}

export type AirtableCopyFields = {
  Headline?: string
  Subheadline?: string
  'CTA Text'?: string
  'Problem Statement'?: string
  'Outcome Statement'?: string
  Client?: string[]
}

export type AirtableServiceFields = {
  Title?: string
  Description?: string
  OrderNumber?: number
  Client?: string[]
}

export type AirtableProcessStepFields = {
  'Step Title'?: string
  'Step Description'?: string
  OrderNumber?: number
  Client?: string[]
}

export type AirtableTestimonialFields = {
  Quote?: string
  Name?: string
  'Job Title'?: string
  Company?: string
  Client?: string[]
}

export type AirtableCaseStudyFields = {
  'Client Label'?: string
  'Key Stat'?: string
  Description?: string
  Client?: string[]
}

export type AirtableFAQFields = {
  Question?: string
  Answer?: string
  OrderNumber?: number
  Client?: string[]
}

async function fetchAll<T>(table: string, params = ''): Promise<AirtableRecord<T>[]> {
  const records: AirtableRecord<T>[] = []
  let offset: string | undefined

  do {
    const qs = new URLSearchParams()
    if (offset) qs.set('offset', offset)
    if (params) params.split('&').forEach(p => {
      const [k, v] = p.split('=')
      if (k && v) qs.set(k, decodeURIComponent(v))
    })

    const res = await fetch(
      `${BASE_URL}/${encodeURIComponent(table)}?${qs.toString()}`,
      { headers: headers() }
    )
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Airtable error (${table}): ${err}`)
    }
    const data: AirtableListResponse<T> = await res.json()
    records.push(...data.records)
    offset = data.offset
  } while (offset)

  return records
}

export async function fetchAllClients() {
  return fetchAll<AirtableClientFields>('Clients')
}

export async function fetchAllCopy() {
  return fetchAll<AirtableCopyFields>('Copy')
}

export async function fetchRecordById<T>(table: string, id: string): Promise<AirtableRecord<T>> {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(table)}/${id}`, { headers: headers() })
  if (!res.ok) throw new Error(`Airtable error fetching ${table}/${id}: ${await res.text()}`)
  return res.json()
}

export async function fetchByClientId<T>(table: string, clientId: string, sort = true): Promise<AirtableRecord<T>[]> {
  const formula = encodeURIComponent(`FIND("${clientId}", ARRAYJOIN({Client}, ",")) > 0`)
  const sortParams = sort ? '&sort[0][field]=OrderNumber&sort[0][direction]=asc' : ''
  return fetchAll<T>(table, `filterByFormula=${formula}${sortParams}`)
}

export async function patchRecord(table: string, id: string, fields: Record<string, unknown>) {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(table)}/${id}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify({ fields }),
  })
  if (!res.ok) throw new Error(`Airtable PATCH error (${table}/${id}): ${await res.text()}`)
  return res.json()
}
