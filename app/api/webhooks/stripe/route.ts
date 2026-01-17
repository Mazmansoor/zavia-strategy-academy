import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature, handleSuccessfulPayment } from '@/lib/stripe';
import {
  grantCanonAccess,
  grantFellowshipAccess,
  recordPurchase,
} from '@/lib/db';
import { ProductType } from '@/lib/types';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  try {
    const event = verifyWebhookSignature(body, signature);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;

        // Get payment details
        const { userId, product, amount, paymentId } =
          await handleSuccessfulPayment(session);

        // Record the purchase
        await recordPurchase({
          userId,
          product,
          amount,
          currency: 'usd',
          date: new Date(),
          stripePaymentId: paymentId,
          stripeSessionId: session.id,
          status: 'completed',
        });

        // Grant appropriate access
        switch (product as ProductType) {
          case 'canon':
            await grantCanonAccess(userId);
            break;
          case 'fellowship':
            await grantFellowshipAccess(userId);
            break;
          // Guild access is granted manually after application approval
          // Coaching doesn't grant any special access
        }

        console.log(`Successfully processed purchase: ${product} for user ${userId}`);
        break;
      }

      case 'customer.subscription.deleted': {
        // Handle fellowship subscription cancellation
        const subscription = event.data.object;
        const userId = subscription.metadata?.userId;

        if (userId) {
          // Note: We might want to mark fellowship membership as inactive
          // but keep their history. For now, log it.
          console.log(`Fellowship subscription cancelled for user ${userId}`);
        }
        break;
      }

      case 'invoice.payment_failed': {
        // Handle failed payment for subscriptions
        const invoice = event.data.object;
        console.log(`Payment failed for invoice ${invoice.id}`);
        // Could send notification to user
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}
