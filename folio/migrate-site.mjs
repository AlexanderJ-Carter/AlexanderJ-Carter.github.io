/**
 * 把静态站内容迁入 Payload：首页 / 关于 / 联系 + zh-CN 写作。
 * 用法（在 folio/ 目录）:
 *   npm run migrate:site
 *   或 PATH=../.tools/node/bin:$PATH node --import tsx migrate-site.mjs
 *
 * WRITING_DIR 指向父仓库 Astro 内容：../src/content/writing（相对 folio/）
 */
import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from './src/payload.config.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const WRITING_DIR = path.join(ROOT, 'src/content/writing')
const HERO_PATH = path.join(ROOT, 'public/img/gallery-optimized/landscape-01-xl.webp')

const LOCALE_SUFFIX = /-(en-GB|zh-TW|fr|ru)\.md$/

function text(t, format = 0) {
  return {
    type: 'text',
    detail: 0,
    format,
    mode: 'normal',
    style: '',
    text: t,
    version: 1,
  }
}

function paragraph(children) {
  return {
    type: 'paragraph',
    children: Array.isArray(children) ? children : [text(String(children))],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1,
  }
}

function heading(tag, t) {
  return {
    type: 'heading',
    children: [text(t)],
    direction: 'ltr',
    format: '',
    indent: 0,
    tag,
    version: 1,
  }
}

function listItem(children) {
  return {
    type: 'listitem',
    children: [paragraph(children)],
    direction: 'ltr',
    format: '',
    indent: 0,
    value: 1,
    version: 1,
  }
}

