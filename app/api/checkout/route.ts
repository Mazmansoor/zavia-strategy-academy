import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession, STRIPE_PRICES } from '@/lib/stripe';
import { ProductType } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userEmail, product } = body as {
      userId: string;
      userEmail: string;
      product: ProductType;
    };

    // Validate input
    if (!userId || !userEmail || !product) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate product
    if (!['canon', 'guild', 'fellowship', 'coaching'].includes(product)) {
      return NextResponse.json(
        { error: 'Invalid product' },
        { status: 400 }
      );
    }

    // Check if price is configured
    if (!STRIPE_PRICES[product]) {
      return NextResponse.json(
        { error: 'Product pricing not configured' },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await createCheckoutSession({
      userId,
      userEmail,
      product,
      successUrl: `${baseUrl}/dashboard?purchase=success`,
      cancelUrl: `${baseUrl}/dashboard?purchase=cancelled`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
