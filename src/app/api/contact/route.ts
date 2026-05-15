import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { buildContactEmailContent } from './emailTemplate';

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

const MAX_NAME = 200;
const MAX_MESSAGE = 10000;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || name.length > MAX_NAME) {
    return NextResponse.json(
      { error: 'Name is required (max 200 characters).' },
      { status: 400 },
    );
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }
  if (!message || message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { error: 'Message is required (max 10000 characters).' },
      { status: 400 },
    );
  }

  const to = process.env.CONTACT_MAIL_TO?.trim();
  const host = process.env.SMTP_HOST?.trim();
  if (!to || !host) {
    return NextResponse.json(
      {
        error:
          'Contact email is not configured. Set CONTACT_MAIL_TO and SMTP_HOST on the server.',
      },
      { status: 503 },
    );
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from =
    process.env.CONTACT_MAIL_FROM?.trim() ||
    (user ? `"Portfolio contact" <${user}>` : `"Portfolio contact" <${to}>`);

  const transporter = nodemailer.createTransport({
    host,
    port: Number.isFinite(port) ? port : 587,
    secure,
    auth:
      user && pass
        ? {
            user,
            pass,
          }
        : undefined,
  });

  const subject = `[Portfolio] Message from ${name}`;
  const copyrightOwner =
    process.env.CONTACT_COPYRIGHT_NAME?.trim() || 'Md. Abdul Adud';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const { html, text } = buildContactEmailContent(name, email, message, {
    copyrightOwner,
    siteUrl,
  });

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });
  } catch (err: unknown) {
    console.error('[contact]', err);
    return NextResponse.json(
      { error: 'Could not send email. Check SMTP settings.' },
      { status: 502 },
    );
  }

  return NextResponse.json({
    data: null,
    message: 'Message sent successfully. I will get back to you soon.',
  });
}
