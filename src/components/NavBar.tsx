'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#examples', label: 'Examples' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/login', label: 'Log in' },
]

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b-2 border-red-hot bg-black-deep sticky top-0 z-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <span className="text-lg font-bold tracking-tight text-red-hot uppercase">AIDEN</span>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white-muted hover:text-orange-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/generate"
            className="bg-red-hot px-4 py-2 text-sm font-semibold text-white-full hover:bg-red-dim transition-colors"
          >
            Try free
          </Link>
        </div>

        {/* Mobile: Try free + hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/generate"
            className="bg-red-hot px-3 py-1.5 text-sm font-semibold text-white-full hover:bg-red-dim transition-colors"
          >
            Try free
          </Link>
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="p-2 text-white-muted hover:text-orange-accent transition-colors"
          >
            {open ? (
              /* X icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {open && (
        <div className="sm:hidden border-t border-red-hot bg-black-deep px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-white-muted hover:text-orange-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/generate"
            onClick={() => setOpen(false)}
            className="mt-1 block px-3 py-2 text-sm font-semibold text-red-hot hover:text-orange-accent transition-colors"
          >
            Try free
          </Link>
        </div>
      )}
    </nav>
  )
}
