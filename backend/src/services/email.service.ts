import { Resend } from 'resend';
import { env } from '../config/env';
import { logger } from '../utils/logger';

const resend = new Resend(env.RESEND_API_KEY);

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'collaboration' | 'hiring' | 'general';
}

export const sendContactEmail = async (payload: ContactPayload): Promise<void> => {
  const { name, email, subject, message, type } = payload;

  const typeLabel: Record<ContactPayload['type'], string> = {
    collaboration: '🤝 Collaboration',
    hiring: '💼 Hiring',
    general: '💬 General Inquiry',
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0d0a06; color: #f5f2ee; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 24px; }
        .header { border-bottom: 1px solid #2a2520; padding-bottom: 24px; margin-bottom: 24px; }
        .badge { display: inline-block; background: #f5a623; color: #0d0a06; padding: 4px 12px; border-radius: 9999px; font-size: 13px; font-weight: 600; }
        .field { margin-bottom: 16px; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #9a8f85; margin-bottom: 4px; }
        .value { font-size: 15px; color: #f5f2ee; }
        .message-box { background: #1a1510; border: 1px solid #2a2520; border-radius: 8px; padding: 16px; margin-top: 8px; line-height: 1.6; }
        .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #2a2520; font-size: 12px; color: #9a8f85; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0 0 8px 0; font-size:24px;">New Portfolio Message</h1>
          <span class="badge">${typeLabel[type]}</span>
        </div>
        <div class="field">
          <div class="label">From</div>
          <div class="value">${name} &lt;${email}&gt;</div>
        </div>
        <div class="field">
          <div class="label">Subject</div>
          <div class="value">${subject}</div>
        </div>
        <div class="field">
          <div class="label">Message</div>
          <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
        </div>
        <div class="footer">
          Sent from enockuwumukiza.dev portfolio contact form
        </div>
      </div>
    </body>
    </html>
  `;

  if (!env.RESEND_API_KEY) {
    // Dev mode — just log
    logger.info('📧 [DEV] Contact email would be sent:', { name, email, subject, type });
    return;
  }

  const { error } = await resend.emails.send({
    from: env.FROM_EMAIL,
    to: env.TO_EMAIL,
    replyTo: email,
    subject: `[Portfolio] ${typeLabel[type]}: ${subject}`,
    html,
  });

  if (error) {
    logger.error('Resend email error:', error);
    throw new Error('Failed to send email. Please try again.');
  }

  logger.info(`Contact email sent from ${name} <${email}>`);
};
