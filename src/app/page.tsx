import Link from 'next/link'

const demoOutput = {
  headline: 'Ship landing pages in minutes, not days',
  subheadline: 'Describe your product. AIDEN writes conversion-optimised copy and delivers a ready-to-publish page.',
  features: [
    { title: 'AI-generated copy', description: 'Claude writes headlines, feature blurbs, and FAQs tailored to your product and tone.' },
    { title: '5 battle-tested templates', description: 'SaaS, agency, freelancer, e-commerce, local business — pick a style and go.' },
    { title: 'One-click HTML export', description: 'Download a self-contained HTML file ready to drop into any host.' },
  ],
  faq: [
    { question: 'Does the copy actually convert?', answer: 'AIDEN uses proven copywriting frameworks — AIDA, benefit-led headlines, social proof — so the output is structured to convert from day one.' },
    { question: 'Can I edit the output?', answer: 'Yes. Download the HTML file and edit it in any code editor or drag it into Webflow, Framer, or Notion.' },
  ],
  cta: 'Generate My Landing Page',
  socialProof: '1,200+ founders and freelancers trust AIDEN',
}

const steps = [
  {
    number: '01',
    title: 'Describe your product',
    description: 'Enter your product name, what it does, who it is for, and the tone you want. Takes about 60 seconds.',
  },
  {
    number: '02',
    title: 'AIDEN writes the copy',
    description: 'Claude AI generates headlines, feature descriptions, FAQs, and a CTA — all matched to your chosen template.',
  },
  {
    number: '03',
    title: 'Download and publish',
    description: 'Preview the page, tweak if needed, then download a ready-to-ship HTML file or copy the content.',
  },
]

const faqs = [
  {
    question: 'Is it really free to start?',
    answer: 'Yes. The free plan gives you 3 generations per month with no credit card required. Upgrade only when you need more.',
  },
  {
    question: 'What AI model powers AIDEN?',
    answer: 'AIDEN uses Claude by Anthropic — one of the most capable language models for nuanced, high-quality writing.',
  },
  {
    question: 'Can I use the output commercially?',
    answer: 'Absolutely. All generated copy is yours to use however you like — on your website, in ads, in pitch decks, anywhere.',
  },
  {
    question: 'Do I need to know how to code?',
    answer: 'No. The downloaded HTML file works out of the box. You can host it on Netlify, GitHub Pages, or any static host in minutes.',
  },
  {
    question: 'What templates are available?',
    answer: 'AIDEN includes five templates: SaaS, Agency, Freelancer, E-commerce, and Local Business. Each has distinct copy style and visual theme.',
  },
]

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <span className="text-lg font-bold tracking-tight text-gray-900">AIDEN</span>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/generate"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Try free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-white px-4 pt-20 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 mb-6">
            Powered by Claude AI
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl leading-tight">
            Landing pages that{' '}
            <span className="text-indigo-600">convert</span>,<br />
            written in seconds
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Describe your product. AIDEN generates professional, conversion-optimised copy and delivers a
            ready-to-publish HTML page — no designer or copywriter needed.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/generate"
              className="w-full sm:w-auto rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-indigo-700 transition-colors"
            >
              Generate my landing page — free
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              See pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">No credit card required · 3 free generations per month</p>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-gray-100 bg-gray-50 py-5">
        <p className="text-center text-sm font-medium text-gray-500">
          {demoOutput.socialProof} &nbsp;·&nbsp; Built with Claude AI &nbsp;·&nbsp; Export to HTML in one click
        </p>
      </section>

      {/* How it works */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-gray-600">Three steps from idea to live page.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col">
                <span className="text-5xl font-black text-indigo-100 leading-none mb-4">{step.number}</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example output */}
      <section className="bg-gray-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              See what AIDEN produces
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Here is an example output for a SaaS product. Every section is AI-generated.
            </p>
          </div>

          {/* Demo card */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Demo hero */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-12 text-white text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-3">AI-generated headline</p>
              <h3 className="text-3xl font-bold mb-3">{demoOutput.headline}</h3>
              <p className="text-indigo-100 text-base max-w-xl mx-auto mb-6">{demoOutput.subheadline}</p>
              <div className="inline-block rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-indigo-600">
                {demoOutput.cta}
              </div>
            </div>

            {/* Demo features */}
            <div className="px-8 py-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">AI-generated features</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {demoOutput.features.map((f) => (
                  <div key={f.title} className="rounded-xl bg-indigo-50 p-5">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{f.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Demo FAQ */}
            <div className="border-t border-gray-100 px-8 py-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">AI-generated FAQ</p>
              <div className="space-y-4">
                {demoOutput.faq.map((item) => (
                  <div key={item.question} className="rounded-lg border border-gray-100 bg-gray-50 p-5">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{item.question}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA inside demo */}
            <div className="border-t border-gray-100 bg-gray-50 px-8 py-6 text-center">
              <p className="text-sm text-gray-500 mb-3">Ready to generate yours?</p>
              <Link
                href="/generate"
                className="inline-block rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
              >
                Try it free — no sign-up needed
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple pricing, no surprises
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Start free with 3 generations a month. Pay once for a single page or go unlimited with Pro.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              { name: 'Free', price: '$0', period: '', description: '3 generations / month', cta: 'Start free', href: '/generate', highlight: false },
              { name: 'Single', price: '$19', period: 'one-time', description: '1 generation, no attribution', cta: 'Buy now', href: '/pricing', highlight: true },
              { name: 'Pro', price: '$39', period: '/ month', description: 'Unlimited generations', cta: 'Go Pro', href: '/pricing', highlight: false },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 ${
                  tier.highlight
                    ? 'bg-indigo-600 text-white shadow-xl ring-2 ring-indigo-600'
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${tier.highlight ? 'text-indigo-200' : 'text-indigo-600'}`}>
                  {tier.name}
                </p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.period && <span className={`text-sm ${tier.highlight ? 'text-indigo-200' : 'text-gray-500'}`}>{tier.period}</span>}
                </div>
                <p className={`text-sm mb-5 ${tier.highlight ? 'text-indigo-100' : 'text-gray-500'}`}>{tier.description}</p>
                <Link
                  href={tier.href}
                  className={`block text-center rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                    tier.highlight
                      ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/pricing" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
              See full pricing details →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-xl border border-gray-200 bg-white px-6 py-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{item.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your landing page is 60 seconds away
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            No copywriter. No designer. No waiting. Just a great landing page.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/generate"
              className="w-full sm:w-auto rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-indigo-700 transition-colors"
            >
              Generate my landing page — free
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Sign in
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">No credit card required · 3 free generations per month</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span className="font-semibold text-gray-900">AIDEN</span>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="hover:text-gray-600 transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-gray-600 transition-colors">Log in</Link>
            <Link href="/generate" className="hover:text-gray-600 transition-colors">Generate</Link>
          </div>
          <span>Built with Claude AI by Anthropic</span>
        </div>
      </footer>
    </main>
  )
}
