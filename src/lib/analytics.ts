declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

type GtagEvent = 'generate_click' | 'download_html' | 'copy_section' | 'signup_click'

export function trackEvent(event: GtagEvent, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', event, params)
}
