'use client'

import SectionWrapper from '../ui/SectionWrapper'
import Button from '../ui/Button'
import { CTASectionContent } from '../../types/content'

interface CTASectionProps {
  content: CTASectionContent
  id?: string
}

export default function CTASection({ content, id = 'cta' }: CTASectionProps) {
  return (
    <SectionWrapper
      id={id}
      className="py-[var(--section-padding-y)] px-[var(--container-padding-x)] bg-[var(--color-primary)]"
    >
      <div
        className="mx-auto text-center"
        style={{ maxWidth: 'var(--container-max-width)' }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-fg)] mb-4">
          {content.headline}
        </h2>
        <p className="text-lg text-[var(--color-primary-fg)]/80 max-w-2xl mx-auto mb-8">
          {content.subheadline}
        </p>
        <Button
          href={content.cta.href}
          variant="secondary"
          className="text-base px-8 py-3 bg-[var(--color-primary-fg)] text-[var(--color-primary)] hover:bg-[var(--color-primary-fg)]/90 border-transparent"
        >
          {content.cta.label}
        </Button>
      </div>
    </SectionWrapper>
  )
}
