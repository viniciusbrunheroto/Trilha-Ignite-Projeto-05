import Stripe from 'stripe'

export const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_KEY!, {
  apiVersion: '2024-09-30.acacia',
  appInfo: {
    name: 'Ignite Shop',
  }
})
