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
6. After deployment, note your Worker URL (it will look like `https://dhandha-school-worker.<your-subdomain>.workers.dev`)

---

## Step 3: Configure Backend Environment Variables

1. Go to your Cloudflare Dashboard → Workers & Pages → `dhandha-school-worker` → Settings → Variables
2. Add the following environment variables (Secrets):
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `GMAIL_USER` (e.g., founder.dhandhaschool@gmail.com)
   - `GMAIL_APP_PASS` (Google App Password for Gmail, see: https://myaccount.google.com/apppasswords)

---

## Step 4: Update Frontend (if needed)

If you want the frontend to make API calls to your Worker URL instead of relative paths (though Cloudflare can proxy), you can, but for now let's proceed.

---

## Step 5: Deploy Frontend to Cloudflare Pages

Option A: Deploy via Wrangler CLI (manual)
1. Go back to the project root:
   ```bash
   cd ..
   ```
2. Build the frontend for production:
   ```bash
   npm install
   npm run build
   ```
3. Deploy to Cloudflare Pages:
   ```bash
   npx wrangler pages deploy dist --project-name=dhandha-school
   ```

Option B: Deploy automatically via GitHub (auto-deploy on push)
1. Go to https://dash.cloudflare.com/ → Workers & Pages → Create application → Pages
2. Select "Connect to Git" and choose your dhandha-school repo
3. In Build settings:
   - Project name: `dhandha-school`
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - **IMPORTANT: Leave "Deploy command" BLANK!** (this is what caused your earlier error!)
4. Click "Save and Deploy"

---

## Step 6: Configure Frontend Environment Variables (Razorpay Key)

1. Go to your Cloudflare Dashboard → Workers & Pages → `dhandha-school` → Settings → Environment variables
2. Add a production environment variable:
   - Name: `VITE_RAZORPAY_KEY_ID`
   - Value: Your Razorpay Key ID

---

## Step 7: Connect Custom Domain

1. In Cloudflare Dashboard → Workers & Pages → `dhandha-school` → Custom domains
2. Click "Set up a custom domain" and follow the instructions to connect your domain!

---

## Optional: Proxy API Requests from Pages to Worker (Clean URLs)

If you want your frontend to call `/api/*` instead of your Worker's full URL, you can set up a Cloudflare Pages Function or a Worker Route. Let me know if you want help with that!
