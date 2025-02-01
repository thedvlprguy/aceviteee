'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink } from "lucide-react"
import { Footer } from "@/components/footer"

const chemistryResources = [
  {
    title: 'Organic Chemistry Mechanisms',
    description: 'Important reaction mechanisms and their applications',
    downloadLink: '/resources/files/organic.pdf',
    type: 'PDF'
  },
  {
    title: 'Inorganic Chemistry Notes',
    description: 'Comprehensive notes on chemical bonding and coordination compounds',
    downloadLink: '/resources/files/inorganic.pdf',
    type: 'PDF'
  },
  {
    title: 'Physical Chemistry Formulas',
    description: 'Complete formula sheet for thermodynamics and chemical kinetics',
    downloadLink: '/resources/files/physical.pdf',
    type: 'PDF'
  }
]

export default function ChemistryFormulas() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-6 flex-1">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Chemistry Study Material</h1>
          <p className="text-muted-foreground text-lg text-center max-w-2xl">
            Essential chemistry formulas and study materials for VITEEE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chemistryResources.map((resource, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-500" />
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

        {/* Quick Reference Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Quick Reference Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Organic Chemistry</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>IUPAC Nomenclature Rules</li>
                  <li>Common Name Reactions</li>
                  <li>Functional Groups</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Inorganic Chemistry</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Periodic Table Trends</li>
                  <li>Chemical Bonding</li>
                  <li>Coordination Compounds</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Physical Chemistry</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Thermodynamics Laws</li>
                  <li>Chemical Kinetics</li>
                  <li>Electrochemistry</li>
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