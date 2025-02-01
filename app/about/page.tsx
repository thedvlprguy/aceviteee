'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Youtube, Github, Twitter, ExternalLink } from "lucide-react"
import { Footer } from "@/components/footer"

const teamMembers = [
  {
    name: 'Naval',
    role: 'Full Stack Developer & Founder@ACEVITEEE',
    image: 'images/naval.jpg', // Add your image to public folder
    bio: 'Computer Science student passionate about building educational platforms and helping students succeed in competitive exams.',
    github: 'https://github.com/ascendantnaval',
    youtube: 'https://www.youtube.com/watch?v=u_vAhBGs9b0',
    youtubeThumb: '/images/navalthumb.jpg', // Add thumbnail to public folder
    twitterHandle: 'navalsingh'
  },
  {
    name: 'Aditya',
    role: 'Linux Kernel Developer & Security Architect',
    image: 'images/aditya2.png', // Add your image to public folder
    bio: 'Full Stack Developer focused on creating impactful educational technology solutions and contributing to Linux kernel development.',
    github: 'https://github.com/thedvlprguy',
    youtube: 'https://www.youtube.com/@0x4d1ty4x',
    youtubeThumb: 'images/adityathumb.jpg', // Add thumbnail to public folder
    twitterHandle: 'jhwach'
  }
]

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-6 flex-1">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Meet Our Team</h1>
          <p className="text-muted-foreground text-lg text-center max-w-2xl">
            We're a team of developers passionate about making quality VITEEE preparation 
            accessible to everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-0">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <CardTitle className="text-2xl mb-2">{member.name}</CardTitle>
                    <p className="text-muted-foreground mb-4">{member.role}</p>
                    <div className="flex gap-4 justify-center md:justify-start">
                      <Link href={member.github} target="_blank">
                        <Button variant="ghost" size="icon" className="hover:text-primary">
                          <Github className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Link href={member.youtube} target="_blank">
                        <Button variant="ghost" size="icon" className="hover:text-red-500">
                          <Youtube className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Link href={`https://twitter.com/${member.twitterHandle}`} target="_blank">
                        <Button variant="ghost" size="icon" className="hover:text-blue-400">
                          <Twitter className="h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="mt-6">
                <p className="text-muted-foreground mb-6">
                  {member.bio}
                </p>

                {/* YouTube Channel Preview */}
                <Card className="group hover:shadow-lg transition-all">
                  <Link href={member.youtube} target="_blank">
                    <div className="relative aspect-video w-full">
                      <Image
                        src={member.youtubeThumb}
                        alt="YouTube Channel"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Youtube className="h-12 w-12 text-red-500" />
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="font-medium">Watch Our Content</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                </Card>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We're committed to democratizing VITEEE preparation by providing high-quality study materials, 
              practice tests, and resources completely free. Our platform is built by students, for students, 
              with the goal of making competitive exam preparation accessible to everyone.
            </p>
          </CardContent>
        </Card>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">1000+</div>
                <p className="text-muted-foreground">Students Helped</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <p className="text-muted-foreground">Practice Questions</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <p className="text-muted-foreground">Support Available</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
} 