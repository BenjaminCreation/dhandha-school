
require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
const Database = require("better-sqlite3");

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
