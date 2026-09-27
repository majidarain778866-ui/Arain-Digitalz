/**
 * Gmail REST API helper for sending direct emails to majidarain778866@gmail.com
 */

export const RECIPIENT_EMAIL = "majidarain778866@gmail.com";

interface SendGmailParams {
  accessToken: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  phone?: string;
  projectType?: string;
}

/**
 * Encodes string to Base64URL (RFC 4648 §5) with full UTF-8 character support
 */
function toBase64Url(input: string): string {
  const utf8Bytes = new TextEncoder().encode(input);
  let binaryString = "";
  for (let i = 0; i < utf8Bytes.length; i++) {
    binaryString += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binaryString)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Sends a real email via Gmail API to majidarain778866@gmail.com
 */
export async function sendEmailViaGmail({
  accessToken,
  senderName,
  senderEmail,
  subject,
  message,
  phone,
  projectType,
}: SendGmailParams): Promise<{ id: string; threadId: string }> {
  // Construct formatted email body
  const bodyContent = [
    `New message sent from website by ${senderName} (${senderEmail}):`,
    ``,
    `--------------------------------------------------`,
    `Sender Name:   ${senderName}`,
    `Sender Email:  ${senderEmail}`,
    phone ? `Phone / WhatsApp: ${phone}` : null,
    projectType ? `Project Category: ${projectType}` : null,
    `Date & Time:   ${new Date().toUTCString()}`,
    `--------------------------------------------------`,
    ``,
    `Message:`,
    message,
    ``,
    `--`,
    `Sent securely using Gmail API from Arain Digitalz Portfolio`,
  ]
    .filter((line) => line !== null)
    .join("\r\n");

  // Construct RFC 2822 email format
  const rawEmail = [
    `From: "${senderName.replace(/"/g, '\\"')}" <${senderEmail}>`,
    `To: <${RECIPIENT_EMAIL}>`,
    `Reply-To: "${senderName.replace(/"/g, '\\"')}" <${senderEmail}>`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(`[Arain Digitalz Inquiry] ${subject}`)))}?=`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: 7bit`,
    ``,
    bodyContent,
  ].join("\r\n");

  const base64UrlEncoded = toBase64Url(rawEmail);

  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      raw: base64UrlEncoded,
    }),
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    const errorMessage = errorJson?.error?.message || `Gmail API error (${response.status})`;
    throw new Error(errorMessage);
  }

  const result = await response.json();
  return result;
}
