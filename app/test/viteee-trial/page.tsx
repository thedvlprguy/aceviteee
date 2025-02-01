"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

// 30 VITEEE sample questions
export const questions = [
  {
    id: 1,
    subject: 'Physics',
    question: 'A particle moves in a circular path of radius 2m with a constant speed of 4m/s. What is the magnitude of its acceleration?',
    options: ['8 m/s²', '4 m/s²', '2 m/s²', '16 m/s²'],
    correctAnswer: '8 m/s²'
  },
  {
    id: 2,
    subject: 'Physics',
    question: 'What is the equivalent resistance when two resistors of 6Ω and 3Ω are connected in series?',
    options: ['9Ω', '2Ω', '4.5Ω', '18Ω'],
    correctAnswer: '9Ω'
  },
  {
    id: 3,
    subject: 'Physics',
    question: 'A simple pendulum has a time period of 2s. If its length is doubled, what will be its new time period?',
    options: ['1s', '2s', '2.83s', '4s'],
    correctAnswer: '2.83s'
  },
  {
    id: 4,
    subject: 'Physics',
    question: 'Which of the following is the SI unit of luminous intensity?',
    options: ['Candela', 'Lumen', 'Lux', 'Weber'],
    correctAnswer: 'Candela'
  },
  {
    id: 5,
    subject: 'Physics',
    question: 'The energy of a photon is proportional to its:',
    options: ['Wavelength', 'Frequency', 'Speed', 'Amplitude'],
    correctAnswer: 'Frequency'
  },
  {
    id: 6,
    subject: 'Chemistry',
    question: 'What is the hybridization of carbon in ethyne (C₂H₂)?',
    options: ['sp', 'sp²', 'sp³', 'dsp²'],
    correctAnswer: 'sp'
  },
  {
    id: 7,
    subject: 'Chemistry',
    question: 'Which of the following has the highest lattice energy?',
    options: ['NaCl', 'KCl', 'MgO', 'CaO'],
    correctAnswer: 'MgO'
  },
  {
    id: 8,
    subject: 'Chemistry',
    question: 'The IUPAC name of CH₃-CH=CH-CHO is:',
    options: ['But-2-enal', 'But-3-enal', 'But-2-enoic acid', 'But-3-enoic acid'],
    correctAnswer: 'But-2-enal'
  },
  {
    id: 9,
    subject: 'Chemistry',
    question: 'What is the oxidation state of chromium in K₂Cr₂O₇?',
    options: ['+3', '+4', '+6', '+7'],
    correctAnswer: '+6'
  },
  {
    id: 10,
    subject: 'Chemistry',
    question: 'Which quantum number determines the orientation of orbital in space?',
    options: ['Principal', 'Azimuthal', 'Magnetic', 'Spin'],
    correctAnswer: 'Magnetic'
  },
  {
    id: 11,
    subject: 'Mathematics',
    question: 'If z = 3 + 4i, then |z| equals:',
    options: ['7', '5', '1', '25'],
    correctAnswer: '5'
  },
  {
    id: 12,
    subject: 'Mathematics',
    question: 'The derivative of tan x is:',
    options: ['cos x', 'sin x', 'sec² x', 'cosec² x'],
    correctAnswer: 'sec² x'
  },
  {
    id: 13,
    subject: 'Mathematics',
    question: 'If A and B are two events such that P(A) = 0.4 and P(B) = 0.3, and P(A∩B) = 0.2, then P(A∪B) is:',
    options: ['0.5', '0.7', '0.3', '0.9'],
    correctAnswer: '0.5'
  },
  {
    id: 14,
    subject: 'Physics',
    question: 'The work done in moving a charge q through a potential difference V is:',
    options: ['qV', 'q/V', 'q²V', 'V/q'],
    correctAnswer: 'qV'
  },
  {
    id: 15,
    subject: 'Physics',
    question: 'Which mirror can form a real image?',
    options: ['Plane mirror', 'Convex mirror', 'Concave mirror', 'None of these'],
    correctAnswer: 'Concave mirror'
  },
  {
    id: 16,
    subject: 'Chemistry',
    question: 'The number of sigma bonds in ethene (C₂H₄) is:',
    options: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 17,
    subject: 'Chemistry',
    question: 'Which of the following has the highest boiling point?',
    options: ['CH₃OH', 'CH₃-O-CH₃', 'CH₃CH₂OH', 'CH₃CH₂CH₂OH'],
    correctAnswer: 'CH₃CH₂CH₂OH'
  },
  {
    id: 18,
    subject: 'Mathematics',
    question: 'The value of ∫ e^x dx is:',
    options: ['e^x + C', 'e^x', 'ln x + C', 'x e^x + C'],
    correctAnswer: 'e^x + C'
  },
  {
    id: 19,
    subject: 'Mathematics',
    question: 'If sin θ = 3/5, then cos θ equals:',
    options: ['4/5', '5/3', '3/4', 'None of these'],
    correctAnswer: '4/5'
  },
  {
    id: 20,
    subject: 'Physics',
    question: 'The momentum of a body is doubled. Its kinetic energy becomes:',
    options: ['Doubled', 'Halved', 'Four times', 'One-fourth'],
    correctAnswer: 'Four times'
  },
  {
    id: 21,
    subject: 'Physics',
    question: 'Which color of light has the highest frequency?',
    options: ['Red', 'Green', 'Blue', 'Violet'],
    correctAnswer: 'Violet'
  },
  {
    id: 22,
    subject: 'Chemistry',
    question: 'The pH of a neutral solution at 25°C is:',
    options: ['0', '7', '14', '1'],
    correctAnswer: '7'
  },
  {
    id: 23,
    subject: 'Chemistry',
    question: 'Which of the following is an example of a coordination compound?',
    options: ['NaCl', 'K₄[Fe(CN)₆]', 'CH₄', 'NH₃'],
    correctAnswer: 'K₄[Fe(CN)₆]'
  },
  {
    id: 24,
    subject: 'Mathematics',
    question: 'The slope of the line 3x - 4y + 7 = 0 is:',
    options: ['3/4', '4/3', '-3/4', '-4/3'],
    correctAnswer: '3/4'
  },
  {
    id: 25,
    subject: 'Mathematics',
    question: 'If log₁₀ 2 = 0.3010, then log₁₀ 8 equals:',
    options: ['0.9030', '0.6020', '1.2040', '2.4080'],
    correctAnswer: '0.9030'
  },
  {
    id: 26,
    subject: 'Physics',
    question: 'The unit of electric flux is:',
    options: ['N/C', 'Nm²/C', 'NC/m²', 'None of these'],
    correctAnswer: 'Nm²/C'
  },
  {
    id: 27,
    subject: 'Chemistry',
    question: 'Which of the following is an amphoteric oxide?',
    options: ['Na₂O', 'CO₂', 'ZnO', 'CaO'],
    correctAnswer: 'ZnO'
  },
  {
    id: 28,
    subject: 'Chemistry',
    question: 'The number of d-electrons in Fe²⁺ (Atomic number of Fe = 26) is:',
    options: ['4', '5', '6', '3'],
    correctAnswer: '6'
  },
  {
    id: 29,
    subject: 'Mathematics',
    question: 'The area of the region bounded by y = x² and y = x between x = 0 and x = 1 is:',
    options: ['1/2', '1/3', '1/4', '1/6'],
    correctAnswer: '1/3'
  },
  {
    id: 30,
    subject: 'Mathematics',
    question: 'If A is a square matrix, then |kA| equals:',
    options: ['k|A|', 'k²|A|', '|A|/k', 'k⁴|A|'],
    correctAnswer: 'k²|A|'
  }
]

