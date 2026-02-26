'use client'

import SectionWrapper from '../ui/SectionWrapper'
import { ValuePropositionContent } from '../../types/content'

interface ValuePropositionProps {
  content: ValuePropositionContent
}

export default function ValueProposition({ content }: ValuePropositionProps) {
  return (
    <SectionWrapper
      className="py-[var(--section-padding-y)] px-[var(--container-padding-x)] bg-[var(--color-background)]"
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        style={{ maxWidth: 'var(--container-max-width)' }}
      >
        {/* Text */}
        <div>
          {content.eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">
              {content.eyebrow}
            </p>
          )}
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-6 leading-tight">
            {content.headline}
          </h2>
          <div className="text-[var(--color-text-secondary)] leading-relaxed space-y-4">
            {content.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Graphic / Placeholder */}
        <div className="w-full aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)] bg-[var(--color-surface)] flex items-center justify-center">
          {content.graphic ? (
            <img
              src={content.graphic.src}
              alt={content.graphic.alt}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-[var(--color-text-muted)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={48}
                height={48}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              <span className="text-sm font-medium">Solution graphic</span>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
