import Link from 'next/link'
import FAQAccordion from '@/components/FAQAccordion'

const demoInput = {
  productName: 'FlowDesk',
  tagline: 'Project management for async-first remote teams',
  audience: 'Startup founders and distributed engineering teams',
  features: 'Smart task automation, time-zone aware scheduling, async video updates, one-click standups',
  template: 'SaaS',
  tone: 'Professional but approachable',
}

const demoOutput = {
  headline: 'Ship projects faster — without the 9am standup',
  subheadline: 'FlowDesk keeps your remote team in sync across time zones. Automate the busywork. Focus on the work that ships.',
  features: [
    { icon: '⚡', title: 'Smart task automation', description: 'Recurring tasks, status updates, and blockers handled automatically so you never miss a deadline.' },
    { icon: '🌍', title: 'Time-zone aware scheduling', description: 'FlowDesk knows where your team is. Meetings, reviews, and reminders land at the right local time — always.' },
    { icon: '🎬', title: 'Async video updates', description: 'Replace status meetings with 90-second video updates your team can watch when they\'re ready.' },
  ],
  faq: [
    { question: 'Does it work for teams spread across many time zones?', answer: 'Absolutely. FlowDesk was built for async-first teams. Every feature — from scheduling to notifications — is designed around time-zone awareness.' },
    { question: 'How is FlowDesk different from Jira or Linear?', answer: 'FlowDesk automates the coordination layer that tools like Jira leave to humans. Less ceremony, more shipping.' },
  ],
  cta: 'Start your free 14-day trial',
  socialProof: 'Trusted by 800+ remote engineering teams',
  badge: 'AI-generated in 8 seconds',
}

const socialProofText = '1,200+ founders and freelancers trust AIDEN'

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

const testimonials = [
  {
    quote: "I launched three new product lines this quarter and AIDEN wrote the landing pages for all of them. What used to take a week of back-and-forth with a copywriter now takes me an afternoon.",
    name: 'Marcus Chen',
    role: 'Founder & CEO',
    company: 'Launchpad SaaS',
  },
  {
    quote: "My clients expect polished copy fast. AIDEN lets me deliver a draft landing page in the same meeting where we align on positioning. It's become my secret weapon for client onboarding.",
    name: 'Priya Nair',
    role: 'Freelance Brand Designer',
    company: 'Studio Nair',
  },
  {
    quote: "We run campaigns for 30+ clients a month. AIDEN cut our landing page production time by 70%. The copy quality is genuinely strong — we barely edit it before handing off to clients.",
    name: 'Jordan Ellis',
    role: 'Director of Growth',
    company: 'Orbit Digital Agency',
  },
]

