"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export default function TestPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/generate-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject: "Physics", count: 5 }),
      })
      const data = await response.json()
      setQuestions(data.questions)
    } catch (error) {
      console.error("Error fetching questions:", error)
    }
  }

  const handleAnswer = (index: number) => {
    const updatedSelectedAnswers = [...selectedAnswers]
    updatedSelectedAnswers[currentQuestion] = index
    setSelectedAnswers(updatedSelectedAnswers)
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1)
    setShowExplanation(false)
  }

  const handleTestCompletion = async () => {
    const score = questions.reduce((acc, q, index) => {
      return acc + (selectedAnswers[index] === q.correctAnswer ? 1 : 0)
    }, 0)

    try {
      const response = await fetch("/api/save-test-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testId: "generated-test",
          score,
          totalQuestions: questions.length,
        }),
      })

      if (response.ok) {
        router.push("/progress")
      } else {
        console.error("Failed to save test result")
      }
    } catch (error) {
      console.error("Error saving test result:", error)
    }
  }

  if (questions.length === 0) {
    return <div>Loading...</div>
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">VITEEE Practice Test</h1>

      <div className="bg-white bg-opacity-10 p-6 rounded-lg mb-8">
        <h2 className="text-2xl mb-4">Question {currentQuestion + 1}</h2>
        <p className="text-xl mb-4">{question.text}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              variant={
                selectedAnswers[currentQuestion] === index
                  ? index === question.correctAnswer
                    ? "success"
                    : "destructive"
                  : "outline"
              }
              className="justify-start"
            >
              {option}
            </Button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-8">
            <h3 className="text-xl mb-2">Explanation:</h3>
            <p>
              {question.correctAnswer === selectedAnswers[currentQuestion]
                ? "Correct! "
                : `Incorrect. The correct answer is ${question.options[question.correctAnswer]}. `}
              {question.explanation}
            </p>
          </div>
        )}
      </div>

      {currentQuestion === questions.length - 1 ? (
        <Button onClick={handleTestCompletion}>Complete Test</Button>
      ) : (
        <Button onClick={nextQuestion}>Next Question</Button>
      )}
    </div>
  )
}

