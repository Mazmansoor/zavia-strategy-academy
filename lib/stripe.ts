import Stripe from 'stripe';
import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js';
import { ProductType, PRODUCTS } from './types';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Client-side Stripe promise (singleton)
let stripePromise: Promise<StripeJS | null>;

export function getStripe(): Promise<StripeJS | null> {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
}

// Price IDs from environment
export const STRIPE_PRICES = {
  canon: process.env.STRIPE_PRICE_CANON,
  guild: process.env.STRIPE_PRICE_GUILD,
  fellowship: process.env.STRIPE_PRICE_FELLOWSHIP,
  coaching: process.env.STRIPE_PRICE_COACHING,
} as const;

// Create checkout session for a product
export async function createCheckoutSession({
  userId,
  userEmail,
  product,
  successUrl,
  cancelUrl,
}: {
  userId: string;
  userEmail: string;
  product: ProductType;
  successUrl: string;
  cancelUrl: string;
}): Promise<Stripe.Checkout.Session> {
  const priceId = STRIPE_PRICES[product];

  if (!priceId) {
    throw new Error(`No price ID configured for product: ${product}`);
  }

  const productInfo = PRODUCTS[product];

  const session = await stripe.checkout.sessions.create({
    mode: product === 'fellowship' ? 'subscription' : 'payment',
    payment_method_types: ['card'],
    customer_email: userEmail,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
      product,
    },
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
  });

  return session;
}

// Retrieve checkout session
export async function getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['customer', 'line_items'],
  });
}

// Create or retrieve Stripe customer
export async function getOrCreateCustomer({
  email,
  name,
  userId,
}: {
  email: string;
  name: string;
  userId: string;
}): Promise<Stripe.Customer> {
  // Check if customer already exists
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0];
  }

  // Create new customer
  return stripe.customers.create({
    email,
    name,
    metadata: {
      userId,
    },
  });
}

// Create customer portal session
export async function createPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}): Promise<Stripe.BillingPortal.Session> {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

// Verify webhook signature
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

// Handle successful payment
export async function handleSuccessfulPayment(
  session: Stripe.Checkout.Session
): Promise<{
  userId: string;
  product: ProductType;
  amount: number;
  paymentId: string;
}> {
  const { userId, product } = session.metadata as {
    userId: string;
    product: ProductType;
  };

  return {
    userId,
    product,
    amount: session.amount_total || 0,
    paymentId: session.payment_intent as string,
  };
}
