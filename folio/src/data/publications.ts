/** 公开研究档案用的论文条目（与 GitHub 主页对齐，便于一处维护）。 */
export type PubLink = {
  label: string
  href: string
}

export type Publication = {
  title: string
  year: string
  venue: string
  links: PubLink[]
}

export const researchProfiles = [
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=DJ43CTcAAAAJ',
  },
  {
    label: 'ORCID',
    href: 'https://orcid.org/0009-0007-0343-4129',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/AlexanderJ-Carter',
  },
] as const

export const publications: Publication[] = [
  {
    title: 'AgentSociety 2: An Integrated Research Environment for Executable Social Science',
    year: '2026',
    venue: 'arXiv',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2607.11895' },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2607.11895' },
    ],
  },
  {
    title:
      'Grounding LLM Agent Intent in Multi-Module Environments with Executable Action Programs',
    year: '2026',
    venue: 'EMNLP',
    links: [
      { label: 'OpenReview', href: 'https://openreview.net/forum?id=c9mKOXi2zV' },
      { label: 'PDF', href: 'https://fi.ee.tsinghua.edu.cn/public/publications/2e874c1a-a032-11f1-8112-4eb6c6416b98.pdf' },
      {
        label: 'Scholar',
        href: 'https://scholar.google.com/citations?user=DJ43CTcAAAAJ',
      },
    ],
  },
]
