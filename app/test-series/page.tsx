'use client'

import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/protected-route"

const testSeries = [
  {
    id: 'viteee-complete',
    title: 'VITEEE Complete Package',
    description: 'Comprehensive test series with detailed solutions',
    price: 499,
    originalPrice: 999,
    features: [
      '30 Full-length Mock Tests',
      'Detailed Solutions & Explanations',
      'Performance Analytics',
      'Topic-wise Practice Tests',
      'Previous Year Questions',
      '24/7 Doubt Support'
    ],
    badge: 'Most Popular'
  },
  {
    id: 'viteee-basic',
    title: 'VITEEE Basic Series',
    description: 'Essential practice tests for VITEEE preparation',
    price: 299,
    originalPrice: 599,
    features: [
      '15 Full-length Mock Tests',
      'Basic Performance Analytics',
      'Topic-wise Practice Tests',
      'Previous Year Questions'
    ]
  },
  {
    id: 'viteee-trial',
    title: 'VITEEE Trial Pack',
    description: 'Try before you buy with our trial package',
    price: 0,
    features: [
      '3 Full-length Mock Tests',
      'Basic Analytics',
      'Limited Time Access'
    ],
    badge: 'Free'
  }
]

export default function TestSeriesPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold mb-4">VITEEE Test Series</h1>
          <p className="text-muted-foreground text-lg text-center max-w-2xl">
            Prepare for VITEEE with our comprehensive test series. Practice with high-quality questions and detailed solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testSeries.map((series) => (
            <Card key={series.id} className="relative">
              {series.badge && (
                <Badge className="absolute top-4 right-4" variant={series.badge === 'Free' ? 'secondary' : 'default'}>
                  {series.badge}
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{series.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{series.description}</p>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">₹{series.price}</span>
                  {series.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through ml-2">₹{series.originalPrice}</span>
                  )}
                </div>
                <ul className="space-y-2">
                  {series.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
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
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={series.price === 0 ? 'secondary' : 'default'}
                  asChild
                >
                  <Link href={series.price === 0 ? `/test/${series.id}` : `/checkout/${series.id}`}>
                    {series.price === 0 ? 'Start Free Trial' : 'Buy Now'}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">100+</div>
            <div className="text-muted-foreground">Questions per Test</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-muted-foreground">Expert Support</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">98%</div>
            <div className="text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 