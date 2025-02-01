"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { useRouter, useParams } from "next/navigation"
import mockQuestions from "@/data/mockQuestions" // Importing questions from a separate file

export default function TestPage() {
  const { user } = useUser()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAnswer = (value: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion]: value }))
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const submitTest = async () => {
    if (!user) return

    const score = Object.keys(selectedAnswers).reduce((acc, key) => {
      return acc + (selectedAnswers[key] === mockQuestions[key].correctAnswer ? 1 : 0)
    }, 0)

    const timeSpent = 3600 - timeLeft

    try {
      const response = await fetch("/api/test-results/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          testId: params.id,
          score,
          answers: selectedAnswers,
          timeSpent,
        }),
      })
      if (response.ok) router.push(`/test-review/${params.id}`)
    } catch (error) {
      console.error("Error submitting test:", error)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Test</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{formatTime(timeLeft)} remaining</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {mockQuestions.length}
            </span>
            <Progress value={((currentQuestion + 1) / mockQuestions.length) * 100} className="w-[100px]" />
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">{mockQuestions[currentQuestion].question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedAnswers[currentQuestion] || ""} onValueChange={handleAnswer} className="grid gap-4">
            {mockQuestions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))} disabled={currentQuestion === 0}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentQuestion === mockQuestions.length - 1) {
                submitTest()
              } else {
                setCurrentQuestion((prev) => prev + 1)
              }
            }}
          >
            {currentQuestion === mockQuestions.length - 1 ? "Submit Test" : <><ChevronRight className="h-4 w-4 ml-2" /> Next</>}
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-10 gap-2">
        {mockQuestions.map((_, index) => (
          <Button
            key={index}
            variant={selectedAnswers[index] ? "default" : "outline"}
            className="h-10 w-10"
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}