function bulletList(items) {
  return {
    type: 'list',
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    children: items.map((c) => listItem(c)),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function richRoot(children) {
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/** 简易行内：`**bold**` `*italic*` `` `code` `` */
function parseInline(raw) {
  const nodes = []
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g
  let last = 0
  let m
  while ((m = re.exec(raw))) {
    if (m.index > last) nodes.push(text(raw.slice(last, m.index)))
    const token = m[0]
    if (token.startsWith('**')) nodes.push(text(token.slice(2, -2), 1))
    else if (token.startsWith('*')) nodes.push(text(token.slice(1, -1), 2))
    else nodes.push(text(token.slice(1, -1), 16))
    last = m.index + token.length
  }
  if (last < raw.length) nodes.push(text(raw.slice(last)))
  if (nodes.length === 0) nodes.push(text(''))
  return nodes
}

function markdownToLexical(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const children = []
  let i = 0
  let paraBuf = []

  const flushPara = () => {
    if (!paraBuf.length) return
    const joined = paraBuf.join(' ').trim()
    if (joined) children.push(paragraph(parseInline(joined)))
    paraBuf = []
  }

  while (i < lines.length) {
    const line = lines[i]
    if (line.trim() === '') {
      flushPara()
      i++
      continue
    }

    const hm = line.match(/^(#{1,4})\s+(.+)$/)
    if (hm) {
      flushPara()
      children.push(heading(`h${hm[1].length}`, hm[2].trim()))
      i++
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      flushPara()
      const items = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(parseInline(lines[i].replace(/^[-*]\s+/, '').trim()))
        i++
      }
      children.push(bulletList(items))
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      flushPara()
      const items = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(parseInline(lines[i].replace(/^\d+\.\s+/, '').trim()))
        i++
      }
      children.push({
        type: 'list',
        listType: 'number',
        start: 1,
        tag: 'ol',
        children: items.map((c) => listItem(c)),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
      continue
    }

    if (/^```/.test(line)) {
      flushPara()
      i++
      const code = []
      while (i < lines.length && !/^```/.test(lines[i])) {
        code.push(lines[i])
        i++
      }
      if (i < lines.length) i++
      children.push(paragraph([text(code.join('\n'), 16)]))
      continue
    }

    if (/^---+$/.test(line.trim()) || /^>\s?/.test(line)) {
      flushPara()
      if (/^>\s?/.test(line)) {
        children.push(paragraph(parseInline(line.replace(/^>\s?/, ''))))
      }
      i++
      continue
    }

    paraBuf.push(line.trim())
    i++
  }
  flushPara()
  if (children.length === 0) children.push(paragraph([text('')]))
  return richRoot(children)
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return { data: {}, body: raw }
  const end = raw.indexOf('\n---', 3)
  if (end < 0) return { data: {}, body: raw }
  const yaml = raw.slice(4, end)
  const body = raw.slice(end + 4).replace(/^\n/, '')
  const data = {}
  for (const line of yaml.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/)
    if (!m) continue
    let v = m[2].trim()
    if (
      (v.startsWith("'") && v.endsWith("'")) ||
      (v.startsWith('"') && v.endsWith('"'))
    ) {
      v = v.slice(1, -1)
    }
    if (v.startsWith('[') && v.endsWith(']')) {
      data[m[1]] = v
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    } else {
      data[m[1]] = v
    }
  }
  return { data, body }
}

function contentBlock(title, paragraphs) {
  return {
    blockType: 'content',
    columns: [
      {
        size: 'full',
        richText: richRoot([
          heading('h2', title),
          ...paragraphs.map((p) => paragraph(parseInline(p))),
        ]),
      },
    ],
  }
}

function fileFromPath(filePath, alt) {
  const buf = fs.readFileSync(filePath)
  const name = path.basename(filePath)
  const ext = path.extname(name).slice(1).toLowerCase()
  const mimetype =
    ext === 'jpg' || ext === 'jpeg'
      ? 'image/jpeg'
      : ext === 'png'
        ? 'image/png'
        : ext === 'webp'
          ? 'image/webp'
          : `image/${ext}`
  return {
    data: { alt },
    file: {
      name,
      data: buf,
      mimetype,
      size: buf.byteLength,
    },
  }
}

async function clearCollection(payload, slug) {
  const existing = await payload.find({
    collection: slug,
    limit: 500,
    depth: 0,
    overrideAccess: true,
  })
  for (const doc of existing.docs) {
    await payload.delete({
      collection: slug,
      id: doc.id,
      overrideAccess: true,
      context: { disableRevalidate: true },
    })
  }
}

async function main() {
  const payload = await getPayload({ config })
  console.log('Payload ready')

  const users = await payload.find({
    collection: 'users',
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  if (users.totalDocs === 0) {
    throw new Error('请先创建管理员（打开 /admin 或跑 seed-admin.mjs）')
  }
  const author = users.docs[0]

  console.log('— 清理 pages / posts / categories / forms / media …')
  for (const slug of ['pages', 'posts', 'categories', 'forms', 'form-submissions', 'media']) {
    await clearCollection(payload, slug)
  }

  await payload.updateGlobal({
    slug: 'header',
    data: { navItems: [] },
    overrideAccess: true,
    context: { disableRevalidate: true },
  })
  await payload.updateGlobal({
    slug: 'footer',
    data: { navItems: [] },
    overrideAccess: true,
    context: { disableRevalidate: true },
  })

  console.log('— 上传英雄图 …')
  const heroUpload = fileFromPath(HERO_PATH, '山间晨雾')
  const heroImage = await payload.create({
    collection: 'media',
    data: heroUpload.data,
    file: heroUpload.file,
    overrideAccess: true,
  })

  console.log('— 分类 …')
  const categoryTitles = new Set()
  const zhFiles = fs
    .readdirSync(WRITING_DIR)
    .filter((f) => f.endsWith('.md') && !LOCALE_SUFFIX.test(f))
    .sort()

  for (const f of zhFiles) {
    const raw = fs.readFileSync(path.join(WRITING_DIR, f), 'utf8')
    const { data } = parseFrontmatter(raw)
    if (data.category) categoryTitles.add(String(data.category))
  }

  const categoryIdByTitle = new Map()
  const categorySlugMap = {
    设计思考: 'design-thinking',
    技术实践: 'tech-practice',
    设计: 'design',
    工具推荐: 'tools',
    摄影: 'photography',
    工程实践: 'engineering',
  }
  for (const title of categoryTitles) {
    const slug =
      categorySlugMap[title] ||
      String(title)
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '') ||
      `cat-${categoryIdByTitle.size + 1}`
    const doc = await payload.create({
      collection: 'categories',
      data: { title, slug },
      overrideAccess: true,
      context: { disableRevalidate: true },
    })
    categoryIdByTitle.set(title, doc.id)
  }

  console.log(`— 导入写作 ${zhFiles.length} 篇 …`)
  const postIds = []
  for (const f of zhFiles) {
    const slug = f.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(WRITING_DIR, f), 'utf8')
    const { data, body } = parseFrontmatter(raw)
    const title = String(data.title || slug)
    const description = String(data.description || '')
    const categoryIds = data.category
      ? [categoryIdByTitle.get(String(data.category))].filter(Boolean)
      : []
    const publishedAt = data.pubDate
      ? new Date(String(data.pubDate)).toISOString()
      : new Date().toISOString()

    const doc = await payload.create({
      collection: 'posts',
      depth: 0,
      overrideAccess: true,
      context: { disableRevalidate: true },
      data: {
        title,
        slug,
        _status: 'published',
        publishedAt,
        authors: [author.id],
        categories: categoryIds,
        heroImage: heroImage.id,
        content: markdownToLexical(body),
        meta: {
          title,
          description,
          image: heroImage.id,
        },
      },
    })
    postIds.push(doc.id)
    process.stdout.write(`  · ${slug}\n`)
  }

  console.log('— 联系表单 …')
  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    overrideAccess: true,
    data: {
      title: '联系表单',
      submitButtonLabel: '发送',
      confirmationType: 'message',
      confirmationMessage: richRoot([
        heading('h2', '已收到'),
        paragraph([text('谢谢来信，我会尽快回复。')]),
      ]),
      fields: [
        {
          name: 'name',
          blockType: 'text',
          label: '称呼',
          required: true,
          width: 50,
        },
        {
          name: 'email',
          blockType: 'email',
          label: '邮箱',
          required: true,
          width: 50,
        },
        {
          name: 'message',
          blockType: 'textarea',
          label: '内容',
          required: true,
          width: 100,
        },
      ],
    },
  })

  console.log('— 页面 …')
  const homePage = await payload.create({
    collection: 'pages',
    depth: 0,
    overrideAccess: true,
    context: { disableRevalidate: true },
    data: {
      title: '首页',
      slug: 'home',
      _status: 'published',
      hero: {
        type: 'highImpact',
        media: heroImage.id,
        richText: richRoot([
          heading('h1', 'Alexander Carter'),
          paragraph([text('摄影与写作之外，也在做 LLM Agent 研究。')]),
        ]),
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: '阅读写作',
              url: '/posts',
            },
          },
          {
            link: {
              type: 'custom',
              appearance: 'outline',
              label: '关于我',
              url: '/about',
            },
          },
        ],
      },
      layout: [
        {
          blockType: 'content',
          columns: [
            {
              size: 'twoThirds',
              richText: richRoot([
                heading('h2', '这是一间慢慢长出来的工作室'),
                paragraph([
                  text(
                    '摄影记录光线的温度，写作整理实践里的取舍。页面改完就能读，尽量让键盘与屏幕阅读器也能顺利走完路径。',
                  ),
                ]),
              ]),
              enableLink: true,
              link: {
                type: 'custom',
                appearance: 'default',
                label: '关于我 →',
                url: '/about',
              },
            },
            {
              size: 'oneThird',
              richText: richRoot([
                heading('h3', '正在打磨'),
                paragraph([text('影像整理')]),
                paragraph([text('写作与深读')]),
                paragraph([text('小工具索引')]),
              ]),
            },
          ],
        },
        {
          blockType: 'archive',
          populateBy: 'collection',
          relationTo: 'posts',
          limit: 5,
          introContent: richRoot([
            heading('h2', '近期写作'),
            paragraph([text('不会很快过期的思考，按时间往回翻。')]),
          ]),
        },
        {
          blockType: 'cta',
          richText: richRoot([
            heading('h2', '想聊聊？'),
            paragraph([text('技术讨论、项目合作或随便打个招呼，都欢迎。')]),
          ]),
          links: [
            {
              link: {
                type: 'custom',
                appearance: 'default',
                label: '联系我',
                url: '/contact',
              },
            },
            {
              link: {
                type: 'custom',
                appearance: 'outline',
                label: 'GitHub',
                url: 'https://github.com/AlexanderJ-Carter',
                newTab: true,
              },
            },
          ],
        },
      ],
      meta: {
        title: 'Alexander Carter',
        description: '摄影与写作之外，也在做 LLM Agent 研究。',
        image: heroImage.id,
      },
    },
  })

  const aboutPage = await payload.create({
    collection: 'pages',
    depth: 0,
    overrideAccess: true,
    context: { disableRevalidate: true },
    data: {
      title: '关于',
      slug: 'about',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: richRoot([
          heading('h1', 'About'),
          paragraph([text('Replace this page in CMS with your own bio (keep it behind the visitor gate).')]),
        ]),
      },
      layout: [
        contentBlock('Hello', [
          'This is placeholder about content from migrate-site. Edit in Admin after import.',
        ]),
        contentBlock('Research', [
          'Public papers belong in instance/config.json → research.publications, not in this CMS blurb.',
        ]),
      ],
      meta: {
        title: 'About',
        description: 'Personal bio (gated).',
        image: heroImage.id,
      },
    },
  })

  const contactPage = await payload.create({
    collection: 'pages',
    depth: 0,
    overrideAccess: true,
    context: { disableRevalidate: true },
    data: {
      title: '联系',
      slug: 'contact',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: richRoot([
          heading('h1', '联系'),
          paragraph([text('合作、反馈或打个招呼都可以。')]),
        ]),
      },
      layout: [
        {
          blockType: 'formBlock',
          enableIntro: true,
          form: contactForm.id,
          introContent: richRoot([
            heading('h3', '发一封短讯'),
            paragraph([text('留下称呼与邮箱，我会尽快回复。')]),
          ]),
        },
      ],
      meta: {
        title: '联系',
        description: '合作、反馈或打个招呼都可以。',
        image: heroImage.id,
      },
    },
  })

  console.log('— 导航 …')
  await payload.updateGlobal({
    slug: 'header',
    overrideAccess: true,
    context: { disableRevalidate: true },
    data: {
      navItems: [
        {
          link: {
            type: 'custom',
            label: '写作',
            url: '/posts',
          },
        },
        {
          link: {
            type: 'custom',
            label: '画廊',
            url: '/gallery',
          },
        },
        {
          link: {
            type: 'custom',
            label: '玩乐',
            url: '/fun',
          },
        },
        {
          link: {
            type: 'reference',
            label: '关于',
            reference: {
              relationTo: 'pages',
              value: aboutPage.id,
            },
          },
        },
        {
          link: {
            type: 'reference',
            label: '联系',
            reference: {
              relationTo: 'pages',
              value: contactPage.id,
            },
          },
        },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    overrideAccess: true,
    context: { disableRevalidate: true },
    data: {
      navItems: [
        {
          link: {
            type: 'custom',
            label: '写作',
            url: '/posts',
          },
        },
        {
          link: {
            type: 'custom',
            label: '画廊',
            url: '/gallery',
          },
        },
        {
          link: {
            type: 'custom',
            label: '玩乐',
            url: '/fun',
          },
        },
        {
          link: {
            type: 'reference',
            label: '关于',
            reference: {
              relationTo: 'pages',
              value: aboutPage.id,
            },
          },
        },
        {
          link: {
            type: 'custom',
            label: '后台',
            url: '/admin',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'GitHub',
            newTab: true,
            url: 'https://github.com/AlexanderJ-Carter',
          },
        },
      ],
    },
  })

  console.log(
    `完成：home=${homePage.id} about=${aboutPage.id} contact=${contactPage.id} posts=${postIds.length}`,
  )
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