const comparisonRows = [
  { feature: 'Price', aiden: '$19 one-time', chatgpt: '$20/mo', copyai: '$49/mo', freelancer: '$500–2,000' },
  { feature: 'Live Preview', aiden: true, chatgpt: false, copyai: false, freelancer: false },
  { feature: 'HTML Export', aiden: true, chatgpt: false, copyai: false, freelancer: true },
  { feature: 'Landing Page Specific', aiden: true, chatgpt: false, copyai: false, freelancer: true },
  { feature: 'Time to Page', aiden: '30 seconds', chatgpt: '5–10 min', copyai: '3–5 min', freelancer: '3–7 days' },
  { feature: 'No Subscription', aiden: true, chatgpt: false, copyai: false, freelancer: true },
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
          {socialProofText} &nbsp;·&nbsp; Built with Claude AI &nbsp;·&nbsp; Export to HTML in one click
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

      {/* Before / After demo */}
      <section className="bg-gray-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 mb-4">
              Live example
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              From idea to landing page in seconds
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
              Fill in the form. AIDEN writes the copy. Here&apos;s exactly what that looks like for a real SaaS product.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Input side */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-widest">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">1</span>
                You fill in the form
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 bg-gray-50 px-5 py-3 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-300" />
                  <span className="h-3 w-3 rounded-full bg-yellow-300" />
                  <span className="h-3 w-3 rounded-full bg-green-300" />
                  <span className="ml-2 text-xs text-gray-400">aiden.so/generate</span>
                </div>
                <div className="px-6 py-6 space-y-5">
                  {[
                    { label: 'Product name', value: demoInput.productName },
                    { label: 'Tagline', value: demoInput.tagline },
                    { label: 'Target audience', value: demoInput.audience },
                    { label: 'Key features', value: demoInput.features },
                    { label: 'Template', value: demoInput.template },
                    { label: 'Tone of voice', value: demoInput.tone },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{field.label}</label>
                      <div className="rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800">
                        {field.value}
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <div className="w-full rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white">
                      Generate landing page ✨
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Output side */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-widest">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">2</span>
                  AIDEN generates the page
                </div>
                <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                  {demoOutput.badge}
                </span>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 bg-gray-50 px-5 py-3 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-300" />
                  <span className="h-3 w-3 rounded-full bg-yellow-300" />
                  <span className="h-3 w-3 rounded-full bg-green-300" />
                  <span className="ml-2 text-xs text-gray-400">preview — FlowDesk landing page</span>
                </div>

                {/* Generated hero */}
                <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 px-6 py-10 text-white text-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-2">{demoOutput.socialProof}</p>
                  <h3 className="text-2xl font-extrabold leading-tight mb-3">{demoOutput.headline}</h3>
                  <p className="text-indigo-100 text-sm max-w-sm mx-auto mb-5 leading-relaxed">{demoOutput.subheadline}</p>
                  <div className="inline-block rounded-lg bg-white px-5 py-2 text-sm font-semibold text-indigo-700 shadow-md">
                    {demoOutput.cta}
                  </div>
                </div>

                {/* Generated features */}
                <div className="px-6 py-7">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Key features</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {demoOutput.features.map((f) => (
                      <div key={f.title} className="rounded-xl bg-indigo-50 p-4">
                        <div className="text-xl mb-2">{f.icon}</div>
                        <h4 className="text-xs font-semibold text-gray-900 mb-1">{f.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{f.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generated FAQ */}
                <div className="border-t border-gray-100 px-6 py-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">FAQ</p>
                  <div className="space-y-3">
                    {demoOutput.faq.map((item) => (
                      <div key={item.question} className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-4">
                        <p className="text-xs font-semibold text-gray-900 mb-1">{item.question}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA below demo */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-4">Your product. Your copy. Ready in under a minute.</p>
            <Link
              href="/generate"
              className="inline-block rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-indigo-700 transition-colors"
            >
              Generate my landing page — free
            </Link>
            <p className="mt-3 text-xs text-gray-400">No credit card required</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What our users are saying
            </h2>
            <p className="mt-4 text-lg text-gray-600">Founders, freelancers, and agencies ship faster with AIDEN.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                <p className="text-gray-700 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-gray-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How AIDEN compares
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              The fastest, most affordable way to get a conversion-ready landing page.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-500">Feature</th>
                  <th className="text-center py-3 px-4 font-bold text-indigo-600">AIDEN</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-500">ChatGPT</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-500">Copy.ai</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-500">Freelancer</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{row.feature}</td>
                    {(['aiden', 'chatgpt', 'copyai', 'freelancer'] as const).map((col) => {
                      const val = row[col]
                      return (
                        <td key={col} className={`text-center py-3 px-4 ${col === 'aiden' ? 'bg-indigo-50/50 font-semibold text-gray-900' : 'text-gray-600'}`}>
                          {typeof val === 'boolean' ? (
                            val ? <span className="text-green-600 text-lg">&#10003;</span> : <span className="text-red-400 text-lg">&#10007;</span>
                          ) : val}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
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
      <FAQAccordion />

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
            <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
          </div>
          <span>Built with Claude AI by Anthropic</span>
        </div>
      </footer>
    </main>
  )
}
