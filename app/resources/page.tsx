'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Video, BookOpen, ArrowRight } from "lucide-react"

const resources = [
  {
    id: '1',
    title: 'VITEEE Physics Study Material',
    description: 'Complete physics study material covering all VITEEE topics',
    type: 'pdf',
    link: '/resources/physics-material',
    icon: FileText,
    color: 'text-red-500'
  },
  {
    id: '2',
    title: 'Chemistry Formula Sheet',
    description: 'Quick reference guide for all important chemistry formulas',
    type: 'pdf',
    link: '/resources/chemistry-formulas',
    icon: FileText,
    color: 'text-red-500'
  },
  {
    id: '3',
    title: 'Math Problem Solving Techniques',
    description: 'Video tutorials on advanced mathematical problem solving',
    type: 'video',
    link: '/resources/math-tutorials',
    icon: Video,
    color: 'text-blue-500'
  },
  {
    id: '4',
    title: 'Previous Year Questions',
    description: 'Last 5 years VITEEE question papers with solutions',
    type: 'practice',
    link: '/resources/previous-papers',
    icon: BookOpen,
    color: 'text-green-500'
  }
]

const studyTips = [
  {
    title: 'Time Management',
    description: 'Learn to manage your time effectively during the exam',
    icon: FileText
  },
  {
    title: 'Practice Regularly',
    description: 'Consistent practice is key to success',
    icon: Video
  },
  {
    title: 'Focus on Weak Areas',
    description: 'Identify and improve your weak subjects',
    icon: BookOpen
  }
]

export default function Resources() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Study Resources</h1>
        <p className="text-muted-foreground text-lg text-center max-w-2xl">
          Access comprehensive study materials and resources to ace your VITEEE preparation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {resources.map((resource) => (
          <Card key={resource.id} className="group hover:shadow-lg transition-all">
            <Link href={resource.link}>
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className={`${resource.color} p-2 rounded-lg bg-muted`}>
                    <resource.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-primary group-hover:underline">
                  Access Resource
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Quick Downloads
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="link" className="w-full justify-start p-0">VITEEE Syllabus 2024</Button>
            <Button variant="link" className="w-full justify-start p-0">Important Formulas</Button>
            <Button variant="link" className="w-full justify-start p-0">Study Schedule</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="h-5 w-5 mr-2" />
              Video Lectures
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="link" className="w-full justify-start p-0">Physics Concepts</Button>
            <Button variant="link" className="w-full justify-start p-0">Chemistry Lab</Button>
            <Button variant="link" className="w-full justify-start p-0">Math Tricks</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Practice Material
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="link" className="w-full justify-start p-0">Chapter Tests</Button>
            <Button variant="link" className="w-full justify-start p-0">Previous Papers</Button>
            <Button variant="link" className="w-full justify-start p-0">Mock Tests</Button>
          </CardContent>
        </Card>
      </div>

      {/* Study Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Study Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studyTips.map((tip, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <tip.icon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{tip.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 