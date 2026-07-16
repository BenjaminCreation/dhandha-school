# Deployment to Cloudflare (Free Plan)

## Overview
We'll deploy:
- **Frontend**: Cloudflare Pages (static hosting for Vite/React app)
- **Backend**: Cloudflare Workers (serverless API, using Hono)
- **Database**: Cloudflare D1 (SQLite DB)
- **Domain**: Connect your custom domain via Cloudflare

---

## Step 1: Setup Cloudflare Account & Install Wrangler

1. Create a free Cloudflare account: https://dash.cloudflare.com/sign-up
2. Install Wrangler CLI (Cloudflare's official tool):
   ```bash
   npm install -g wrangler
   ```
3. Authenticate Wrangler with your Cloudflare account:
   ```bash
   wrangler login
   ```

---

## Step 2: Deploy Backend (Workers + D1)

1. Go to the `cf-worker` directory:
   ```bash
   cd cf-worker
   npm install
   ```
2. Create a Cloudflare D1 database:
   ```bash
   npx wrangler d1 create dhandha-school-db
   ```
3. Copy the `database_id` from the output and paste it into `cf-worker/wrangler.toml` (replace the empty string in `database_id = ""`)
4. Run the database migration to create the `payments` table:
   ```bash
   npx wrangler d1 migrations apply dhandha-school-db --remote
   ```
5. Deploy the backend Worker:
   ```bash
   npm run deploy
   ```
6. After deployment, note your Worker URL (it will look like `https://dhandha-school-worker.<your-subdomain>.workers.dev`) — **you'll need this for later!**

---

## Step 3: Configure Backend Environment Variables

1. Go to your Cloudflare Dashboard → Workers & Pages → `dhandha-school-worker` → Settings → Variables
2. Add the following **Secrets** (encrypt them!):
   - `RAZORPAY_KEY_ID`: Your Razorpay public key
   - `RAZORPAY_KEY_SECRET`: Your Razorpay secret key
   - `GMAIL_USER`: Your Gmail address (e.g., founder.dhandhaschool@gmail.com)
   - `GMAIL_APP_PASS`: Google App Password for Gmail (create here: https://myaccount.google.com/apppasswords)

---

## Step 4: Deploy Frontend to Cloudflare Pages

Option A: Deploy automatically via GitHub (auto-deploy on push) — RECOMMENDED
1. Go to https://dash.cloudflare.com/ → Workers & Pages → Create application → Pages
2. Select "Connect to Git" and choose your dhandha-school repo
3. In Build settings:
   - Project name: `dhandha-school`
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - **IMPORTANT: Leave "Deploy command" BLANK!** (this avoids Wrangler conflicts)
4. Click "Save and Deploy"

Option B: Deploy via Wrangler CLI (manual)
1. Go back to the project root:
   ```bash
   cd ..
   npm install
   npm run build
   npx wrangler pages deploy dist --project-name=dhandha-school
   ```

---

## Step 5: Configure Frontend Environment Variables (CRITICAL!)

### 5.1 Frontend Variables (NOT Secrets!)
**Important**: Frontend variables (`VITE_*`) must be added as **Environment Variables**, NOT Secrets! Secrets are only for Functions/Workers.

1. Go to your Cloudflare Dashboard → Workers & Pages → `dhandha-school` → Settings → Environment variables
2. In the **Environment variables** section (NOT Secrets), add:
   - **Production**:
     - Name: `VITE_RAZORPAY_KEY_ID`
     - Value: `rzp_live_TC7SkkDsYqSrdp` (or your test key if using test mode)
3. Click "Save"
4. **REDEPLOY YOUR PAGES PROJECT** for changes to take effect! (Go to Deployments → Latest deployment → "Retry deployment")

### 5.2 Frontend Function Variables (Secrets)
1. Still in the Pages project settings → Environment variables
2. In the **Secrets** section, add:
   - **Production**:
     - Name: `BACKEND_WORKER_URL`
     - Value: Your backend Worker URL (from Step 2.6, e.g., `https://dhandha-school-worker.<your-subdomain>.workers.dev`)

---

## Step 6: Connect Custom Domain (Optional)

1. In Cloudflare Dashboard → Workers & Pages → `dhandha-school` → Custom domains
2. Click "Set up a custom domain" and follow the instructions to connect your domain!

---

## Checkout Flow Overview

Now that everything is set up:
1. User clicks "Join the Masterclass" → opens modal to enter name, email, phone
2. User proceeds → Frontend calls `/api/create-order` (proxied via Pages Function to backend Worker)
3. Backend creates Razorpay order and stores pending payment in D1 DB
4. Razorpay checkout opens with the order
5. Payment success → Frontend calls `/api/verify-payment`
6. Backend verifies payment signature, updates DB to "success", sends welcome email, returns success
7. User sees success screen with WhatsApp group link!

---

## Troubleshooting

- If you see "No key passed" error: Ensure `VITE_RAZORPAY_KEY_ID` is added as an **Environment Variable** (not Secret) and you've redeployed Pages!
- If you see 404/405 for `/api/*`: Ensure `BACKEND_WORKER_URL` is set as a Secret in Pages and the Pages Function is deployed!
