'use client'

import { useState, useEffect } from 'react'
import { useUser } from "@clerk/nextjs"
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  Clock, 
  Trophy,
  Target,
  Loader2,
  CheckCircle,
  XCircle
} from "lucide-react"
import { questions } from '@/app/test/viteee-trial/page'

interface Answer {
  question: string
  subject: string
  correctAnswer: string
  userAnswer: string
  isCorrect: boolean
  explanation: string
}

interface TestResult {
  id: string
  date: string
  score: number
  totalQuestions: number
  timeSpent: number
  answers: Answer[]
  subjectWiseAnalysis?: Record<string, { total: number, correct: number }>
}

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [selectedTest, setSelectedTest] = useState<TestResult | null>(null)

  useEffect(() => {
    if (isLoaded) {
      try {
        const results = JSON.parse(localStorage.getItem('testResults') || '[]')
        if (Array.isArray(results) && results.length > 0) {
          // Convert old format to new format if needed
          const validResults = results.map(result => {
            if (!Array.isArray(result.answers)) {
              // Convert old answer format to new format
              const detailedAnswers = questions.map((q, index) => ({
                question: q.question,
                subject: q.subject,
                correctAnswer: q.correctAnswer,
                userAnswer: result.answers[index] || 'Not answered',
                isCorrect: result.answers[index] === q.correctAnswer,
                explanation: q.explanation || `For ${q.subject}: The correct answer is ${q.correctAnswer}`
              }))

              // Calculate subject-wise analysis
              const subjectWiseAnalysis = {}
              detailedAnswers.forEach(answer => {
                if (!subjectWiseAnalysis[answer.subject]) {
                  subjectWiseAnalysis[answer.subject] = { total: 0, correct: 0 }
                }
                subjectWiseAnalysis[answer.subject].total++
                if (answer.isCorrect) {
                  subjectWiseAnalysis[answer.subject].correct++
                }
              })

              return {
                ...result,
                answers: detailedAnswers,
                subjectWiseAnalysis
              }
            }
            return result
          })

          setTestResults(validResults)
          setSelectedTest(validResults[validResults.length - 1])
        }
      } catch (error) {
        console.error('Error loading test results:', error)
      }
    }
  }, [isLoaded])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (!selectedTest) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">No tests taken yet</h1>
        <Button asChild>
          <Link href="/test/viteee-trial">Take Your First Test</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.firstName || 'Student'}!</h1>
          <p className="text-muted-foreground">Here's your test performance analysis</p>
        </div>
        <Button asChild>
          <Link href="/test/viteee-trial">Take New Test</Link>
        </Button>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((selectedTest.score / selectedTest.totalQuestions) * 100)}%
            </div>
          </CardContent>
        </Card>

        {/* Subject-wise Performance */}
        {selectedTest.subjectWiseAnalysis && Object.entries(selectedTest.subjectWiseAnalysis).map(([subject, stats]) => (
          <Card key={subject}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{subject}</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((stats.correct / stats.total) * 100)}%
              </div>
              <Progress 
                value={(stats.correct / stats.total) * 100} 
                className="mt-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analysis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Question Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Array.isArray(selectedTest.answers) && selectedTest.answers.map((answer, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <div className="flex items-start gap-4">
                  {answer.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-1" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{answer.subject}</Badge>
                      <Badge variant="outline">Q{index + 1}</Badge>
                    </div>
                    <p className="font-medium mb-2">{answer.question}</p>
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Your Answer:</span>
                        <span className={answer.isCorrect ? "text-green-500" : "text-red-500"}>
                          {answer.userAnswer}
                        </span>
                      </div>
                      {!answer.isCorrect && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Correct Answer:</span>
                          <span className="text-green-500">{answer.correctAnswer}</span>
                        </div>
                      )}
                      {!answer.isCorrect && (
                        <p className="mt-2 text-muted-foreground">
                          <span className="font-medium text-foreground">Explanation: </span>
                          {answer.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test History */}
      <Card>
        <CardHeader>
          <CardTitle>Test History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div 
                key={result.id}
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent"
                onClick={() => setSelectedTest(result)}
              >
                <div>
                  <p className="font-medium">VITEEE Trial Test {testResults.length - index}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(result.date).toLocaleDateString()}
                  </p>
                </div>
                <Badge>
                  {Math.round((result.score / result.totalQuestions) * 100)}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

