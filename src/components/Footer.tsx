import Link from 'next/link'

const navLinks = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/guide', label: 'Guide' },
  { href: '/login', label: 'Login' },
  { href: '/generate', label: 'Try Free' },
]

const legalLinks = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-2 border-red-hot bg-black-deep py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Branding */}
          <span className="text-lg font-bold tracking-tight text-red-hot uppercase">AIDEN</span>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white-muted hover:text-orange-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Legal links */}
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white-dim hover:text-white-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-center text-xs text-white-dim">
          &copy; {year} AIDEN Brief Intelligence. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
