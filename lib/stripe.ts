import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
})

const PACK_PRICES: { [key: string]: string } = {
  basic: "price_1234567890",
  standard: "price_2345678901",
  premium: "price_3456789012",
}

export async function getStripeCheckoutUrl(pack: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "upi"],
    line_items: [
      {
        price: PACK_PRICES[pack],
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?canceled=true`,
  })

  return session.url!
}

