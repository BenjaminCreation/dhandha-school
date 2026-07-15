
require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
const Database = require("better-sqlite3");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
const db = new Database("./dhandha-school.db");

// Create payments table if doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    payment_id TEXT NOT NULL,
    order_id TEXT NOT NULL,
    signature TEXT,
    name TEXT,
    email TEXT,
    phone TEXT,
    amount INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ── Nodemailer transporter (Gmail + App Password) ──────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,       // founder.dhandhaschool@gmail.com
    pass: process.env.GMAIL_APP_PASS,   // 16-char Google App Password
  },
});

// ── Welcome email helper ───────────────────────────────────────────────────
async function sendWelcomeEmail(name, email) {
  const firstName = name ? name.split(" ")[0] : "there";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Dhandha School</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#141414;border-radius:20px;overflow:hidden;border:1px solid #2a2a2a;">

          <!-- Header -->
          <tr>
            <td style="background:#FFD93D;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:3px;color:#0d0d0d;text-transform:uppercase;">Dhandha School</p>
              <h1 style="margin:8px 0 0;font-size:30px;font-weight:800;color:#0d0d0d;line-height:1.2;">You're In, ${firstName}! 🎉</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 12px;font-size:15px;color:#d1d5db;line-height:1.7;">
                Congratulations! Your payment is confirmed and your seat for
                <strong style="color:#FFD93D;">Finance for Builders – Cohort 02</strong> is locked in.
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#d1d5db;line-height:1.7;">
                Here are your session details:
              </p>

              <!-- Day 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e1e1e;border:1px solid #2d2d2d;border-radius:14px;margin-bottom:16px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:2px;color:#FFD93D;text-transform:uppercase;">Day 1</p>
                    <p style="margin:0 0 14px;font-size:17px;font-weight:700;color:#fff;">July 25 (Saturday) · 2 PM</p>
                    <a href="https://us06web.zoom.us/j/89570675130?pwd=gctv1madA3WglS2TpYhPFHviogh5L0.1"
                       style="display:inline-block;background:#FFD93D;color:#0d0d0d;font-weight:700;font-size:14px;padding:10px 22px;border-radius:8px;text-decoration:none;margin-bottom:14px;">
                      Join Zoom Session →
                    </a>
                    <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.7;">
                      Meeting ID: <strong style="color:#d1d5db;">895 7067 5130</strong><br/>
                      Passcode: <strong style="color:#d1d5db;">462411</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Day 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e1e1e;border:1px solid #2d2d2d;border-radius:14px;margin-bottom:28px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:2px;color:#FFD93D;text-transform:uppercase;">Day 2</p>
                    <p style="margin:0 0 14px;font-size:17px;font-weight:700;color:#fff;">July 26 (Sunday) · 2 PM</p>
                    <a href="https://us06web.zoom.us/j/88408415840?pwd=T210xUBJowQLKgtDR74eSbUu6XIAAX.1"
                       style="display:inline-block;background:#FFD93D;color:#0d0d0d;font-weight:700;font-size:14px;padding:10px 22px;border-radius:8px;text-decoration:none;margin-bottom:14px;">
                      Join Zoom Session →
                    </a>
                    <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.7;">
                      Meeting ID: <strong style="color:#d1d5db;">884 0841 5840</strong><br/>
                      Passcode: <strong style="color:#d1d5db;">253225</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- WhatsApp CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0c3d2a;border:1px solid #1a5c3a;border-radius:14px;margin-bottom:28px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;text-align:center;">
                    <p style="margin:0 0 6px;font-size:14px;color:#6ee7b7;">Join the WhatsApp Community</p>
                    <p style="margin:0 0 16px;font-size:13px;color:#9ca3af;line-height:1.6;">
                      Cohort announcements, discussions &amp; networking with fellow builders.
                    </p>
                    <a href="https://chat.whatsapp.com/HFcD0IULO1XGgtDGGf46C0"
                       style="display:inline-block;background:#25D366;color:#fff;font-weight:700;font-size:14px;padding:12px 28px;border-radius:10px;text-decoration:none;">
                      💬 Join WhatsApp Group
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:15px;color:#d1d5db;line-height:1.7;">
                See you in the session!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d0d0d;padding:24px 40px;text-align:center;border-top:1px solid #1f1f1f;">
              <p style="margin:0;font-size:13px;color:#6b7280;">
                — Team Dhandha School
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:#4b5563;">
                © 2026 Dhandha School · Made in India
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"Dhandha School" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Welcome to Dhandha School – You're In!",
    html,
  });
}

// Create Order Endpoint
app.post("/api/create-order", async (req, res) => {
  try {
    const options = {
      amount: 99900, // Amount in paise (₹999)
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);

    // Insert pending payment into DB
    const insertPayment = db.prepare(`
      INSERT INTO payments (order_id, amount, status) VALUES (?, ?, 'pending')
    `);
    insertPayment.run(order.id, order.amount);

    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
});

// Verify Payment Endpoint
app.post("/api/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      name,
      email,
      phone,
    } = req.body;

    // Verify signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Payment verified! Update DB
      const updatePayment = db.prepare(`
        UPDATE payments
        SET payment_id = ?, signature = ?, name = ?, email = ?, phone = ?, status = 'success'
        WHERE order_id = ?
      `);
      updatePayment.run(
        razorpay_payment_id,
        razorpay_signature,
        name,
        email,
        phone,
        razorpay_order_id
      );

      // ── Send welcome email (non-blocking) ───────────────────────────────
      if (email) {
        sendWelcomeEmail(name, email).catch((err) =>
          console.error("Welcome email failed:", err.message)
        );
      }

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      // Invalid signature
      res.json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to verify payment" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
