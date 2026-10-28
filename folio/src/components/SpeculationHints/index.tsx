/**
 * Chromium Speculation Rules：对高频栏目做温和预取（不抢首屏）。
 * Cloudflare 也可能注入类似规则；重复预取会被浏览器去重。
 */
export function SpeculationHints() {
  const rules = {
    prefetch: [
      {
        source: 'document',
        where: {
          and: [
            { href_matches: '/*' },
            {
              not: {
                href_matches: [
                  '/admin*',
                  '/api/*',
                  '/verify*',
                  '/login*',
                  '/oidc*',
                ],
              },
            },
            { selector_matches: 'a[href^="/"]' },
          ],
        },
        eagerness: 'moderate',
      },
    ],
  }

  return (
    <script
      type="speculationrules"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(rules) }}
    />
  )
}
