'use client'

import { motion } from 'framer-motion'
import { HeroContent } from '../../types/content'
import Button from '../ui/Button'

interface HeroProps {
  content: HeroContent
}

export default function Hero({ content }: HeroProps) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-[var(--container-padding-x)] pt-24 pb-16 bg-[var(--color-background)] overflow-hidden">
      {/* Background gradient blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in srgb, var(--color-primary) 12%, transparent), transparent)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight mb-6">
          {content.headline}
        </h1>
        <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
          {content.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button href={content.cta.href} variant="primary" className="text-base px-8 py-3">
            {content.cta.label}
          </Button>
        </div>
        {content.socialProof && (
          <p className="text-sm text-[var(--color-text-muted)]">{content.socialProof}</p>
        )}
      </motion.div>
    </section>
  )
}
