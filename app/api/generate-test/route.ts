import { Configuration, OpenAIApi } from "openai"
import { NextResponse } from "next/server"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  if (!configuration.apiKey) {
    return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 })
  }

  const { subject, count } = await req.json()

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: generatePrompt(subject, count),
      max_tokens: 2048,
    })

    const questions = parseQuestions(completion.data.choices[0].text || "")

    return NextResponse.json({ questions })
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data)
      return NextResponse.json({ error: error.response.data }, { status: error.response.status })
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      return NextResponse.json({ error: "An error occurred during your request." }, { status: 500 })
    }
  }
}

function generatePrompt(subject: string, count: number) {
  return `Generate ${count} multiple-choice questions for VITEEE exam on the subject of ${subject}. 
  Each question should have 4 options and one correct answer. 
  Format: Q: [Question] A: [Option A] B: [Option B] C: [Option C] D: [Option D] Correct: [Correct Option] Explanation: [Brief explanation]`
}

function parseQuestions(text: string) {
  const questions = text.split("\n\n")
  return questions.map((q, index) => {
    const [question, ...options] = q.split("\n")
    const correctAnswer = options.findIndex((o) => o.startsWith("Correct:"))
    const explanation = options.pop()?.replace("Explanation: ", "")
    return {
      id: index + 1,
      text: question.replace("Q: ", ""),
      options: options.slice(0, 4).map((o) => o.slice(3)),
      correctAnswer,
      explanation,
    }
  })
}

