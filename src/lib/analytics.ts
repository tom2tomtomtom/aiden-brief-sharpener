type AnalyticsEvent =
  | { name: 'analysis_started'; briefLength: number; hasFile: boolean }
  | { name: 'analysis_completed'; score: number; gapCount: number; durationMs: number }
  | { name: 'analysis_error'; error: string }
  | { name: 'reinterrogate'; previousScore: number }
  | { name: 'copy_analysis' }
  | { name: 'copy_section'; section: string }
  | { name: 'export_pdf' }
  | { name: 'share_result' }
  | { name: 'score_breakdown_opened' }
  | { name: 'comparison_toggled'; visible: boolean }
  | { name: 'template_saved' }
  | { name: 'template_loaded' }
  | { name: 'example_brief_loaded'; label: string }
  | { name: 'upgrade_clicked'; source: string }
  | { name: 'email_captured' }
  | { name: 'billing_portal_opened' }

export function trackEvent(event: AnalyticsEvent) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const { name, ...params } = event
      window.gtag('event', name, params)
    }
  } catch {
    // Analytics should never break the app
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
