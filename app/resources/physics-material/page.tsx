'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink, Youtube } from "lucide-react"
import { Footer } from "@/components/footer"

const physicsResources = [
  {
    title: 'Mechanics Study Material',
    description: 'Comprehensive notes covering Newton\'s laws, circular motion, and rotational dynamics',
    downloadLink: '/resources/files/mechanics.pdf',
    type: 'PDF'
  },
  {
    title: 'Electromagnetism Notes',
    description: 'Complete guide to electromagnetic induction, Maxwell\'s equations, and AC circuits',
    downloadLink: '/resources/files/em.pdf',
    type: 'PDF'
  },
  {
    title: 'Optics Formula Sheet',
    description: 'Quick reference for all important formulas in ray and wave optics',
    downloadLink: '/resources/files/optics.pdf',
    type: 'PDF'
  }
]

const videoResources = [
  {
    title: 'Complete Physics for VITEEE',
    description: 'Comprehensive video lecture covering all VITEEE physics topics',
    link: 'https://www.youtube.com/live/Kdhaaw-xVm8?si=LMH0dfJ6W4rQQFhR',
    icon: Youtube
  }
]

export default function PhysicsMaterial() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-6 flex-1">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Physics Study Material</h1>
          <p className="text-muted-foreground text-lg text-center max-w-2xl">
            Access comprehensive physics study materials for VITEEE preparation
          </p>
        </div>

        {/* Video Resources */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Video Lectures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videoResources.map((resource, index) => (
                <Link 
                  key={index}
                  href={resource.link}
                  target="_blank"
                  className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <resource.icon className="h-8 w-8 text-red-500" />
                  <div>
                    <h3 className="font-semibold">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* PDF Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {physicsResources.map((resource, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {resource.description}
                </p>
                <Button className="w-full" asChild>
                  <Link href={resource.downloadLink} target="_blank">
                    <Download className="h-4 w-4 mr-2" />
                    Download {resource.type}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Reference */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Important Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Mechanics</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Newton's Laws of Motion</li>
                  <li>Rotational Dynamics</li>
                  <li>Gravitation</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Electromagnetism</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Electric Fields & Potential</li>
                  <li>Magnetic Effects</li>
                  <li>Electromagnetic Induction</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Modern Physics</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Photoelectric Effect</li>
                  <li>Nuclear Physics</li>
                  <li>Quantum Mechanics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
} 