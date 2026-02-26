'use client'

import SectionWrapper from '../ui/SectionWrapper'
import Icon from '../ui/Icon'
import { ServicesContent } from '../../types/content'

interface ServicesProps {
  content: ServicesContent
}

export default function Services({ content }: ServicesProps) {
  return (
    <SectionWrapper
      id="services"
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
          {content.cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col gap-4 p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-[var(--color-border-hover)] transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                <Icon d={card.icon} size={24} />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{card.title}</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed flex-1">{card.description}</p>
              {card.link && (
                <a
                  href={card.link.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] hover:underline mt-auto"
                >
                  {card.link.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
