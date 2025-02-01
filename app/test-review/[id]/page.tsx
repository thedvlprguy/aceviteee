'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { Footer } from "@/components/footer"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  userAnswer: string
  explanation: string
}

// Mock test review data
const mockReview = {
  id: '1',
  title: 'VITEEE Physics Mock Test',
  date: new Date().toISOString(),
  score: 85,
  totalQuestions: 100,
  timeSpent: '2h 45m',
  questions: [
    {
      id: '1',
      question: 'A particle moves in a circular path of radius 2m with a constant speed of 4m/s. What is the magnitude of its acceleration?',
      options: ['8 m/s²', '4 m/s²', '2 m/s²', '16 m/s²'],
      correctAnswer: '8 m/s²',
      userAnswer: '4 m/s²',
      explanation: 'For circular motion, centripetal acceleration a = v²/r where v is velocity and r is radius. Here, a = (4)²/2 = 8 m/s²'
    },
    {
      id: '2',
      question: 'Which of the following is a vector quantity?',
      options: ['Mass', 'Temperature', 'Displacement', 'Time'],
      correctAnswer: 'Displacement',
      userAnswer: 'Displacement',
      explanation: 'Displacement is a vector quantity as it has both magnitude and direction.'
    },
    // Add more questions as needed
  ]
}

export default function TestReview() {
  const params = useParams()

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-6 flex-1">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/dashboard" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        {/* Test Overview */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{mockReview.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Taken on {new Date(mockReview.date).toLocaleDateString()}
                </p>
              </div>
              <Badge className="text-lg px-4 py-1">
                {mockReview.score}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Questions</p>
                <p className="text-2xl font-bold">{mockReview.totalQuestions}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Correct Answers</p>
                <p className="text-2xl font-bold text-green-500">
                  {Math.round((mockReview.score / 100) * mockReview.totalQuestions)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Time Spent</p>
                <p className="text-2xl font-bold">{mockReview.timeSpent}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions Review */}
        <div className="space-y-6">
          {mockReview.questions.map((question, index) => (
            <Card key={question.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <span className="text-muted-foreground">Q{index + 1}.</span>
                  <div className="flex-1">
                    <p className="font-medium">{question.question}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Options */}
                  <div className="grid gap-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border ${
                          option === question.correctAnswer
                            ? 'border-green-500 bg-green-500/10'
                            : option === question.userAnswer && option !== question.correctAnswer
                            ? 'border-red-500 bg-red-500/10'
                            : 'border-muted'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {option === question.correctAnswer ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : option === question.userAnswer && option !== question.correctAnswer ? (
                            <XCircle className="h-5 w-5 text-red-500" />
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium">Explanation:</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
} 