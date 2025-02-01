'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, XCircle, PieChart } from "lucide-react"
import { questions } from '@/app/test/viteee-trial/page'

interface TestResult {
  date: string
  score: number
  totalQuestions: number
  timeSpent: number
  answers: Record<number, string>
}

interface SubjectStats {
  total: number
  correct: number
  percentage: number
}

export default function TestReview() {
  const params = useParams()
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [subjectStats, setSubjectStats] = useState<Record<string, SubjectStats>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTestResult = () => {
      const results = JSON.parse(localStorage.getItem('testResults') || '[]')
      const result = results[Number(params.id)]
      if (result) {
        setTestResult(result)
        calculateSubjectStats(result.answers)
      }
      setLoading(false)
    }

    loadTestResult()
  }, [params.id])

  const calculateSubjectStats = (answers: Record<number, string>) => {
    const stats: Record<string, SubjectStats> = {}
    
    questions.forEach((q, index) => {
      if (!stats[q.subject]) {
        stats[q.subject] = { total: 0, correct: 0, percentage: 0 }
      }
      
      stats[q.subject].total++
      if (answers[index] === q.correctAnswer) {
        stats[q.subject].correct++
      }
    })

    // Calculate percentages
    Object.keys(stats).forEach(subject => {
      stats[subject].percentage = Math.round((stats[subject].correct / stats[subject].total) * 100)
    })

    setSubjectStats(stats)
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center">
        <div className="animate-spin">Loading...</div>
      </div>
    )
  }

  if (!testResult) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Test not found</h1>
        <Button asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex-1" />
        <Badge className="text-lg py-2">
          Score: {Math.round((testResult.score / testResult.totalQuestions) * 100)}%
        </Badge>
      </div>

      {/* Subject-wise Performance */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Subject-wise Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(subjectStats).map(([subject, stats]) => (
              <Card key={subject}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{subject}</h3>
                  <div className="flex justify-between items-center">
                    <span>{stats.correct}/{stats.total} correct</span>
                    <Badge variant={stats.percentage >= 70 ? "default" : "secondary"}>
                      {stats.percentage}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Question Review */}
      <div className="space-y-8">
        {questions.map((question, index) => {
          const isCorrect = testResult.answers[index] === question.correctAnswer
          const userAnswer = testResult.answers[index]

          return (
            <Card key={index} className={isCorrect ? "border-green-500/20" : "border-red-500/20"}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{question.subject}</Badge>
                      <Badge variant="outline">Question {index + 1}</Badge>
                    </div>
                    <CardTitle className="text-lg font-medium">
                      {question.question}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="ml-9">
                  <div className="grid gap-2 mb-4">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg border ${
                          option === question.correctAnswer
                            ? "border-green-500 bg-green-500/10"
                            : option === userAnswer && !isCorrect
                            ? "border-red-500 bg-red-500/10"
                            : "border-transparent"
                        }`}
                      >
                        {option}
                        {option === question.correctAnswer && (
                          <span className="ml-2 text-green-500">(Correct Answer)</span>
                        )}
                        {option === userAnswer && !isCorrect && (
                          <span className="ml-2 text-red-500">(Your Answer)</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {!isCorrect && question.explanation && (
                    <div className="mt-4 p-4 rounded-lg bg-muted">
                      <p className="font-medium mb-2">Explanation:</p>
                      <p className="text-muted-foreground">
                        {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 