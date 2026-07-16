CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  payment_id TEXT,
  order_id TEXT NOT NULL,
  signature TEXT,
  name TEXT,
  email TEXT,
  phone TEXT,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