export default function VITEEETrialTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes
  const [shuffledQuestions, setShuffledQuestions] = useState(questions)

  useEffect(() => {
    // Shuffle questions on component mount
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled)

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleTestSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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

  const handleTestSubmit = () => {
    // Calculate score and create detailed results
    const detailedAnswers = shuffledQuestions.map((q, index) => ({
      question: q.question,
      subject: q.subject,
      correctAnswer: q.correctAnswer,
      userAnswer: selectedAnswers[index] || 'Not answered',
      isCorrect: selectedAnswers[index] === q.correctAnswer,
      explanation: q.explanation || `For ${q.subject}: The correct answer is ${q.correctAnswer}`
    }))

    const score = detailedAnswers.filter(a => a.isCorrect).length

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

    // Store result in localStorage
    const testResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      score,
      totalQuestions: shuffledQuestions.length,
      timeSpent: 3600 - timeLeft,
      answers: detailedAnswers,
      subjectWiseAnalysis
    }

    const existingResults = JSON.parse(localStorage.getItem('testResults') || '[]')
    localStorage.setItem('testResults', JSON.stringify([...existingResults, testResult]))

    router.push('/dashboard')
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">VITEEE Trial Test</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{formatTime(timeLeft)} remaining</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {shuffledQuestions.length}
            </span>
            <Progress 
              value={((currentQuestion + 1) / shuffledQuestions.length) * 100} 
              className="w-[100px]" 
            />
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">
            {shuffledQuestions[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={selectedAnswers[currentQuestion]} 
            onValueChange={handleAnswer}
            className="grid gap-4"
          >
            {shuffledQuestions[currentQuestion].options.map((option, index) => (
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
              if (currentQuestion === shuffledQuestions.length - 1) {
                handleTestSubmit()
              } else {
                setCurrentQuestion((prev) => prev + 1)
              }
            }}
          >
            {currentQuestion === shuffledQuestions.length - 1 ? (
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
        {shuffledQuestions.map((_, index) => (
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