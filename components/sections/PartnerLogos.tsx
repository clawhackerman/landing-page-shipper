'use client'

import SectionWrapper from '../ui/SectionWrapper'
import { PartnerLogosContent } from '../../types/content'

interface PartnerLogosProps {
  content: PartnerLogosContent
}

export default function PartnerLogos({ content }: PartnerLogosProps) {
  if (content.logos.length === 0) return null

  return (
    <SectionWrapper
      className="py-12 px-[var(--container-padding-x)] bg-[var(--color-surface)] border-y border-[var(--color-border)]"
    >
      <div className="mx-auto" style={{ maxWidth: 'var(--container-max-width)' }}>
        {content.eyebrow && (
          <p className="text-sm font-medium text-[var(--color-text-muted)] text-center mb-8">
            {content.eyebrow}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {content.logos.map((logo) => {
            const img = (
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
              />
            )
            return logo.href ? (
              <a key={logo.alt} href={logo.href} target="_blank" rel="noopener noreferrer">
                {img}
              </a>
            ) : (
              <span key={logo.alt}>{img}</span>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
