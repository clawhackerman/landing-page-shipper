'use client'

import SectionWrapper from '../ui/SectionWrapper'
import { ProcessContent } from '../../types/content'

interface ProcessProps {
  content: ProcessContent
}

export default function Process({ content }: ProcessProps) {
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

        <div className="flex flex-col md:flex-row gap-0">
          {content.steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col md:flex-1 items-start md:items-center">
              {/* Connector line — horizontal on md, vertical on mobile */}
              {index < content.steps.length - 1 && (
                <>
                  {/* Mobile vertical line */}
                  <div className="md:hidden absolute left-5 top-10 w-0.5 h-full bg-[var(--color-border)]" aria-hidden="true" />
                  {/* Desktop horizontal line */}
                  <div className="hidden md:block absolute top-5 left-1/2 w-full h-0.5 bg-[var(--color-border)]" aria-hidden="true" />
                </>
              )}

              <div className="relative flex md:flex-col items-start md:items-center gap-4 pb-10 md:pb-0 md:px-4 w-full">
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-fg)] flex items-center justify-center font-bold text-sm shadow-[var(--shadow-md)]">
                  {index + 1}
                </div>
                <div className="md:text-center">
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">{step.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
