function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2br(escaped: string): string {
  return escaped.replace(/\r\n/g, '\n').replace(/\n/g, '<br />');
}

/** Minimal escaping for use inside a double-quoted `href` attribute */
function escapeHrefAttr(url: string): string {
  return url.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

export type ContactEmailFooter = {
  /** Shown after © symbol in the footer bar */
  copyrightOwner: string;
  /** Optional public site URL (e.g. NEXT_PUBLIC_SITE_URL) for a subtle link */
  siteUrl?: string;
};

export function buildContactEmailContent(
  name: string,
  email: string,
  message: string,
  footer: ContactEmailFooter,
): { html: string; text: string } {
  const year = new Date().getFullYear();
  const { copyrightOwner, siteUrl } = footer;
  const safeCopyrightOwner = escapeHtml(copyrightOwner);
  const safeSiteHref =
    siteUrl?.trim() && /^https?:\/\//i.test(siteUrl.trim())
      ? siteUrl.trim()
      : undefined;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const mailtoEmail = encodeURIComponent(email);
  const safeMessage = nl2br(escapeHtml(message));

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    message,
    '',
    '— Sent from your portfolio contact form',
    'Reply-To is set — you can reply from your inbox normally.',
    '',
    `© ${year} ${copyrightOwner}. All rights reserved.`,
    ...(safeSiteHref ? [`${safeSiteHref}`] : []),
  ].join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>New contact message</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;-webkit-font-smoothing:antialiased;">
  <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">
    ${safeName} sent a message from your portfolio.
  </span>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;margin:0 auto;">
          <tr>
            <td style="border-radius:16px 16px 0 0;background:linear-gradient(135deg,#18181b 0%,#3f3f46 100%);padding:28px 32px;">
              <p style="margin:0 0 6px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#a1a1aa;">
                Portfolio
              </p>
              <h1 style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:700;line-height:1.3;color:#fafafa;">
                New message
              </h1>
              <p style="margin:8px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.5;color:#d4d4d8;">
                Someone reached out through your contact form.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#ffffff;border-left:1px solid #e4e4e7;border-right:1px solid #e4e4e7;padding:0 1px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:24px 28px 8px 28px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0 12px;">
                      <tr>
                        <td style="padding:0;">
                          <p style="margin:0 0 4px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#71717a;">
                            Name
                          </p>
                          <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:16px;font-weight:600;color:#18181b;">
                            ${safeName}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0;border-top:1px solid #f4f4f5;"></td>
                      </tr>
                      <tr>
                        <td style="padding:0;">
                          <p style="margin:0 0 4px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#71717a;">
                            Email
                          </p>
                          <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;color:#4338ca;">
                            <a href="mailto:${mailtoEmail}" style="color:#4f46e5;text-decoration:none;font-weight:500;">
                              ${safeEmail}
                            </a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 28px 8px 28px;">
                    <p style="margin:0 0 10px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#71717a;">
                      Message
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="border-radius:12px;background-color:#fafafa;border:1px solid #e4e4e7;border-left:4px solid #6366f1;padding:18px 20px;">
                          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.65;color:#27272a;word-break:break-word;">
                            ${safeMessage}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 28px 28px 28px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="border-radius:10px;background:linear-gradient(135deg,#4f46e5 0%,#6366f1 100%);box-shadow:0 2px 8px rgba(79,70,229,0.35);">
                          <a href="mailto:${mailtoEmail}?subject=${encodeURIComponent('Re: Portfolio inquiry')}"
                             style="display:inline-block;padding:12px 22px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                            Reply to ${escapeHtml(name.trim().split(/\s+/)[0] || 'sender')}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#fafafa;border-left:1px solid #e4e4e7;border-right:1px solid #e4e4e7;border-bottom:none;padding:18px 28px 20px 28px;">
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:12px;line-height:1.55;color:#71717a;text-align:center;">
                Sent automatically from your portfolio contact form.<br />
                Reply-To is set — you can reply from your inbox normally.
              </p>
            </td>
          </tr>
          <tr>
            <td style="border-radius:0 0 16px 16px;background-color:#18181b;border:1px solid #27272a;border-top:1px solid #3f3f46;padding:14px 24px 16px 24px;">
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.09em;text-transform:uppercase;color:#d4d4d8;text-align:center;">
                © ${year} ${safeCopyrightOwner}. All rights reserved.
              </p>
              ${safeSiteHref
                ? `<p style="margin:10px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:12px;line-height:1.5;color:#a1a1aa;text-align:center;">
                <a href="${escapeHrefAttr(safeSiteHref)}"
                   style="color:#a5b4fc;text-decoration:none;border-bottom:1px solid rgba(165,180,252,0.45);">
                  Visit portfolio website
                </a>
              </p>`
                : ''}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { html, text };
}
