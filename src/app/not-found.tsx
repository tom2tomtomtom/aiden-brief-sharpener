import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black-ink flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <span className="text-2xl font-bold tracking-tight text-white uppercase">AIDEN</span>
        <p className="mt-6 text-6xl font-bold text-white">404</p>
        <p className="mt-4 text-lg text-white-muted">Page not found.</p>
        <p className="mt-2 text-sm text-white-dim">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block bg-red-hot text-white text-sm font-medium px-6 py-3 hover:opacity-90 transition-opacity"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
