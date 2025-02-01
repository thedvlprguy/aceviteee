'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, BarChart, CheckCircle } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: '15 Full Tests',
    description: 'Complete mock tests with VITEEE pattern'
  },
  {
    icon: Clock,
    title: 'Timed Practice',
    description: 'Real exam environment simulation'
  },
  {
    icon: BarChart,
    title: 'Performance Analysis',
    description: 'Detailed subject-wise analysis'
  },
  {
    icon: CheckCircle,
    title: 'Topic Coverage',
    description: 'All important VITEEE topics covered'
  }
]

const syllabus = [
  {
    subject: 'Physics',
    topics: ['Mechanics', 'Electromagnetism', 'Optics', 'Modern Physics']
  },
  {
    subject: 'Chemistry',
    topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry']
  },
  {
    subject: 'Mathematics',
    topics: ['Algebra', 'Calculus', 'Trigonometry', 'Geometry']
  }
]

export default function VITEEEBasic() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center mb-12">
        <Badge variant="secondary" className="mb-4">VITEEE Basic Series</Badge>
        <h1 className="text-4xl font-bold mb-4">Essential Test Series Package</h1>
        <p className="text-muted-foreground text-lg text-center max-w-2xl mb-6">
          Perfect for students starting their VITEEE preparation journey
        </p>
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold">₹299</span>
          <span className="text-muted-foreground line-through">₹599</span>
          <Badge variant="destructive">50% OFF</Badge>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <feature.icon className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Syllabus Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>What You'll Get</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {syllabus.map((subject, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-lg">{subject.subject}</h3>
                <ul className="space-y-1">
                  {subject.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Ready to Start Your Preparation?</h2>
            <p className="text-muted-foreground">Get instant access to all practice tests and study materials</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/checkout/viteee-basic">Buy Now at ₹299</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/test-series">View All Packages</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 