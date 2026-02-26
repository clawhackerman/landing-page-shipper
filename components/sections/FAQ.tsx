'use client'

import SectionWrapper from '../ui/SectionWrapper'
import { FAQContent } from '../../types/content'

interface FAQProps {
  content: FAQContent
}

export default function FAQ({ content }: FAQProps) {
  return (
    <SectionWrapper
      className="py-[var(--section-padding-y)] px-[var(--container-padding-x)] bg-[var(--color-surface)]"
    >
      <div className="mx-auto max-w-3xl" style={{ maxWidth: 'min(var(--container-max-width), 48rem)' }}>
        {content.eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3 text-center">
            {content.eyebrow}
          </p>
        )}
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] text-center mb-12">
          {content.headline}
        </h2>

        <div className="flex flex-col gap-3">
          {content.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)] overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors select-none">
                <span>{item.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="px-6 pb-5 pt-1 text-[var(--color-text-secondary)] leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
