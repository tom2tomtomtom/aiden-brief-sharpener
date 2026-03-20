#!/bin/bash
# AIDEN Landing Page Generator - Deployment Script
# Run: bash scripts/deploy.sh

set -e

echo "=== AIDEN Landing Page Generator - Deploy ==="
echo ""

# Check prerequisites
command -v vercel >/dev/null 2>&1 || { echo "ERROR: vercel CLI not installed. Run: npm i -g vercel"; exit 1; }
command -v supabase >/dev/null 2>&1 || { echo "ERROR: supabase CLI not installed. Run: brew install supabase/tap/supabase"; exit 1; }

# Step 1: Supabase
echo "--- Step 1: Supabase Setup ---"
echo "If you haven't already:"
echo "  1. Go to https://supabase.com/dashboard and create a new project"
echo "  2. Run: supabase link --project-ref YOUR_PROJECT_REF"
echo "  3. Run: supabase db push"
echo ""
read -p "Have you set up Supabase? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Set up Supabase first, then run this script again."
  exit 0
fi

# Step 2: Check env vars
echo ""
echo "--- Step 2: Environment Variables ---"
echo "You need these values for Vercel:"
echo ""
echo "  NEXT_PUBLIC_SUPABASE_URL      - from Supabase dashboard > Settings > API"
echo "  NEXT_PUBLIC_SUPABASE_ANON_KEY  - from Supabase dashboard > Settings > API"
echo "  SUPABASE_SERVICE_ROLE_KEY      - from Supabase dashboard > Settings > API"
echo "  ANTHROPIC_API_KEY              - from console.anthropic.com"
echo "  STRIPE_SECRET_KEY              - from Stripe dashboard > Developers > API keys"
echo "  STRIPE_WEBHOOK_SECRET          - created after deploy (Step 4)"
echo "  STRIPE_PRICE_ID_SINGLE         - from Stripe (create \$19 one-time product)"
echo "  STRIPE_PRICE_ID_PRO            - from Stripe (create \$39/mo subscription)"
echo "  NEXT_PUBLIC_URL                - your deployed URL (e.g. https://aiden-landing-gen.vercel.app)"
echo ""

# Step 3: Deploy to Vercel
echo "--- Step 3: Deploy ---"
read -p "Ready to deploy to Vercel? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Deploying..."
  vercel --prod
  echo ""
  echo "After deploy, set env vars in Vercel dashboard > Settings > Environment Variables"
fi

# Step 4: Stripe webhook
echo ""
echo "--- Step 4: Stripe Webhook ---"
echo "After deploy:"
echo "  1. Go to Stripe Dashboard > Developers > Webhooks"
echo "  2. Add endpoint: YOUR_URL/api/webhooks/stripe"
echo "  3. Select events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted"
echo "  4. Copy the webhook signing secret"
echo "  5. Add STRIPE_WEBHOOK_SECRET to Vercel env vars"
echo "  6. Redeploy: vercel --prod"
echo ""

# Step 5: Verify
echo "--- Step 5: Verify ---"
echo "Visit YOUR_URL/api/health to check all services are connected."
echo ""
echo "Done! Your AIDEN Landing Page Generator is live."
