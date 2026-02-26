'use client'

import SectionWrapper from '../ui/SectionWrapper'
import { NextStepsContent } from '../../types/content'

interface NextStepsProps {
  content: NextStepsContent
}

export default function NextSteps({ content }: NextStepsProps) {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.cards.map((card, index) => (
            <div
              key={card.title}
              className="flex flex-col gap-4 p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <span className="text-5xl font-black text-[var(--color-primary)]/20 leading-none select-none">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{card.title}</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
