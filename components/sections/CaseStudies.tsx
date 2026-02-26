'use client'

import SectionWrapper from '../ui/SectionWrapper'
import { CaseStudiesContent } from '../../types/content'

interface CaseStudiesProps {
  content: CaseStudiesContent
}

export default function CaseStudies({ content }: CaseStudiesProps) {
  return (
    <SectionWrapper
      id="case-studies"
      className="py-[var(--section-padding-y)] px-[var(--container-padding-x)] bg-[var(--color-surface)]"
    >
      <div className="mx-auto" style={{ maxWidth: 'var(--container-max-width)' }}>
        {content.eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3 text-center">
            {content.eyebrow}
          </p>
        )}
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] text-center mb-12 max-w-2xl mx-auto">
          {content.headline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {content.items.map((cs) => (
            <div
              key={cs.title}
              className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)] shadow-[var(--shadow-sm)] overflow-hidden hover:shadow-[var(--shadow-md)] transition-shadow duration-200"
            >
              {/* Image or placeholder */}
              <div className="w-full aspect-video bg-[var(--color-surface)] flex items-center justify-center">
                {cs.imageSrc ? (
                  <img
                    src={cs.imageSrc}
                    alt={cs.imageAlt ?? cs.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-2xl font-bold text-[var(--color-primary)] mb-2">{cs.resultStat}</p>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">{cs.title}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed flex-1">{cs.description}</p>
                {cs.link && (
                  <a
                    href={cs.link.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] hover:underline mt-4"
                  >
                    {cs.link.label}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
