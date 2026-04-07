import type { ContactPayload } from '~/app/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactPayload>(event)

  // Basic validation
  if (!body.name || !body.email || !body.service || !body.message) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  // TODO Phase 3: Integrate email provider (Resend / Nodemailer / SendGrid)
  // await sendEmail({ to: 'hello@metagendigital.com', ...body })

  console.log('[Contact form submission]', body)

  return { success: true, message: 'Message received. We will reply within 24 hours.' }
})
