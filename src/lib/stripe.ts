import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_placeholder', {
  apiVersion: '2026-02-25.clover',
  typescript: true,
})

export const PLANS = {
  single: {
    name: 'Single',
    price: 1900, // $19.00 in cents
    priceId: process.env.STRIPE_PRICE_ID_SINGLE!,
    mode: 'payment' as const,
  },
  pro: {
    name: 'Pro',
    price: 3900, // $39.00/month in cents
    priceId: process.env.STRIPE_PRICE_ID_PRO!,
    mode: 'subscription' as const,
  },
}
