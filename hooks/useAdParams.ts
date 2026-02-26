'use client'

import { useSearchParams } from 'next/navigation'

export interface AdParams {
  h: string | null    // hero headline override
  sh: string | null   // hero subheadline override
  cta: string | null  // CTA button text override
  kw: string | null   // keyword (tracking only, not displayed)
}

export function useAdParams(): AdParams {
  const params = useSearchParams()
  return {
    h:   params.get('h'),
    sh:  params.get('sh'),
    cta: params.get('cta'),
    kw:  params.get('kw'),
  }
}
