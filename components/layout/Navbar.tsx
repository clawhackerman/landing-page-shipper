'use client'

import { useState, useEffect } from 'react'
import { NavbarContent } from '../../types/content'
import Button from '../ui/Button'

interface NavbarProps {
  content: NavbarContent
}

export default function Navbar({ content }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 dark:bg-[var(--color-background)]/70 backdrop-blur-md shadow-[var(--shadow-sm)] border-b border-[var(--color-border)]'
          : 'bg-transparent'
      }`}
    >
      <div
        className="mx-auto flex items-center justify-between h-16 px-[var(--container-padding-x)]"
        style={{ maxWidth: 'var(--container-max-width)' }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 font-bold text-lg text-[var(--color-text-primary)]">
          {content.logo.imageSrc ? (
            <img src={content.logo.imageSrc} alt={content.logo.imageAlt ?? content.logo.text} className="h-8 w-auto" />
          ) : (
            <span>{content.logo.text}</span>
          )}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {content.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button href={content.cta.href} variant="primary">
            {content.cta.label}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-[var(--radius-md)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="block w-5 h-0.5 bg-current mb-1 transition-all" />
          <span className="block w-5 h-0.5 bg-current mb-1 transition-all" />
          <span className="block w-5 h-0.5 bg-current transition-all" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--color-background)] border-t border-[var(--color-border)] px-[var(--container-padding-x)] py-4 flex flex-col gap-3">
          {content.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button href={content.cta.href} variant="primary" className="mt-2 w-full justify-center">
            {content.cta.label}
          </Button>
        </div>
      )}
    </header>
  )
}
