'use client'

import { useState, useEffect } from 'react'
import { useUser } from "@clerk/nextjs"
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Clock, 
  Trophy,
  Target,
  Loader2
} from "lucide-react"

interface TestResult {
  id: string
  score: number
  totalQuestions: number
  date: string
  testName: string
}

interface Stats {
  testsTaken: number
  averageScore: number
  studyStreak: number
  timeSpent: number
}

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [stats, setStats] = useState<Stats>({
    testsTaken: 0,
    averageScore: 0,
    studyStreak: 0,
    timeSpent: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserProgress()
    }
  }, [user, isLoaded])

  const fetchUserProgress = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(`/api/user-progress/${user?.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch user progress')
      }
      const data = await response.json()
      setTestResults(data.testResults)
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching user progress:', error)
      setError('Failed to load your progress. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your dashboard</h1>
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={fetchUserProgress}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.firstName || 'Student'}!</h1>
          <p className="text-muted-foreground">Track your VITEEE preparation progress</p>
        </div>
        <Button asChild>
          <Link href="/test-series">Take New Test</Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Taken</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.testsTaken}</div>
            <p className="text-xs text-muted-foreground">Total tests completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">Across all tests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.studyStreak} Days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(stats.timeSpent / 60)} hrs</div>
            <p className="text-xs text-muted-foreground">Total study time</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {testResults.length > 0 ? (
              testResults.map((result) => (
                <div key={result.id} className="flex items-center">
                  <div className="flex-1 space-y-1">
                    <p className="font-medium leading-none">{result.testName}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(result.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={result.score >= 80 ? "default" : "secondary"}>
                      {Math.round((result.score / result.totalQuestions) * 100)}%
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/test-review/${result.id}`}>
                        Review
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No tests taken yet</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/test-series">Take your first test</Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

