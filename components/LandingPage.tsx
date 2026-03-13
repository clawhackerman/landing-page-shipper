'use client'

import { LandingPageContent } from '../types/content'
import { useAdParams } from '../hooks/useAdParams'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import Hero from './sections/Hero'
import MediaBlock from './sections/MediaBlock'
import ProblemSection from './sections/ProblemSection'
import ValueProposition from './sections/ValueProposition'
import PartnerLogos from './sections/PartnerLogos'
import Services from './sections/Services'
import Process from './sections/Process'
import Testimonials from './sections/Testimonials'
import CaseStudies from './sections/CaseStudies'
import NextSteps from './sections/NextSteps'
import CTASection from './sections/CTASection'
import FAQ from './sections/FAQ'

interface LandingPageProps {
  content: LandingPageContent
}

export default function LandingPage({ content }: LandingPageProps) {
  const adParams = useAdParams()

  const heroOverrides = {
    headline:    adParams.h   ?? undefined,
    subheadline: adParams.sh  ?? undefined,
    ctaLabel:    adParams.cta ?? undefined,
  }

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <Navbar content={content.navbar} />
      <main>
        <Hero content={content.hero} overrides={heroOverrides} />
        <MediaBlock content={content.mediaBlock} />
        <ProblemSection content={content.problemSection} />
        <ValueProposition content={content.valueProposition} />
        <PartnerLogos content={content.partnerLogos} />
        <Services content={content.services} />
        <Process content={content.process} />
        <Testimonials content={content.testimonials} />
        <CaseStudies content={content.caseStudies} />
        <NextSteps content={content.nextSteps} />
        <CTASection content={content.ctaSection} />
        <FAQ content={content.faq} />
      </main>
      <Footer content={content.footer} />
    </div>
  )
}
