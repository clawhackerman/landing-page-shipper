'use client'

import SectionWrapper from '../ui/SectionWrapper'
import { TestimonialsContent } from '../../types/content'

interface TestimonialsProps {
  content: TestimonialsContent
}

export default function Testimonials({ content }: TestimonialsProps) {
  return (
    <SectionWrapper
      className="py-[var(--section-padding-y)] px-[var(--container-padding-x)] bg-[var(--color-background)]"
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

        {/* CSS masonry columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {content.items.map((t) => (
            <div
              key={t.name}
              className="break-inside-avoid mb-6 p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]"
            >
              <blockquote className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                {t.avatarSrc ? (
                  <img
                    src={t.avatarSrc}
                    alt={t.avatarAlt ?? t.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0 text-[var(--color-primary)] font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{t.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {t.title}{t.company ? `, ${t.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
