import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

// Call Razorpay REST API via fetch (no npm SDK — works natively in CF Workers)
async function razorpayFetch(path, method, body, env) {
  const credentials = btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`);
  const res = await fetch(`https://api.razorpay.com/v1${path}`, {
    method,
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error('Razorpay API error:', JSON.stringify(data));
    throw new Error(data?.error?.description || `Razorpay ${path} failed: ${res.status}`);
  }
  return data;
}

// HMAC-SHA256 using Web Crypto API (100% native CF Workers — no Node.js crypto needed)
async function hmacSHA256hex(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// ── Create Order ──────────────────────────────────────────────────────────────
app.post('/api/create-order', async (c) => {
  try {
    console.log('create-order: start');

    const order = await razorpayFetch('/orders', 'POST', {
      amount: 99900, // ₹999 in paise
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    }, c.env);

    await c.env.DB.prepare(
      'INSERT INTO payments (order_id, amount, status) VALUES (?, ?, ?)'
    ).bind(order.id, order.amount, 'pending').run();

    console.log('create-order: success, order_id =', order.id);
    return c.json({ success: true, order });
  } catch (error) {
    console.error('create-order: ERROR:', error.message);
    return c.json({ success: false, error: error.message || 'Failed to create order' }, 500);
  }
});

// ── Verify Payment ────────────────────────────────────────────────────────────
app.post('/api/verify-payment', async (c) => {
  try {
    console.log('verify-payment: start');

    const body = await c.req.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      name,
      email,
      phone,
    } = body;

    console.log('verify-payment: payment_id =', razorpay_payment_id, '| order_id =', razorpay_order_id);

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      console.error('verify-payment: missing required fields');
      return c.json({ success: false, message: 'Missing payment fields' }, 400);
    }

    // ── Signature verification using Web Crypto API ───────────────────────────
    const message = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = await hmacSHA256hex(c.env.RAZORPAY_KEY_SECRET, message);

    console.log('verify-payment: sig match =', generatedSignature === razorpay_signature);

    if (generatedSignature !== razorpay_signature) {
      console.error('verify-payment: INVALID SIGNATURE');
      return c.json({ success: false, message: 'Invalid signature' }, 400);
    }

    // ── Update DB ─────────────────────────────────────────────────────────────
    const result = await c.env.DB.prepare(
      'UPDATE payments SET payment_id = ?, signature = ?, name = ?, email = ?, phone = ?, status = ? WHERE order_id = ?'
    ).bind(
      razorpay_payment_id,
      razorpay_signature,
      name ?? null,
      email ?? null,
      phone ?? null,
      'success',
      razorpay_order_id
    ).run();

    console.log('verify-payment: DB updated, rows changed =', result.meta?.changes);

    // ── Send welcome email via Resend ─────────────────────────────────────────
    if (email) {
      const firstName = name ? name.split(' ')[0] : 'there';
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Dhandha School</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#141414;border-radius:20px;overflow:hidden;border:1px solid #2a2a2a;">
        <tr>
          <td style="background:#FFD93D;padding:32px 40px;text-align:center;">
            <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:3px;color:#0d0d0d;text-transform:uppercase;">Dhandha School</p>
            <h1 style="margin:8px 0 0;font-size:30px;font-weight:800;color:#0d0d0d;line-height:1.2;">You're In, ${firstName}! 🎉</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 12px;font-size:15px;color:#d1d5db;line-height:1.7;">Congratulations! Your payment is confirmed and your seat for <strong style="color:#FFD93D;">Finance for Builders – Cohort 02</strong> is locked in.</p>
            <p style="margin:0 0 32px;font-size:15px;color:#d1d5db;line-height:1.7;">Here are your session details:</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e1e1e;border:1px solid #2d2d2d;border-radius:14px;margin-bottom:16px;overflow:hidden;">
              <tr><td style="padding:20px 24px;">
                <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:2px;color:#FFD93D;text-transform:uppercase;">Day 1</p>
                <p style="margin:0 0 14px;font-size:17px;font-weight:700;color:#fff;">July 25 (Saturday) · 2 PM</p>
                <a href="https://us06web.zoom.us/j/89570675130?pwd=gctv1madA3WglS2TpYhPFHviogh5L0.1" style="display:inline-block;background:#FFD93D;color:#0d0d0d;font-weight:700;font-size:14px;padding:10px 22px;border-radius:8px;text-decoration:none;margin-bottom:14px;">Join Zoom Session →</a>
                <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.7;">Meeting ID: <strong style="color:#d1d5db;">895 7067 5130</strong><br/>Passcode: <strong style="color:#d1d5db;">462411</strong></p>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e1e1e;border:1px solid #2d2d2d;border-radius:14px;margin-bottom:28px;overflow:hidden;">
              <tr><td style="padding:20px 24px;">
                <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:2px;color:#FFD93D;text-transform:uppercase;">Day 2</p>
                <p style="margin:0 0 14px;font-size:17px;font-weight:700;color:#fff;">July 26 (Sunday) · 2 PM</p>
                <a href="https://us06web.zoom.us/j/88408415840?pwd=T210xUBJowQLKgtDR74eSbUu6XIAAX.1" style="display:inline-block;background:#FFD93D;color:#0d0d0d;font-weight:700;font-size:14px;padding:10px 22px;border-radius:8px;text-decoration:none;margin-bottom:14px;">Join Zoom Session →</a>
                <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.7;">Meeting ID: <strong style="color:#d1d5db;">884 0841 5840</strong><br/>Passcode: <strong style="color:#d1d5db;">253225</strong></p>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0c3d2a;border:1px solid #1a5c3a;border-radius:14px;margin-bottom:28px;overflow:hidden;">
              <tr><td style="padding:20px 24px;text-align:center;">
                <p style="margin:0 0 6px;font-size:14px;color:#6ee7b7;">Join the WhatsApp Community</p>
                <p style="margin:0 0 16px;font-size:13px;color:#9ca3af;line-height:1.6;">Cohort announcements, discussions &amp; networking with fellow builders.</p>
                <a href="https://chat.whatsapp.com/HFcD0IULO1XGgtDGGf46C0" style="display:inline-block;background:#25D366;color:#fff;font-weight:700;font-size:14px;padding:12px 28px;border-radius:10px;text-decoration:none;">💬 Join WhatsApp Group</a>
              </td></tr>
            </table>
            <p style="margin:0;font-size:15px;color:#d1d5db;line-height:1.7;">See you in the session!</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0d0d0d;padding:24px 40px;text-align:center;border-top:1px solid #1f1f1f;">
            <p style="margin:0;font-size:13px;color:#6b7280;">— Team Dhandha School</p>
            <p style="margin:8px 0 0;font-size:12px;color:#4b5563;">© 2026 Dhandha School · Made in India</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${c.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Dhandha School <onboarding@resend.dev>',
            to: [email],
            subject: "Welcome to Dhandha School – You're In!",
            html,
          }),
        });
        const emailData = await emailRes.json();
        console.log('verify-payment: email sent, status =', emailRes.status, JSON.stringify(emailData));
      } catch (err) {
        console.error('verify-payment: email failed:', err.message);
      }
    }

    return c.json({ success: true, message: 'Payment verified successfully' });

  } catch (error) {
    console.error('verify-payment: FATAL ERROR:', error.message, error.stack);
    return c.json({ success: false, error: 'Failed to verify payment' }, 500);
  }
});

export default app;
