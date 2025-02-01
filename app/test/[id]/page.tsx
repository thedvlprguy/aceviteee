"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds

  const handleAnswer = (value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }))
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Physics Test 4</h1>
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
          <RadioGroup value={selectedAnswers[currentQuestion]} onValueChange={handleAnswer} className="grid gap-4">
            {mockQuestions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent"
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentQuestion === mockQuestions.length - 1) {
                // Handle test submission
                console.log("Test completed", selectedAnswers)
              } else {
                setCurrentQuestion((prev) => prev + 1)
              }
            }}
          >
            {currentQuestion === mockQuestions.length - 1 ? (
              "Submit Test"
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
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

const mockQuestions = [
  {
    question:
      "A particle moves in a circular path of radius 2m with a constant speed of 4m/s. What is the magnitude of its acceleration?",
    options: ["8 m/s²", "4 m/s²", "2 m/s²", "16 m/s²"],
    correctAnswer: "8 m/s²",
  },
  {
    question: "Which of the following is a vector quantity?",
    options: ["Mass", "Temperature", "Displacement", "Time"],
    correctAnswer: "Displacement",
  },
  // Add more questions as needed...
].concat(
  Array(28).fill({
    question: "Sample question text for testing the interface?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: "Option A",
  }),
)

