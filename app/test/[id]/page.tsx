"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { useUser } from "@clerk/nextjs"
import { useRouter, useParams } from "next/navigation"

const mockQuestions = [
  // Physics Questions
  {
    id: 'p1',
    subject: 'Physics',
    question: 'A particle moves in a circular path of radius 2m with a constant speed of 4m/s. What is the magnitude of its acceleration?',
    options: ['8 m/s²', '4 m/s²', '2 m/s²', '16 m/s²'],
    correctAnswer: '8 m/s²',
    explanation: 'For uniform circular motion, centripetal acceleration a = v²/r. Here, v = 4 m/s and r = 2m, so a = 16/2 = 8 m/s²'
  },
  {
    id: 'p2',
    subject: 'Physics',
    question: 'A simple pendulum oscillates with a time period of 2s. If its length is increased by a factor of 4, what will be its new time period?',
    options: ['1s', '2s', '4s', '8s'],
    correctAnswer: '4s',
    explanation: 'Time period T ∝ √L. If L increases by factor 4, T increases by factor √4 = 2. So new T = 2 × 2 = 4s'
  },
  {
    id: 'p3',
    subject: 'Physics',
    question: 'Two resistors of 4Ω and 6Ω are connected in parallel. What is the effective resistance?',
    options: ['2.4Ω', '10Ω', '5Ω', '24Ω'],
    correctAnswer: '2.4Ω',
    explanation: '1/R = 1/R₁ + 1/R₂ = 1/4 + 1/6 = 5/12. Therefore R = 12/5 = 2.4Ω'
  },
  // Chemistry Questions
  {
    id: 'c1',
    subject: 'Chemistry',
    question: 'Which of the following has the highest lattice energy?',
    options: ['NaCl', 'KCl', 'MgO', 'CaO'],
    correctAnswer: 'MgO',
    explanation: 'MgO has the highest lattice energy due to higher charge on ions (Mg²⁺ and O²⁻) and smaller ionic radii'
  },
  {
    id: 'c2',
    subject: 'Chemistry',
    question: 'The IUPAC name of CH₃-CH=CH-CHO is:',
    options: ['But-2-enal', 'But-3-enal', 'But-2-enoic acid', 'But-3-enoic acid'],
    correctAnswer: 'But-2-enal',
    explanation: 'The compound has 4 carbons (but-), a double bond at position 2, and an aldehyde group (-enal)'
  },
  {
    id: 'c3',
    subject: 'Chemistry',
    question: 'Which quantum number determines the orientation of orbital in space?',
    options: ['Principal', 'Azimuthal', 'Magnetic', 'Spin'],
    correctAnswer: 'Magnetic',
    explanation: 'The magnetic quantum number (ml) determines the orientation of the orbital in space'
  },
  // More Physics Questions
  {
    id: 'p4',
    subject: 'Physics',
    question: 'A body of mass 2 kg is thrown vertically upward with a velocity of 49 m/s. What is its potential energy at maximum height? (g = 9.8 m/s²)',
    options: ['2401 J', '1200.5 J', '4802 J', '2450 J'],
    correctAnswer: '2401 J',
    explanation: 'At max height, KE = 0, so PE = Total Energy = ½mv² = ½(2)(49)² = 2401 J'
  },
  {
    id: 'p5',
    subject: 'Physics',
    question: 'What is the equivalent capacitance of two capacitors of 6μF and 3μF connected in series?',
    options: ['9μF', '2μF', '4.5μF', '18μF'],
    correctAnswer: '2μF',
    explanation: '1/C = 1/C₁ + 1/C₂ = 1/6 + 1/3 = 1/2, therefore C = 2μF'
  },
  // More Chemistry Questions
  {
    id: 'c4',
    subject: 'Chemistry',
    question: 'Which of the following has the highest boiling point?',
    options: ['CH₃OH', 'CH₃-O-CH₃', 'CH₃CH₂OH', 'CH₃CH₂CH₂OH'],
    correctAnswer: 'CH₃CH₂CH₂OH',
    explanation: 'Propanol (CH₃CH₂CH₂OH) has the highest molecular mass and strongest hydrogen bonding'
  },
  {
    id: 'c5',
    subject: 'Chemistry',
    question: 'The hybridization of carbon in benzene is:',
    options: ['sp', 'sp²', 'sp³', 'dsp²'],
    correctAnswer: 'sp²',
    explanation: 'In benzene, each carbon atom is sp² hybridized with one unhybridized p orbital for π bonding'
  }
]

export default function TestPage() {
  const { user } = useUser()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const router = useRouter()
  const params = useParams()

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

  const submitTest = async () => {
    if (!user) return

    const score = calculateScore() // Implement score calculation
    const timeSpent = 3600 - timeLeft // Calculate time spent

    try {
      const response = await fetch('/api/test-results/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          testId: params.id,
          score,
          answers: selectedAnswers,
          timeSpent,
        }),
      })

      if (response.ok) {
        // Redirect to results page
        router.push(`/test-review/${params.id}`)
      }
    } catch (error) {
      console.error('Error submitting test:', error)
    }
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
                submitTest()
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

