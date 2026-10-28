/** Cloudflare Turnstile widget（浏览器全局） */
interface Window {
  turnstile?: {
    render: (
      el: HTMLElement,
      opts: {
        sitekey: string
        theme?: string
        callback?: (token: string) => void
        'error-callback'?: () => boolean | void
        'expired-callback'?: () => void
      },
    ) => string
    remove: (id: string) => void
    reset?: (id: string) => void
  }
  onTurnstileLoad?: () => void
}
