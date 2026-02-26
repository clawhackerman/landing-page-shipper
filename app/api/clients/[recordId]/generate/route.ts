import { NextRequest, NextResponse } from 'next/server'
import {
  fetchRecordById,
  fetchByClientId,
  patchRecord,
  AirtableClientFields,
  AirtableCopyFields,
  AirtableServiceFields,
  AirtableProcessStepFields,
  AirtableTestimonialFields,
  AirtableCaseStudyFields,
  AirtableFAQFields,
} from '../../../../../lib/airtable'
import { mapAirtableToContent } from '../../../../../lib/airtable-to-content'

async function commitToGitHub(slug: string, content: object): Promise<void> {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO
  if (!token || !repo) throw new Error('GITHUB_TOKEN and GITHUB_REPO env vars are required')

  const path = `content/${slug}.json`
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}`
  const fileContent = Buffer.from(JSON.stringify(content, null, 2)).toString('base64')

  // Check if file already exists (need SHA to update)
  let sha: string | undefined
  const existing = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  })
  if (existing.ok) {
    const data = await existing.json()
    sha = data.sha
  }

  const body: Record<string, unknown> = {
    message: `feat: generate content for ${slug}`,
    content: fileContent,
  }
  if (sha) body.sha = sha

  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub API error: ${err}`)
  }
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ recordId: string }> }
) {
  try {
    const { recordId } = await params

    // Fetch client record
    const client = await fetchRecordById<AirtableClientFields>('Clients', recordId)
    const copyRecordId = client.fields.Copy?.[0]
    if (!copyRecordId) throw new Error('No Copy record linked to this client')

    // Fetch all related records in parallel
    const [copy, services, processSteps, testimonials, caseStudies, faqs] = await Promise.all([
      fetchRecordById<AirtableCopyFields>('Copy', copyRecordId),
      fetchByClientId<AirtableServiceFields>('Services', recordId),
      fetchByClientId<AirtableProcessStepFields>('Process Steps', recordId),
      fetchByClientId<AirtableTestimonialFields>('Testimonials', recordId),
      fetchByClientId<AirtableCaseStudyFields>('Case Studies', recordId),
      fetchByClientId<AirtableFAQFields>('FAQs', recordId),
    ])

    // Map to LandingPageContent
    const content = mapAirtableToContent(
      client, copy, services, processSteps, testimonials, caseStudies, faqs
    )

    // Commit to GitHub
    await commitToGitHub(content.slug, content)

    // Update Airtable status to "In Build"
    await patchRecord('Clients', recordId, { Status: 'In Build' })

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
    const previewUrl = siteUrl ? `${siteUrl}/${content.slug}` : `/${content.slug}`

    return NextResponse.json({ ok: true, previewUrl, slug: content.slug })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
