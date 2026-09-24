/**
 * 修正联系表单：通知站长（Resend），replyTo 为访客邮箱。
 * 用法：pnpm --dir folio exec node --import tsx scripts/configure-contact-form.mjs
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'
import { contactForm } from '../src/endpoints/seed/contact-form.ts'
import { contactNotifyAddress, emailFromHeader } from '../src/utilities/mail.ts'

async function main() {
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'forms',
    where: { title: { equals: 'Contact Form' } },
    limit: 1,
    overrideAccess: true,
  })

  const data = {
    ...contactForm,
    emails: contactForm.emails,
  }

  if (found.docs[0]) {
    await payload.update({
      collection: 'forms',
      id: found.docs[0].id,
      overrideAccess: true,
      data: {
        confirmationMessage: contactForm.confirmationMessage,
        confirmationType: 'message',
        emails: contactForm.emails,
        fields: contactForm.fields,
        submitButtonLabel: contactForm.submitButtonLabel,
      },
    })
    console.log('✓ 已更新 Contact Form')
  } else {
    await payload.create({
      collection: 'forms',
      overrideAccess: true,
      data,
    })
    console.log('✓ 已创建 Contact Form')
  }

  console.log(`  To:   ${contactNotifyAddress()}`)
  console.log(`  From: ${emailFromHeader()}`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
