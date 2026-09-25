/**
 * 弱化关于页首屏法定姓名（门禁后也不把全名当 H1）。
 *
 *   pnpm --dir folio exec node --import tsx scripts/soften-about-copy.mjs
 * 容器内：
 *   docker compose exec folio node --import tsx scripts/soften-about-copy.mjs
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

function lexicalDoc(blocks: unknown[]) {
  return {
    root: {
      type: 'root',
      children: blocks,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

function heading(tag: 'h1' | 'h2', text: string) {
  return {
    type: 'heading',
    children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    tag,
    version: 1,
  }
}

function paragraph(text: string) {
  return {
    type: 'paragraph',
    children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1,
  }
}

async function main() {
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const page = found.docs[0]
  if (!page) {
    throw new Error('about page missing')
  }

  await payload.update({
    collection: 'pages',
    id: page.id,
    overrideAccess: true,
    data: {
      meta: {
        ...(typeof page.meta === 'object' && page.meta ? page.meta : {}),
        title: '关于',
        description: '门禁后的站主简介：学习、研究兴趣与并行履历。',
      },
      hero: {
        type: 'lowImpact',
        richText: lexicalDoc([
          heading('h1', '关于'),
          paragraph('电子工程在读，关注 LLM Agent 与可执行社会科学；摄影与站务是业余习惯。'),
        ]),
      },
    },
  })

  // 正文块：去掉「我是××」直呼
  const withBlocks = await payload.findByID({
    collection: 'pages',
    id: page.id,
    depth: 2,
    overrideAccess: true,
  })

  const layout = Array.isArray(withBlocks.layout) ? [...withBlocks.layout] : []
  for (const block of layout) {
    if (!block || typeof block !== 'object' || block.blockType !== 'content') continue
    const columns = Array.isArray(block.columns) ? block.columns : []
    for (const col of columns) {
      if (!col || typeof col !== 'object') continue
      const raw = JSON.stringify(col.richText || {})
      if (!raw.includes('你好') && !raw.includes('黄皓宇')) continue
      col.richText = lexicalDoc([
        heading('h2', '你好'),
        paragraph(
          '目前就读于清华大学电子工程系。学习和研究之外，喜欢摄影、音乐和游泳，也在持续维护这个个人网站。',
        ),
        paragraph('研究兴趣主要是 LLM Agent、多智能体系统，以及 AI 如何用于社会科学研究。'),
      ])
    }
  }

  await payload.update({
    collection: 'pages',
    id: page.id,
    overrideAccess: true,
    data: { layout },
  })

  payload.logger.info('soften-about-copy: about hero + intro updated (no legal-name H1)')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
