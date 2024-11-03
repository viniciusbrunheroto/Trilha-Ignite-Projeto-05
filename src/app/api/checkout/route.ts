import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET(request: Request) {


  const url = new URL(request.url)

  const priceId = url.searchParams.get('priceId')

  if (request.method !== 'GET') {
    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  if (!priceId) {
    return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
    );
  }

  const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: success_url,
    cancel_url: cancel_url,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });

  return NextResponse.json(
    {
      checkoutUrl: checkoutSession.url,
    },
    { status: 201 }
  );
}
