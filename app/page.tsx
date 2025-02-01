"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <motion.main variants={container} initial="hidden" animate="show" className="container mx-auto px-4 py-16">
        <motion.div variants={item} className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="font-serif text-4xl md:text-6xl mb-4">Master VITEEE with ACEVITEEE</h1>
          <p className="font-mono text-lg text-muted-foreground">
            Actual Test Series presented by ACEVITEEE
          </p>
        </motion.div>

        <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div variants={item}>
            <FeatureCard
              title="Best Explanation"
              description="Unique, Experience"
            />
          </motion.div>
          <motion.div variants={item}>
            <FeatureCard title="Instant Feedback" description="Get immediate results with detailed explanations" />
          </motion.div>
          <motion.div variants={item}>
            <FeatureCard title="Performance Tracking" description="Monitor your progress with in-depth analytics" />
          </motion.div>
        </motion.div>

        <motion.div variants={item} className="text-center">
          <Link href="/dashboard">
            <Button size="lg" className="font-mono group">
              Start Your Preparation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.main>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border bg-card p-6 transition-colors hover:bg-accent">
      <h3 className="font-serif text-xl mb-2">{title}</h3>
      <p className="font-mono text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

