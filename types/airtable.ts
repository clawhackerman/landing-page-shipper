export type FieldScore = 'found' | 'inferred' | 'missing'

export interface ScoredField<T = string> {
  value: T | null
  score: FieldScore
}

export interface ScannedClient {
  slug: ScoredField         // → FieldTypeSlug
  campaignName: ScoredField // → Campaign Name
  companyName: ScoredField  // → Company Name
  websiteUrl: ScoredField   // → Website URL
}

export interface ScannedCopy {
  headline: ScoredField         // → Headline
  subheadline: ScoredField      // → Subheadline
  ctaText: ScoredField          // → CTA Text
  problemStatement: ScoredField // → Problem Statement
  outcomeStatement: ScoredField // → Outcome Statement
}

export interface ScannedService {
  title: ScoredField               // → Title
  description: ScoredField         // → Description
  orderNumber: ScoredField<number> // → OrderNumber
}

export interface ScannedProcessStep {
  stepTitle: ScoredField           // → Step Title
  stepDescription: ScoredField     // → Step Description
  orderNumber: ScoredField<number> // → OrderNumber
}

export interface ScannedTestimonial {
  quote: ScoredField    // → Quote
  name: ScoredField     // → Name
  jobTitle: ScoredField // → Job Title
  company: ScoredField  // → Company
}

export interface ScannedCaseStudy {
  clientLabel: ScoredField // → Client Label
  keyStat: ScoredField     // → Key Stat
  description: ScoredField // → Description
}

export interface ScannedFAQ {
  question: ScoredField            // → Question
  answer: ScoredField              // → Answer
  orderNumber: ScoredField<number> // → OrderNumber
}

export interface ScanResult {
  client: ScannedClient
  copy: ScannedCopy
  services: ScannedService[]
  processSteps: ScannedProcessStep[]
  testimonials: ScannedTestimonial[]
  caseStudies: ScannedCaseStudy[]
  faqs: ScannedFAQ[]
}
