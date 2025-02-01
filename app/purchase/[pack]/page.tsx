import { Button } from "@/components/ui/button"
import { getStripeCheckoutUrl } from "@/lib/stripe"

export default async function PurchasePage({ params }: { params: { pack: string } }) {
  const checkoutUrl = await getStripeCheckoutUrl(params.pack)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Purchase {params.pack} Pack</h1>
      <Button asChild>
        <a href={checkoutUrl}>Proceed to Checkout</a>
      </Button>
    </div>
  )
}

