'use client'

import SectionWrapper from '../ui/SectionWrapper'
import Icon from '../ui/Icon'
import { ProblemSectionContent } from '../../types/content'

interface ProblemSectionProps {
  content: ProblemSectionContent
}

export default function ProblemSection({ content }: ProblemSectionProps) {
  return (
    <SectionWrapper
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-start gap-4 p-6 rounded-[var(--radius-lg)] bg-[var(--color-background)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]"
            >
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                <Icon d={card.icon} size={24} />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{card.title}</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
