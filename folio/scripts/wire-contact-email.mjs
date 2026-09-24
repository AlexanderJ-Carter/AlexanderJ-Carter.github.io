#!/usr/bin/env node
/**
 * Wire forms_emails for Contact Form using container env.
 * Run: node /tmp/wire-contact-email.mjs
 */
import { execFileSync } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { writeFileSync } from 'node:fs'

const to = process.env.CONTACT_NOTIFY_EMAIL?.trim()
const fromAddr = process.env.EMAIL_FROM_ADDRESS?.trim() || 'noreply@alexander.xin'
const fromName = process.env.EMAIL_FROM_NAME?.trim() || 'Alexander Carter'
const from = `${fromName} <${fromAddr}>`

if (!to) {
  console.error('CONTACT_NOTIFY_EMAIL missing')
  process.exit(1)
}

function sqlStr(value) {
  return `'${String(value).replaceAll("'", "''")}'`
}

const message = JSON.stringify({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '称呼：{{name}}', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
      {
        type: 'paragraph',
        children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '邮箱：{{email}}', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
      {
        type: 'paragraph',
        children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '内容：', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
      {
        type: 'paragraph',
        children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '{{message}}', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const confirmation = JSON.stringify({
  root: {
    type: 'root',
    children: [
      {
        type: 'heading',
        children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '已收到，谢谢留言。', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        tag: 'h2',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const id = `ce-${randomBytes(6).toString('hex')}`
const sql = `DELETE FROM forms_emails WHERE _parent_id = 1;
INSERT INTO forms_emails (_order, _parent_id, id, email_to, reply_to, email_from, subject, message)
VALUES (1, 1, ${sqlStr(id)}, ${sqlStr(to)}, '{{email}}', ${sqlStr(from)}, ${sqlStr('站点联系表单：{{name}}')}, ${sqlStr(message)});
UPDATE forms SET
  title = 'Contact Form',
  submit_button_label = '发送',
  confirmation_type = 'message',
  confirmation_message = ${sqlStr(confirmation)}
WHERE id = 1;
SELECT id, email_to, subject FROM forms_emails;
`

const sqlPath = '/tmp/wire-contact-email.sql'
writeFileSync(sqlPath, sql)
execFileSync('sqlite3', ['/app/data/folio.db', `.read ${sqlPath}`], { stdio: 'inherit' })
console.log('wired contact form email')
