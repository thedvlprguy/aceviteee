'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield } from "lucide-react"

const packages = {
  'viteee-basic': {
    title: 'VITEEE Basic Series',
    price: 299,
    originalPrice: 599,
    features: [
      '15 Full-length Mock Tests',
      'Basic Performance Analytics',
      'Topic-wise Practice Tests',
      'Previous Year Questions',
      '3 months access'
    ]
  },
  'viteee-complete': {
    title: 'VITEEE Complete Package',
    price: 499,
    originalPrice: 999,
    features: [
      '30 Full-length Mock Tests',
      'Advanced Analytics',
      'Video Solutions',
      'Topic-wise Practice Tests',
      'Previous Year Questions',
      '24/7 Expert Support',
      '6 months access'
    ]
  }
}

export default function CheckoutPage() {
  const params = useParams()
  const packageDetails = packages[params.id as keyof typeof packages]

  if (!packageDetails) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Package not found</h1>
        <Button asChild>
          <Link href="/test-series">Return to Test Series</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/test-series" className="flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Test Series
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>
              <div className="pt-4">
                <Button className="w-full" size="lg">
                  Pay ₹{packageDetails.price}
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Secure payment powered by Razorpay
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <Shield className="h-4 w-4 mr-2" />
            Your payment is secured with industry-standard encryption
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{packageDetails.title}</h3>
                    <p className="text-sm text-muted-foreground">Full access to test series</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{packageDetails.price}</div>
                    <div className="text-sm text-muted-foreground line-through">
                      ₹{packageDetails.originalPrice}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="mb-4">50% OFF</Badge>
                <div className="space-y-2">
                  {packageDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <svg
                        className="h-4 w-4 mr-2 text-green-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{packageDetails.originalPrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-green-600">-₹{packageDetails.originalPrice - packageDetails.price}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{packageDetails.price}</span>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
                <div className="font-semibold">100% Satisfaction Guarantee</div>
                <p className="text-muted-foreground">
                  Try it risk-free. If you're not satisfied with your purchase, contact us within 7 days for a full refund.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 