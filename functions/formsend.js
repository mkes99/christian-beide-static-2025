const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const MIN_RECAPTCHA_SCORE = 0.5;

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const field = (formData, key, maxLength) =>
  (formData.get(key) || "").toString().trim().slice(0, maxLength);

const json = (body, status) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

function toBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function isHuman(token, secret, ip) {
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        body,
      },
    );
    const result = await response.json();
    return (
      result.success === true &&
      result.action === "contactform" &&
      result.score >= MIN_RECAPTCHA_SCORE
    );
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error);
    return false;
  }
}

export async function onRequestPost({ request, env }) {
  const {
    RESEND_API_KEY,
    EMAIL_FROM_ADDRESS,
    EMAIL_TO_ADDRESS,
    RECAPTCHA_SECRET_KEY,
  } = env;
  if (
    !RESEND_API_KEY ||
    !EMAIL_FROM_ADDRESS ||
    !EMAIL_TO_ADDRESS ||
    !RECAPTCHA_SECRET_KEY
  ) {
    console.error("Email environment variables are not configured");
    return json({ ok: false, error: "Email is not configured" }, 500);
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return json({ ok: false, error: "Invalid form submission" }, 400);
  }

  const token = field(formData, "recaptchaToken", 4096);
  const ip = request.headers.get("CF-Connecting-IP");
  if (!(await isHuman(token, RECAPTCHA_SECRET_KEY, ip))) {
    return json({ ok: false, error: "reCAPTCHA check failed" }, 403);
  }

  const name = field(formData, "name", 200);
  const email = field(formData, "email", 320);
  const tel = field(formData, "tel", 50);
  const date = field(formData, "date", 50);
  const textarea = field(formData, "textarea", 2000);

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(
      { ok: false, error: "Name and a valid email are required" },
      400,
    );
  }

  const emailPayload = {
    from: EMAIL_FROM_ADDRESS,
    to: EMAIL_TO_ADDRESS,
    reply_to: email,
    subject: `Site Christian Biede - Contact form message from ${name.replace(/[\r\n]+/g, " ")}`,
    html: `
      Name: ${escapeHtml(name)}<br/>
      Email: ${escapeHtml(email)}<br/>
      Telephone: ${escapeHtml(tel)}<br/>
      Date of Birth: ${escapeHtml(date)}<br/>
      Message: ${escapeHtml(textarea).replace(/\n/g, "<br/>")}
    `,
  };

  const file = formData.get("file");
  if (file && typeof file !== "string" && file.size > 0) {
    if (!file.type.startsWith("image/")) {
      return json({ ok: false, error: "Attachment must be an image" }, 400);
    }
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return json(
        { ok: false, error: "Attachment is too large (5 MB max)" },
        413,
      );
    }
    emailPayload.attachments = [
      {
        filename: file.name,
        content: toBase64(await file.arrayBuffer()),
        contentType: file.type,
      },
    ];
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(emailPayload),
  });

  if (!resendResponse.ok) {
    console.error(
      "Resend error:",
      resendResponse.status,
      await resendResponse.text(),
    );
    return json({ ok: false, error: "Failed to send email" }, 500);
  }

  return json({ ok: true }, 200);
}
